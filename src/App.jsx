import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Alldestination from './pages/Alldestination'
import About from './pages/About'
import Destinationdetail from './pages/DestinationDetail'
import Login from './pages/Auth/login'
import Register from './pages/Auth/Register'
import ForgetPassword from './pages/Auth/forget/ForgetPassword';
import OtpReset from './pages/Auth/forget/OtpReset';
import NewPassword from './pages/Auth/forget/NewPassword';
import UserPage from './pages/UserPage'
import BookmarkPage from './pages/BookmarkPage';
import ExploreMore from './pages/ExploreMore'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/about" element={<About />} />
            <Route path="/destination" element={<Alldestination />} />
            <Route path="/destination/:id" element={<Destinationdetail />} />          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp-reset" element={<OtpReset />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/explore-more" element={<ExploreMore />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App