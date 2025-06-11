// presenter/useContactPresenter.js
import { useState, useCallback } from 'react';
import ContactAPI from '../api/contact';

const useContactPresenter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reset state
  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  // Validasi data kontak di frontend
  const validateContactData = useCallback((data) => {
    const errors = [];
    const { nama, email, subjek, pesan } = data;

    // Validasi nama
    if (!nama || nama.trim().length === 0) {
      errors.push('Nama wajib diisi');
    } else if (nama.trim().length < 2) {
      errors.push('Nama minimal 2 karakter');
    } else if (nama.trim().length > 255) {
      errors.push('Nama maksimal 255 karakter');
    }

    // Validasi email
    if (!email || email.trim().length === 0) {
      errors.push('Email wajib diisi');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push('Format email tidak valid');
      } else if (email.trim().length > 255) {
        errors.push('Email maksimal 255 karakter');
      }
    }

    // Validasi subjek
    if (!subjek || subjek.trim().length === 0) {
      errors.push('Subjek wajib diisi');
    } else if (subjek.trim().length < 5) {
      errors.push('Subjek minimal 5 karakter');
    } else if (subjek.trim().length > 500) {
      errors.push('Subjek maksimal 500 karakter');
    }

    // Validasi pesan
    if (!pesan || pesan.trim().length === 0) {
      errors.push('Pesan wajib diisi');
    } else if (pesan.trim().length < 10) {
      errors.push('Pesan minimal 10 karakter');
    } else if (pesan.trim().length > 5000) {
      errors.push('Pesan maksimal 5000 karakter');
    }

    return errors;
  }, []);

  // Kirim pesan kontak
  const sendContact = useCallback(async (contactData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validasi di frontend terlebih dahulu
      const validationErrors = validateContactData(contactData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return { success: false, errors: validationErrors };
      }

      // Kirim ke API
      const result = await ContactAPI.sendContact(contactData);
      
      if (result.success) {
        setSuccess(true);
        return { success: true, data: result.data, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat mengirim pesan';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [validateContactData]);

  // Dapatkan semua pesan kontak (untuk admin)
  const getAllContacts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await ContactAPI.getAllContacts(params);
      
      if (result.success) {
        return { 
          success: true, 
          data: result.data, 
          pagination: result.pagination,
          message: result.message 
        };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat mengambil data pesan kontak';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Dapatkan detail pesan kontak (untuk admin)
  const getContactById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      if (!id) {
        const errorMessage = 'ID pesan kontak diperlukan';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const result = await ContactAPI.getContactById(id);
      
      if (result.success) {
        return { success: true, data: result.data, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat mengambil detail pesan kontak';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update status pesan kontak (untuk admin)
  const updateContactStatus = useCallback(async (id, status) => {
    try {
      setLoading(true);
      setError(null);

      if (!id || !status) {
        const errorMessage = 'ID dan status diperlukan';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const validStatuses = ['unread', 'read', 'replied'];
      if (!validStatuses.includes(status)) {
        const errorMessage = 'Status tidak valid';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const result = await ContactAPI.updateContactStatus(id, status);
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat mengubah status pesan kontak';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Hapus pesan kontak (untuk admin)
  const deleteContact = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      if (!id) {
        const errorMessage = 'ID pesan kontak diperlukan';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const result = await ContactAPI.deleteContact(id);
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat menghapus pesan kontak';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Dapatkan statistik pesan kontak (untuk admin)
  const getContactStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ContactAPI.getContactStats();
      
      if (result.success) {
        return { success: true, data: result.data, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan saat mengambil statistik pesan kontak';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    success,
    
    // Actions
    sendContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
    getContactStats,
    resetState,
    
    // Utility
    validateContactData
  };
};

export default useContactPresenter; 