import { useState, useEffect, useCallback } from 'react';
import { getPopularRecommendations } from '../../src/api/recommendations';
import { useNavigate } from 'react-router-dom';

export function useDestinationGridPresenter() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPopularRecommendations();
      setDestinations(data.destinations || data || []);
    } catch (err) {
      console.error("Presenter: Failed to fetch recommendations:", err);
      setError("Gagal memuat rekomendasi populer.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const navigateToAllDestinations = () => {
    navigate("/destination");
    window.scrollTo(0, 0);
  };

  const navigateToDestinationDetail = (id) => {
  console.log("Presenter: navigateToDestinationDetail called with ID:", id); 
  if (typeof id === 'undefined' || id === null) {
    console.error("Presenter: ID is invalid for navigation.");
    return;
  }
  navigate(`/destination/${id}`);
  window.scrollTo(0, 0);
};

  return {
    destinations,
    isLoading,
    error,
    navigateToAllDestinations,
    navigateToDestinationDetail,
  };
}