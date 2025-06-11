import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularRecommendations,
  getRecommendations,
} from '../../api/recommendations';
import {submitInitialRatings} from '../../api/ratings'

export default function FirstRecommendation() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [success, setSuccess] = useState(false);

  // 1) Pre-check for existing recommendations
  useEffect(() => {
    async function checkRecommendations() {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const recs = await getRecommendations();
          if (recs && recs.length > 0) {
            return navigate('/destination', {
              replace: true,
              state: {
                message: 'Selamat datang kembali! Berikut rekomendasi personal untukmu.',
                showRecommended: true,
              },
            });
          }
        } catch (err) {
          console.warn('Belum ada rekomendasi - tampilkan form rating');
        }
      }

      // 2) Fetch popular places for rating options
      try {
        const list = await getPopularRecommendations(20);
        setPlaces(list);
      } catch (err) {
        setError('Gagal memuat daftar tempat.');
      } finally {
        setLoading(false);
        setChecking(false);
      }
    }

    checkRecommendations();
  }, [navigate]);

  const handleRating = (placeId, value) => {
    setRatings(prev => ({ ...prev, [placeId]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setDebugInfo('');

    const entries = Object.entries(ratings)
      .filter(([, r]) => r >= 1)
      .slice(0, 5)
      .map(([place_id, rating]) => ({ place_id: +place_id, rating }));

    if (entries.length < 3) {
      setError('Silakan beri rating minimal 3 tempat.');
      return;
    }

    setLoading(true);
    setDebugInfo('Menyimpan ratings...');

    try {
      console.log('Submitting ratings:', entries);
      await submitInitialRatings(entries);
      setSuccess(true);
      setDebugInfo('Ratings berhasil disimpan!');

      // FIXED: Tambahkan delay lebih lama untuk memastikan data tersimpan
      setTimeout(() => {
        console.log('Redirecting to destination page...');
        navigate('/destination', {
          state: {
            message: 'Rating berhasil disimpan! Lihat rekomendasi personalmu.',
            showRecommended: true,
          },
        });
      }, 3000); // Increase delay to 3 seconds
    } catch (err) {
      console.error('Error submitting ratings:', err);
      setError(err.response?.data?.message || 'Gagal menyimpan rating.');
      setDebugInfo(JSON.stringify(err.response?.data) || err.message);
    } finally {
      setLoading(false);
    }
  };

  // While checking recommendations
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          Memeriksa status rekomendasi...
        </div>
      </div>
    );
  }

  // Success state after submit
  if (success) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-green-600 text-4xl">✅</div>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Rating Berhasil Disimpan!</h2>
          <p className="text-green-700 mb-6">Terima kasih! Sistem sedang memproses rekomendasi personalmu...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        </div>
        {debugInfo && (
          <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
            {debugInfo}
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="text-red-600 text-xl mr-2">⚠️</div>
            <h3 className="font-semibold text-red-800">Terjadi Kesalahan</h3>
          </div>
          <p className="text-red-700">{error}</p>
        </div>
        {debugInfo && (
          <div className="bg-gray-100 rounded p-3 text-sm text-gray-700 mb-4">
            <pre className="text-xs overflow-auto">{debugInfo}</pre>
          </div>
        )}
        <button 
          onClick={() => setError(null)} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // Main form
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Pilih dan Beri Rating 3–5 Tempat Favoritmu
        </h2>
        <p className="text-gray-600">
          Bantu kami memberikan rekomendasi yang sesuai dengan preferensimu
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat daftar tempat...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Rating Status */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Tempat yang sudah diberi rating: {Object.values(ratings).filter(r => r >= 1).length}
              </span>
              <span className="text-sm text-blue-600">
                Minimal: 3 tempat
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (Object.values(ratings).filter(r => r >= 1).length / 3) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Places List */}
          <div className="grid gap-4 mb-6">
            {places.map(place => (
              <div key={place.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{place.name}</h4>
                  <p className="text-sm text-gray-500">{place.location}</p>
                  {place.rating && (
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">{place.rating}</span>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <select
                    value={ratings[place.id] || 0}
                    onChange={e => handleRating(place.id, +e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>— Pilih Rating —</option>
                    {[1,2,3,4,5].map(v => (
                      <option key={v} value={v}>{v} ⭐</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || Object.values(ratings).filter(r => r>=1).length<3}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Menyimpan Rating...
              </div>
            ) : (
              'Simpan Rating & Lihat Rekomendasi'
            )}
          </button>
        </>
      )}
      
      <p className="mt-4 text-center text-xs text-gray-500">
        Rating akan membantu kami memberikan rekomendasi yang sesuai dengan preferensimu.
      </p>
    </div>
  );
}