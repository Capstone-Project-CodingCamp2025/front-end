import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/user');
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center pt-20 px-2">
        <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-3xl bg-white rounded-xl shadow-md border border-black overflow-hidden">
          <div className="hidden md:block relative w-1/2 h-[430px]">
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-center font-semibold text-lg mb-4">LOGIN</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
              />
              <div className="flex justify-between items-center text-sm">
                <a href="/forget-password" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-full mt-2"
              >
                Log In
              </button>
              <div className="text-center text-sm mt-2">
                Belum punya akun?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">Signup</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}