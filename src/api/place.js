import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getAllPlaces = async () => {
  console.log('=== GET ALL PLACES API CALL ===');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/places`);
    
    console.log('✅ Places loaded successfully:', response.data.length);
    
    // Log sample for debugging
    if (response.data.length > 0) {
      console.log('Sample place images:', response.data.slice(0, 1).map(p => ({
        id: p.id,
        name: p.name,
        mainImage: p.image,
        hasAllImages: p.allImages?.length > 0,
        allImagesCount: p.allImages?.length || 0
      })));
      
      // Log available IDs for debugging
      const availableIds = response.data.map(p => p.id);
      console.log('Available place IDs (first 20):', availableIds.slice(0, 20));
      console.log('Available place IDs (last 20):', availableIds.slice(-20));
      console.log('Total available places:', availableIds.length);
    }
    
    return response.data;
  } catch (error) {
    console.error("❌ Model: Gagal mengambil semua tempat:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getPlaceById = async (id) => {
  console.log('=== GET PLACE BY ID API CALL ===');
  console.log('Requesting place ID:', id, 'Type:', typeof id);
  
  // Validate ID before making request
  if (!id) {
    console.error('❌ No place ID provided');
    throw new Error('ID tempat tidak boleh kosong');
  }
  
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    console.error('❌ Invalid place ID format:', id);
    throw new Error('ID tempat harus berupa angka yang valid');
  }
  
  try {
    console.log('Making API request for place ID:', numericId);
    const response = await axios.get(`${API_BASE_URL}/places/${numericId}`);
    
    console.log('✅ Place detail loaded successfully:', response.data.name);
    console.log('Place details:', {
      id: response.data.id,
      name: response.data.name,
      hasImage: !!response.data.image,
      imageCount: response.data.allImages?.length || 0
    });
    
    return response.data;
  } catch (error) {
    console.error(`❌ Model: Gagal mengambil tempat dengan ID ${numericId}:`, error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      const errorData = error.response.data;
      console.log('Error details:', errorData);
      
      // Extract available IDs from error response
      const availableIds = errorData.availableIds || [];
      const totalPlaces = errorData.totalPlaces || 0;
      
      console.log('Available place IDs from error:', availableIds);
      console.log('Total places in database:', totalPlaces);
      
      // Create helpful error message
      let errorMessage = `Tempat dengan ID ${numericId} tidak ditemukan.`;
      if (availableIds.length > 0) {
        errorMessage += ` Coba gunakan ID: ${availableIds.slice(0, 10).join(', ')}`;
        if (availableIds.length > 10) {
          errorMessage += ` (dan ${availableIds.length - 10} lainnya)`;
        }
      }
      
      const customError = new Error(errorMessage);
      customError.statusCode = 404;
      customError.availableIds = availableIds;
      customError.totalPlaces = totalPlaces;
      throw customError;
    }
    
    // For other errors
    const customError = new Error(error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengambil data tempat');
    customError.statusCode = error.response?.status || 500;
    throw customError;
  }
};

// Helper function to get available place IDs
export const getAvailablePlaceIds = async () => {
  console.log('=== GET AVAILABLE PLACE IDS ===');
  
  try {
    const places = await getAllPlaces();
    const ids = places.map(place => place.id).sort((a, b) => a - b);
    
    console.log('Available place IDs:', {
      total: ids.length,
      first10: ids.slice(0, 10),
      last10: ids.slice(-10),
      range: { min: Math.min(...ids), max: Math.max(...ids) }
    });
    
    return ids;
  } catch (error) {
    console.error('❌ Error getting available place IDs:', error);
    return [];
  }
};

// Helper function to check if place ID exists
export const checkPlaceExists = async (id) => {
  console.log('=== CHECK PLACE EXISTS ===');
  console.log('Checking place ID:', id);
  
  try {
    const availableIds = await getAvailablePlaceIds();
    const numericId = parseInt(id);
    const exists = availableIds.includes(numericId);
    
    console.log('Place exists check result:', {
      id: numericId,
      exists: exists,
      nearbyIds: availableIds.filter(availableId => 
        Math.abs(availableId - numericId) <= 5
      ).slice(0, 10)
    });
    
    return {
      exists: exists,
      availableIds: availableIds,
      nearbyIds: availableIds.filter(availableId => 
        Math.abs(availableId - numericId) <= 5
      )
    };
  } catch (error) {
    console.error('❌ Error checking place existence:', error);
    return { exists: false, availableIds: [], nearbyIds: [] };
  }
};