import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// FIXED: Helper untuk get auth header with consistent token key
const getAuthHeader = () => {
  // FIXED: Use consistent token key 'authToken'
  const token = localStorage.getItem('authToken');
  console.log('🔑 Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'null');
  
  if (!token) {
    console.warn('⚠️ No auth token found in localStorage');
    return {};
  }
  
  return { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Add bookmark
export const addBookmark = async (placeId) => {
  console.log('=== ADD BOOKMARK API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    const headers = getAuthHeader();
    console.log('📤 Request headers:', headers);
    
    const response = await axios.post(
      `${API_BASE_URL}/bookmarks`, 
      { place_id: placeId },
      { headers }
    );
    
    console.log('✅ Bookmark added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Add bookmark error:', error.response?.data || error.message);
    console.error('❌ Error status:', error.response?.status);
    throw error.response?.data || { message: error.message, statusCode: error.response?.status };
  }
};

// Remove bookmark
export const removeBookmark = async (placeId) => {
  console.log('=== REMOVE BOOKMARK API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    const headers = getAuthHeader();
    console.log('📤 Request headers:', headers);
    
    const response = await axios.delete(
      `${API_BASE_URL}/bookmarks/${placeId}`,
      { headers }
    );
    
    console.log('✅ Bookmark removed successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Remove bookmark error:', error.response?.data || error.message);
    console.error('❌ Error status:', error.response?.status);
    throw error.response?.data || { message: error.message, statusCode: error.response?.status };
  }
};

// Get user bookmarks
export const getUserBookmarks = async () => {
  console.log('=== GET USER BOOKMARKS API CALL ===');
  
  try {
    const headers = getAuthHeader();
    console.log('📤 Request headers:', headers);
    
    const response = await axios.get(
      `${API_BASE_URL}/bookmarks`,
      { headers }
    );
    
    console.log('✅ Raw bookmarks response:', response.data);
    console.log('📊 Bookmarks data structure:', {
      hasData: !!response.data.data,
      isArray: Array.isArray(response.data.data),
      length: response.data.data?.length || 0,
      sample: response.data.data?.[0] || null
    });
    
    return response.data;
  } catch (error) {
    console.error('❌ Get bookmarks error:', error.response?.data || error.message);
    console.error('❌ Error status:', error.response?.status);
    throw error.response?.data || { message: error.message, statusCode: error.response?.status };
  }
};

// Check bookmark status
export const checkBookmarkStatus = async (placeId) => {
  console.log('=== CHECK BOOKMARK STATUS API CALL ===');
  console.log('Place ID:', placeId);
  
  try {
    const headers = getAuthHeader();
    console.log('📤 Request headers:', headers);
    
    const response = await axios.get(
      `${API_BASE_URL}/bookmarks/check/${placeId}`,
      { headers }
    );
    
    console.log('✅ Bookmark status checked:', response.data.data?.is_bookmarked);
    return response.data;
  } catch (error) {
    console.error('❌ Check bookmark status error:', error.response?.data || error.message);
    console.error('❌ Error status:', error.response?.status);
    throw error.response?.data || { message: error.message, statusCode: error.response?.status };
  }
};

// Check multiple bookmark status
export const checkMultipleBookmarkStatus = async (placeIds) => {
  console.log('=== CHECK MULTIPLE BOOKMARK STATUS API CALL ===');
  console.log('Place IDs:', placeIds);
  
  try {
    const headers = getAuthHeader();
    console.log('📤 Request headers:', headers);
    
    const response = await axios.post(
      `${API_BASE_URL}/bookmarks/status`,
      { place_ids: placeIds },
      { headers }
    );
    
    console.log('✅ Multiple bookmark status checked:', Object.keys(response.data.data || {}).length);
    return response.data;
  } catch (error) {
    console.error('❌ Check multiple bookmark status error:', error.response?.data || error.message);
    console.error('❌ Error status:', error.response?.status);
    throw error.response?.data || { message: error.message, statusCode: error.response?.status };
  }
};