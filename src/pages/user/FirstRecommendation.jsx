import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularRecommendations,
  getRecommendations,
} from '../../api/recommendations';
import {submitInitialRatings} from '../../api/ratings';
import { Star, MapPin, CheckCircle, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function FirstRecommendation() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [success, setSuccess] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

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
      setError('Silakan beri rating minimal 3 tempat untuk mendapatkan rekomendasi terbaik.');
      return;
    }

    setSubmitLoading(true);
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
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan rating.');
      setDebugInfo(JSON.stringify(err.response?.data) || err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const ratedCount = Object.values(ratings).filter(r => r >= 1).length;
  const progress = Math.min((ratedCount / 3) * 100, 100);

  // While checking recommendations
  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
          </div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Memeriksa status rekomendasi...</p>
        </div>
      </div>
    );
  }


  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sempurna! 🎉</h2>
          <p className="text-lg text-gray-600 mb-6">Rating Anda telah disimpan dengan sukses. Kami sedang menyiapkan rekomendasi personal yang menakjubkan untuk Anda!</p>
          <div className="flex items-center justify-center space-x-2 text-indigo-600">
            <span className="font-medium">Mengarahkan ke rekomendasi</span>
            <ArrowRight className="w-5 h-5 animate-bounce" style={{ animationDirection: 'alternate' }} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Ada Masalah</h2>
          <div className="p-4 bg-red-100 text-red-800 rounded-lg mb-6 text-left">
            {error}
          </div>
          {debugInfo && (
            <pre className="bg-gray-100 p-3 text-sm rounded-lg mb-6 text-left overflow-auto">
              {debugInfo}
            </pre>
          )}
          <button 
            onClick={() => setError(null)} 
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ceritakan Preferensi Anda
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pilih dan beri rating 3-5 tempat yang menarik bagi Anda. Ini akan membantu kami menciptakan rekomendasi yang sempurna sesuai selera Anda.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress Rating</span>
            <span className="text-sm font-medium text-indigo-600">{ratedCount}/3 minimum</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {ratedCount >= 3 && (
            <p className="text-sm text-green-600 font-medium mt-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Siap untuk mendapatkan rekomendasi!
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {places.map(place => (
                <div 
                  key={place.id} 
                  className={`group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer ${
                    ratings[place.id] ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredPlace(place.id)}
                  onMouseLeave={() => setHoveredPlace(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        {place.image ? (
                          <img 
                            src={`http://localhost:5000/gambar_data/${place.image}`}
                            alt={place.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-2xl" style={{display: place.image ? 'none' : 'flex'}}>
                          📍
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                          {place.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-500 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{place.location}</span>
                        </div>
                        {place.category && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-2">
                            {place.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Rating Anda:</span>
                      {ratings[place.id] && (
                        <div className="flex items-center space-x-1">
                          {[...Array(ratings[place.id])].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(value => (
                        <button
                          key={value}
                          onClick={() => handleRating(place.id, value)}
                          className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
                            ratings[place.id] === value
                              ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg scale-105'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'
                          }`}
                        >
                          <Star className={`w-4 h-4 mx-auto ${ratings[place.id] === value ? 'fill-current' : ''}`} />
                          <span className="block mt-1">{value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={submitLoading || ratedCount < 3}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  ratedCount >= 3 && !submitLoading
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transform'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {submitLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan Rating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Simpan Rating & Lihat Rekomendasi</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </button>
              
              <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
                Rating Anda akan membantu algoritma AI kami memberikan rekomendasi destinasi yang sesuai dengan preferensi dan minat Anda.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}