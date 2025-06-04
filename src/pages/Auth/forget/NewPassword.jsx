/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useNewPasswordPresenter } from '../../../presenter/useNewPasswordPresenter';

export default function NewPassword() {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleResetPassword,
  } = useNewPasswordPresenter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleResetPassword();
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-1 px-2 pt-20">
        <div className="w-full max-w-md overflow-hidden bg-white border shadow-xl rounded-2xl">
          <div className="flex flex-col justify-center p-6 md:p-10">
            <Link to="/" className="self-center mb-6 text-2xl font-bold text-blue-600">
              SIRESITA
            </Link>
            <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Buat Kata Sandi Baru</h2>
            <p className="mb-6 text-sm text-center text-gray-600">
              Masukkan kata sandi baru Anda di bawah ini.
            </p>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="new-password"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="new-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-3 font-semibold text-white transition-all duration-300 transform rounded-lg ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}
              </button>
              <div className="mt-4 text-sm text-center">
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