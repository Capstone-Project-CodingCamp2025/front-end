// Contact.jsx - Updated dengan integrasi useContactPresenter dan animasi
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import useContactPresenter from '../presenter/useContactPresenter';
import useIntersectionObserver from '../Hook/useIntersectionObserver';

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const { 
    loading, 
    error, 
    success, 
    sendContact, 
    resetState 
  } = useContactPresenter();

  // Intersection Observer hooks untuk animasi
  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contactInfoRef, isContactInfoVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [whySimresitaRef, isWhySimresitaVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contactFormRef, isContactFormVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await sendContact(formData);
    
    if (result.success) {
      // Reset form setelah berhasil
      setTimeout(() => {
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
        resetState();
      }, 3000);
    }
  };

  // Reset error ketika user mulai mengetik
  useEffect(() => {
    if (error && (formData.nama || formData.email || formData.subjek || formData.pesan)) {
      resetState();
    }
  }, [formData, error, resetState]);

  // Animation classes
  const baseTransition = 'transition-all duration-700 ease-out';
  const initialStyle = 'opacity-0 translate-y-10';
  const visibleStyle = 'opacity-100 translate-y-0';

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header dengan animasi */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 ${baseTransition} ${
              isHeaderVisible ? visibleStyle : initialStyle
            }`}
          >
            <h1 
              className={`text-5xl md:text-6xl font-bold text-gray-800 mb-6 ${baseTransition} delay-100 ${
                isHeaderVisible ? visibleStyle : initialStyle
              }`}
            >
              Hubungi <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Kami</span>
            </h1>
            <p 
              className={`text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed ${baseTransition} delay-200 ${
                isHeaderVisible ? visibleStyle : initialStyle
              }`}
            >
              Punya saran atau masukan tentang <strong>SIRESITA – Sumatera Utara</strong>? 
              Kami ingin mendengar dari Anda untuk meningkatkan pengalaman dalam menampilkan destinasi wisata tersembunyi di Sumut.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info Kontak dengan animasi */}
            <div className="space-y-8">
              <div 
                ref={contactInfoRef}
                className={`bg-white shadow-xl rounded-2xl p-8 border border-blue-100 ${baseTransition} ${
                  isContactInfoVisible ? visibleStyle : initialStyle
                }`}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
                <div className="space-y-6">
                  <div 
                    className={`flex items-center space-x-4 group ${baseTransition} delay-100 ${
                      isContactInfoVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="text-gray-800 font-medium">siresitadbs@gmail.com</p>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center space-x-4 group ${baseTransition} delay-200 ${
                      isContactInfoVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Telepon</p>
                      <p className="text-gray-800 font-medium">+62 812-3456-7890</p>
                    </div>
                  </div>
                  <div 
                    className={`flex items-center space-x-4 group ${baseTransition} delay-300 ${
                      isContactInfoVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Lokasi</p>
                      <p className="text-gray-800 font-medium">Medan, Sumatera Utara</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Tambahan dengan animasi */}
              <div 
                ref={whySimresitaRef}
                className={`bg-blue-50 rounded-2xl p-8 border border-blue-100 shadow-md ${baseTransition} delay-200 ${
                  isWhySimresitaVisible ? visibleStyle : initialStyle
                }`}
              >
                <h3 
                  className={`text-xl font-bold text-gray-800 mb-4 ${baseTransition} delay-300 ${
                    isWhySimresitaVisible ? visibleStyle : initialStyle
                  }`}
                >
                  Kenapa SIRESITA?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li 
                    className={`flex items-center space-x-3 ${baseTransition} delay-400 ${
                      isWhySimresitaVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Menemukan Destinasi Tersembunyi</span>
                  </li>
                  <li 
                    className={`flex items-center space-x-3 ${baseTransition} delay-500 ${
                      isWhySimresitaVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Rekomendasi yang Dipersonalisasi</span>
                  </li>
                  <li 
                    className={`flex items-center space-x-3 ${baseTransition} delay-600 ${
                      isWhySimresitaVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Antarmuka Ramah Pengguna</span>
                  </li>
                  <li 
                    className={`flex items-center space-x-3 ${baseTransition} delay-700 ${
                      isWhySimresitaVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Wawasan Berbasis Komunitas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Kontak dengan animasi */}
            <div 
              ref={contactFormRef}
              className={`bg-white shadow-xl rounded-2xl p-8 border border-blue-100 ${baseTransition} delay-100 ${
                isContactFormVisible ? visibleStyle : initialStyle
              }`}
            >
              {success ? (
                <div 
                  className={`text-center py-12 ${baseTransition} ${
                    isContactFormVisible ? visibleStyle : initialStyle
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pesan Terkirim!</h3>
                  <p className="text-gray-600">Terima kasih atas pesan Anda. Kami akan segera merespon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Alert */}
                  {error && (
                    <div 
                      className={`bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 ${baseTransition} ${
                        isContactFormVisible ? visibleStyle : initialStyle
                      }`}
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div className="text-red-700 text-sm">
                        <p className="font-medium">Terjadi kesalahan:</p>
                        <p>{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div 
                      className={`${baseTransition} delay-200 ${
                        isContactFormVisible ? visibleStyle : initialStyle
                      }`}
                    >
                      <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Anda *
                      </label>
                      <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div 
                      className={`${baseTransition} delay-300 ${
                        isContactFormVisible ? visibleStyle : initialStyle
                      }`}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="email@contoh.com"
                        required
                      />
                    </div>
                  </div>
                  <div 
                    className={`${baseTransition} delay-400 ${
                      isContactFormVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <label htmlFor="subjek" className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <input
                      type="text"
                      id="subjek"
                      name="subjek"
                      value={formData.subjek}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Masukan subjek pesan"
                      required
                    />
                  </div>
                  <div 
                    className={`${baseTransition} delay-500 ${
                      isContactFormVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      disabled={loading}
                      rows={6}
                      className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tulis pesan atau ide Anda untuk SIRESITA!"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${baseTransition} delay-600 ${
                      isContactFormVisible ? visibleStyle : initialStyle
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Pesan</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;