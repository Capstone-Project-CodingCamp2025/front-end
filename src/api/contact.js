// api/contact.js
const API_BASE_URL = 'http://localhost:5000/api';

class ContactAPI {
  // Kirim pesan kontak
  static async sendContact(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - sendContact error:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengirim pesan kontak'
      };
    }
  }

  // Dapatkan semua pesan kontak (admin only)
  static async getAllContacts(params = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const queryString = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.status && { status: params.status })
      }).toString();

      const response = await fetch(`${API_BASE_URL}/contacts?${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data.data,
        pagination: data.pagination,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - getAllContacts error:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengambil data pesan kontak'
      };
    }
  }

  // Dapatkan detail pesan kontak (admin only)
  static async getContactById(id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - getContactById error:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengambil detail pesan kontak'
      };
    }
  }

  // Update status pesan kontak (admin only)
  static async updateContactStatus(id, status) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - updateContactStatus error:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengubah status pesan kontak'
      };
    }
  }

  // Hapus pesan kontak (admin only)
  static async deleteContact(id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - deleteContact error:', error);
      return {
        success: false,
        error: error.message || 'Gagal menghapus pesan kontak'
      };
    }
  }

  // Dapatkan statistik pesan kontak (admin only)
  static async getContactStats() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await fetch(`${API_BASE_URL}/contacts/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('ContactAPI - getContactStats error:', error);
      return {
        success: false,
        error: error.message || 'Gagal mengambil statistik pesan kontak'
      };
    }
  }

  // Utility method untuk mengecek apakah user adalah admin
  static async isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Utility method untuk mendapatkan token
  static getToken() {
    return localStorage.getItem('token');
  }

  // Utility method untuk menghapus token (logout)
  static removeToken() {
    localStorage.removeItem('token');
  }
}

export default ContactAPI;