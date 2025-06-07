// src/components/FirstRecommendation.jsx - Enhanced version
import React, { useEffect, useState } from 'react';
import {
  getPopularRecommendations,
  submitInitialRatings,
  getRecommendations
} from '../../api/recommendations';

export default function FirstRecommendation() {
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

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
      // Step 1: Submit ratings
      console.log('🔄 Submitting ratings...');
      const submitResponse = await submitInitialRatings(entries);
      console.log('✅ Ratings submitted:', submitResponse);
      setDebugInfo('Ratings tersimpan, mengambil rekomendasi...');
      
      // Step 2: Get recommendations
      console.log('🔄 Getting recommendations...');
      const recos = await getRecommendations();
      console.log('📊 Recommendations received:', recos);
      
      if (!recos || recos.length === 0) {
        console.log('⚠️  Empty recommendations received');
        setError('Tidak ada rekomendasi yang ditemukan. Coba tambah lebih banyak rating.');
        setDebugInfo(`Debug: Received ${recos ? recos.length : 'null'} recommendations`);
      } else {
        console.log('✅ Setting destinations:', recos.length);
        setDestinations(recos);
        setDebugInfo(`Berhasil mendapat ${recos.length} rekomendasi!`);
      }
      
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
            setDestinations([]);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // jika sudah punya rekomendasi
  if (destinations.length > 0) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Rekomendasi untukmu</h2>
        {debugInfo && (
          <div className="p-3 bg-green-100 text-green-700 rounded mb-4 text-sm">
            {debugInfo}
          </div>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destinations.map((dest, idx) => (
            <li key={dest.id || idx} className="p-4 border rounded shadow bg-white">
              <h4 className="text-lg font-semibold">{dest.name}</h4>
              <p className="text-sm text-gray-500">{dest.location}</p>
              <p className="text-yellow-600">⭐ {dest.rating}</p>
              {dest.category && (
                <p className="text-xs text-gray-400 mt-1">{dest.category}</p>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setDestinations([]);
            setRatings({});
            setDebugInfo('');
          }}
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded"
        >
          Rating Ulang
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Pilih dan Beri Rating 3–5 Tempat Favoritmu
      </h2>

      {loading && (
        <div className="p-3 bg-blue-100 text-blue-700 rounded mb-4">
          Memproses rating... {debugInfo && `(${debugInfo})`}
        </div>
      )}

      <ul className="space-y-4 mb-6">
        {places.map(place => (
          <li key={place.id} className="flex items-center justify-between border p-2 rounded">
            <div>
              <span className="font-medium">{place.name}</span>
              <p className="text-sm text-gray-500">{place.location}</p>
            </div>
            <select
              value={ratings[place.id] || 0}
              onChange={e => handleRating(place.id, +e.target.value)}
              className="border rounded p-1"
            >
              <option value={0}>—</option>
              {[1, 2, 3, 4, 5].map(v => (
                <option key={v} value={v}>{v} ⭐</option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Rating yang dipilih: {Object.values(ratings).filter(r => r >= 1).length} tempat
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Lanjutkan'}
      </button>
    </div>
  );
}