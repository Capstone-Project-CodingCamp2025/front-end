import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularRecommendations,
  submitInitialRatings,
  getRecommendations,
} from '../../api/recommendations';

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
      const token = localStorage.getItem('token');
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
      await submitInitialRatings(entries);
      setSuccess(true);
      setDebugInfo('Ratings berhasil disimpan!');

      setTimeout(() => {
        navigate('/destination', {
          state: {
            message: 'Rating berhasil disimpan! Lihat rekomendasi personalmu.',
            showRecommended: true,
          },
        });
      }, 2000);
    } catch (err) {
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
        Memeriksa status rekomendasi...
      </div>
    );
  }

  // Success state after submit
  if (success) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Rating Berhasil Disimpan!</h2>
        <p className="mb-6">Terima kasih! Mengarahkan ke rekomendasi...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="p-4 bg-red-100 text-red-800 rounded mb-4">{error}</div>
        {debugInfo && <pre className="bg-gray-100 p-2 text-sm">{debugInfo}</pre>}
        <button onClick={() => setError(null)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Coba Lagi
        </button>
      </div>
    );
  }

  // Main form
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Pilih dan Beri Rating 3–5 Tempat Favoritmu
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {places.map(place => (
              <div key={place.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                <div>
                  <h4 className="font-semibold">{place.name}</h4>
                  <p className="text-sm text-gray-500">{place.location}</p>
                </div>
                <select
                  value={ratings[place.id] || 0}
                  onChange={e => handleRating(place.id, +e.target.value)}
                  className="border rounded px-3 py-1"
                >
                  <option value={0}>— Pilih Rating —</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} ⭐</option>)}
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || Object.values(ratings).filter(r => r>=1).length<3}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded disabled:opacity-50"
          >
            Simpan Rating & Lihat Rekomendasi
          </button>
        </>
      )}
      <p className="mt-4 text-center text-xs text-gray-500">
        Rating akan membantu kami memberikan rekomendasi yang sesuai.
      </p>
    </div>
  );
}
