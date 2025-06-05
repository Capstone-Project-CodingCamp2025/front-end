import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function useBookmarkPresenter() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadBookmarks = useCallback(() => {
    setIsLoading(true);
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setBookmarks(savedBookmarks);
    } catch (e) {
      console.error("Presenter: Error loading bookmarks from localStorage", e);
      setBookmarks([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const handleRemoveBookmark = (id) => {
    Swal.fire({
      title: 'Hapus Bookmark?',
      text: "Apakah Anda yakin ingin menghapus destinasi ini dari bookmark?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBookmarks = bookmarks.filter((item) => String(item.id) !== String(id));
        setBookmarks(updatedBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        Swal.fire('Dihapus!', 'Destinasi telah dihapus dari bookmark.', 'success');
      }
    });
  };

const navigateToDestination = (destinationId) => {
    console.log("Navigating to destination:", destinationId);
    if (destinationId === undefined || destinationId === null) {
      console.error("Error: destinationId is undefined or null in navigateToDestination.");
      return; 
    }
    navigate(`/destination/${destinationId}`);
    window.scrollTo(0, 0);
  };

  return {
    bookmarks,
    isLoading,
    handleRemoveBookmark,
    navigateToDestination,
  };
}