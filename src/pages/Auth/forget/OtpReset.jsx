import { Link } from 'react-router-dom';
import { useOtpResetPresenter } from '../../../presenter/useOtpResetPresenter';

export default function OtpReset() {
  const {
    otp,
    setOtp,
    isLoading,
    email,
    handleVerifyOtp,
    handleResendOtp,
    isResendingOtp,
    countdown,
  } = useOtpResetPresenter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleVerifyOtp();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-1 px-2 pt-20">
        <div className="w-full max-w-md overflow-hidden bg-white border shadow-xl rounded-2xl">
          <div className="flex flex-col justify-center p-6 md:p-10">
            <Link to="/" className="self-center mb-6 text-2xl font-bold text-blue-600">
              SIRESITA
            </Link>
            <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Masukkan Kode OTP</h2>
            <p className="mb-6 text-sm text-center text-gray-600">
              Kami telah mengirimkan kode OTP ke email <span className="font-medium">{email}</span>.
            </p>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="otp-input" className="block mb-1 text-sm font-medium text-gray-700">
                  Kode OTP (6 digit)
                </label>
                <input
                  type="text"
                  id="otp-input"
                  maxLength={6}
                  placeholder="------"
                  className="w-full px-4 py-3 text-lg tracking-widest text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className={`w-full py-3 mt-3 font-semibold text-white transition-all duration-300 transform rounded-lg ${
                  isLoading || otp.length !== 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Memverifikasi...' : 'Verifikasi OTP'}
              </button>
              
              <div className="mt-4 text-sm text-center text-gray-600">
                Tidak menerima kode?{' '}
                <button 
                  type="button" 
                  onClick={handleResendOtp}
                  className={`font-semibold transition-colors ${
                    countdown > 0 || isResendingOtp
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:underline hover:text-blue-700'
                  }`}
                  disabled={countdown > 0 || isResendingOtp}
                >
                  {isResendingOtp 
                    ? 'Mengirim...' 
                    : countdown > 0 
                      ? `Kirim Ulang (${countdown}s)` 
                      : 'Kirim Ulang'
                  }
                </button>
              </div>
              
              <div className="mt-2 text-sm text-center">
                Kembali ke{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}