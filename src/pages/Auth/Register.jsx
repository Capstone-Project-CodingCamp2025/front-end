import { Link,useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };


  return (
    <main className="min-h-screen flex flex-col p-10">
      <div className="flex-1 flex items-center justify-center pt-20 px-2 p-10">
        <div className="flex w-full max-w-3xl bg-white rounded-xl shadow-md border border-black overflow-hidden">
          <div className="hidden md:block relative w-1/2 h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1653992145035-718b18fab561?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-center font-semibold text-lg mb-4">REGISTER</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                className="border rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email/username"
                className="border rounded px-3 py-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-full mt-2"
              >
                Register
              </button>
              <div className="text-center text-sm mt-2">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}