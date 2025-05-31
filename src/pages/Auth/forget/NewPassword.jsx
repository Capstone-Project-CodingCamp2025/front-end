/* eslint-disable no-unused-vars */
import { Link,useNavigate } from 'react-router-dom';

export default function NewPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-1 px-2 pt-20">
        <div className="w-full max-w-md overflow-hidden bg-white border border-black shadow-md rounded-xl">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="mb-4 text-lg font-semibold text-center">Create New Password</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                className="px-3 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="px-3 py-2 border rounded"
              />
              <button
                type="submit"
                className="py-2 mt-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500"
              >
                Save New Password
              </button>
              <div className="mt-2 text-sm text-center">
                Back to{' '}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}