import { Link,useNavigate } from 'react-router-dom';

export default function OtpReset() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-password');
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center pt-20 px-2">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-black overflow-hidden">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-center font-semibold text-lg mb-4">Enter OTP Code</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="border rounded px-3 py-2 text-center tracking-widest"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-full mt-2"
              >
                Verify OTP
              </button>
              <div className="text-center text-sm mt-2">
                Didn't receive the code?{' '}
                <button type="button" className="text-blue-600 hover:underline bg-transparent border-none p-0 m-0">Resend</button>
              </div>
              <div className="text-center text-sm mt-2">
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