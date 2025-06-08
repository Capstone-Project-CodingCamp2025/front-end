// src/components/FirstRecommendation.jsx - Updated to redirect to AllDestination
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularRecommendations,
  submitInitialRatings,
} from '../../api/recommendations';

export default function FirstRecommendation() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [success, setSuccess] = useState(false);

  // ambil list tempat populer sebagai opsi rating
  useEffect(() => {
    async function fetch() {
      try {
        console.log('🔄 Fetching popular places...');
        const list = await getPopularRecommendations(20);
        console.log('✅ Popular places loaded:', list.length);
        setPlaces(list);
      } catch (err) {
        console.error('❌ Error fetching popular places:', err);
        setError('Gagal memuat daftar tempat.');
      }
    }
    fetch();
  }, []);

  const handleRating = (placeId, value) => {
    setRatings(prev => ({ ...prev, [placeId]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setDebugInfo('');
    
    console.log('=== SUBMIT RATINGS DEBUG ===');
    console.log('Current ratings:', ratings);
    
    const entries = Object.entries(ratings)
      .filter(([, r]) => r >= 1)
      .slice(0, 5)
      .map(([place_id, rating]) => ({ place_id: +place_id, rating }));

    console.log('Filtered entries:', entries);

    if (entries.length < 3) {
      setError('Silakan beri rating minimal 3 tempat.');
      return;
    }

    setLoading(true);
    setDebugInfo('Menyimpan ratings...');
    
    try {
      console.log('🔄 Submitting ratings...');
      const submitResponse = await submitInitialRatings(entries);
      console.log('✅ Ratings submitted:', submitResponse);
      setDebugInfo('Ratings berhasil disimpan!');
      setSuccess(true);
      
      // Redirect to AllDestination after 2 seconds
      setTimeout(() => {
        navigate('/destination', { 
          state: { 
            message: 'Rating berhasil disimpan! Lihat rekomendasi personalmu.',
            showRecommended: true 
          }
        });
      }, 2000);
      
    } catch (err) {
      console.error('❌ Error in recommendation flow:', err);
      
      // More detailed error handling
      if (err.response) {
        console.error('Response error:', err.response.status, err.response.data);
        setError(`Server error: ${err.response.data?.message || err.response.status}`);
        setDebugInfo(`Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error('Request error:', err.request);
        setError('Tidak dapat terhubung ke server.');
        setDebugInfo('Network error - check if backend is running');
      } else {
        console.error('General error:', err.message);
        setError(`Error: ${err.message}`);
        setDebugInfo(`General error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rating Berhasil Disimpan!</h2>
          <p className="text-gray-600 mb-4">
            Terima kasih telah memberikan rating. Sekarang kamu akan mendapatkan rekomendasi yang sesuai dengan preferensimu.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
              Mengarahkan ke halaman destinasi...
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 font-medium">
            🎉 Sistem rekomendasi siap memberikan saran terbaik untukmu!
          </p>
        </div>

        <button
          onClick={() => navigate('/destination', { 
            state: { 
              message: 'Rating berhasil disimpan! Lihat rekomendasi personalmu.',
              showRecommended: true 
            }
          })}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Lihat Rekomendasi Sekarang
        </button>
      </div>
    );
  }

  // tampilkan error
  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
          {error}
        </div>
        {debugInfo && (
          <div className="p-4 bg-gray-100 text-gray-600 rounded text-sm">
            <strong>Debug Info:</strong> {debugInfo}
          </div>
        )}
        <button
          onClick={() => {
            setError(null);
            setDebugInfo('');
            setSuccess(false);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Pilih dan Beri Rating 3–5 Tempat Favoritmu
        </h2>
        <p className="text-lg text-gray-600">
          Bantu kami memberikan rekomendasi yang sesuai dengan selera travelingmu
        </p>
      </div>

      {loading && (
        <div className="p-4 bg-blue-100 text-blue-700 rounded mb-6 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Memproses rating... {debugInfo && `(${debugInfo})`}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid gap-4">
          {places.map(place => (
            <div key={place.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{place.name}</h4>
                <p className="text-sm text-gray-500">{place.location}</p>
                {place.rating > 0 && (
                  <p className="text-xs text-yellow-600 mt-1">⭐ {place.rating}</p>
                )}
              </div>
              <select
                value={ratings[place.id] || 0}
                onChange={e => handleRating(place.id, +e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>— Pilih Rating —</option>
                {[1, 2, 3, 4, 5].map(v => (
                  <option key={v} value={v}>{v} ⭐</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Rating yang dipilih: {Object.values(ratings).filter(r => r >= 1).length} tempat
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Minimal 3 tempat untuk mendapatkan rekomendasi terbaik
            </p>
          </div>
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
              style={{ 
                width: `${Math.min((Object.values(ratings).filter(r => r >= 1).length / 3) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || Object.values(ratings).filter(r => r >= 1).length < 3}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Memproses...
          </span>
        ) : (
          'Simpan Rating & Lihat Rekomendasi'
        )}
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Rating kamu akan membantu sistem memberikan rekomendasi yang lebih akurat
      </p>
    </div>
  );
}