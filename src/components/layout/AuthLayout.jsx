import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* bisa menambahkan logo SIRESITA di sini */}
      {/* <img src="/path/to/siresita-logo.svg" alt="SIRESITA" className="w-32 h-auto mb-8" /> */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;