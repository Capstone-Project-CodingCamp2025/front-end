/* eslint-disable no-unused-vars */
import SiresitaLogo from "../common/SiresitaLogo";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700">
      <div className="animate-pulse">
        <SiresitaLogo className="w-24 h-24 text-white md:w-32 md:h-32" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white delay-150 md:text-4xl font-display animate-pulse">
        SIRESITA
      </h1>
      <p className="mt-2 text-sm text-blue-200 delay-300 md:text-base animate-pulse">
        Menyiapkan petualangan terbaik untuk Anda...
      </p>
    </div>
  );
};

export default LoadingScreen;