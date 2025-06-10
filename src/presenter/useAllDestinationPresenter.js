import { useState, useEffect, useCallback } from 'react';
import { getPopularRecommendations } from '../api/recommendations';
import { getAllPlaces } from '../api/place'; // Tambahkan import ini

export function useAllDestinationPresenter() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    console.log('=== DEBUGGING DESTINATION DATA SOURCE ===');
    setIsLoading(true);
    setError(null);
    
    try {
      // DEBUGGING: Cek data dari kedua sumber
      console.log('🔍 Checking getAllPlaces...');
      try {
        const allPlacesData = await getAllPlaces();
        console.log('✅ getAllPlaces result:', {
          isArray: Array.isArray(allPlacesData),
          count: Array.isArray(allPlacesData) ? allPlacesData.length : 'not array',
          sample: Array.isArray(allPlacesData) && allPlacesData.length > 0 ? allPlacesData[0] : 'no data'
        });
      } catch (getAllError) {
        console.log('❌ getAllPlaces failed:', getAllError.message);
      }
      
      console.log('🔍 Checking getPopularRecommendations...');
      const popularData = await getPopularRecommendations();
      console.log('✅ getPopularRecommendations result:', {
        isArray: Array.isArray(popularData),
        count: Array.isArray(popularData) ? popularData.length : 'not array',
        hasDestinations: popularData?.destinations ? popularData.destinations.length : 'no destinations property',
        sample: Array.isArray(popularData) && popularData.length > 0 ? {
          id: popularData[0].id,
          name: popularData[0].name || popularData[0].nama_tempat,
          hasId: !!popularData[0].id
        } : 'no data'
      });
      
      // Proses data seperti biasa
      if (Array.isArray(popularData)) {
        console.log('📊 Using direct array data');
        setDestinations(popularData);
      } else if (Array.isArray(popularData.destinations)) {
        console.log('📊 Using nested destinations data');
        setDestinations(popularData.destinations);
      } else {
        console.warn('📊 Unexpected data shape:', popularData);
        setDestinations([]); // fallback
      }
      
      // TAMBAHAN: Cek apakah data punya ID yang valid
      const finalData = Array.isArray(popularData) ? popularData : popularData.destinations || [];
      if (finalData.length > 0) {
        console.log('🔍 Checking destination IDs:');
        finalData.slice(0, 5).forEach((dest, idx) => {
          console.log(`  [${idx}] ID: ${dest.id} (${typeof dest.id}) - Name: ${dest.name || dest.nama_tempat}`);
        });
      }
      
    } catch (err) {
      console.error("❌ Presenter: Gagal mengambil destinasi:", err);
      setError("Gagal memuat destinasi. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return {
    destinations,
    isLoading,
    error,
    reloadDestinations: fetchDestinations,
  };
}