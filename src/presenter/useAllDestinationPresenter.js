import { useState, useEffect, useCallback } from 'react';
import { getAllPlaces } from '../api/place'; 

export function useAllDestinationPresenter() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllPlaces(); 
      setDestinations(data || []); 
    } catch (err) {
      console.error("Presenter: Gagal mengambil destinasi:", err);
      setError("Gagal memuat destinasi. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // Menyediakan state dan fungsi untuk digunakan oleh View
  return {
    destinations,
    isLoading,
    error,
    reloadDestinations: fetchDestinations,
  };
}