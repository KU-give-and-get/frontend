import { Route,Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Market from "./pages/Market"
import MyList from "./pages/MyList"
import Contact from "./pages/Contact"
import ProductDetail from "./pages/ProductDetail"
import CreateProduct from "./pages/CreateProduct"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import EditProduct from "./pages/EditProduct"
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login';

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:[9vw]">
      {!hideNavbar && <Navbar/>}
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
      <Route path="/market/:productId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
      <Route path="/myList" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      <Route path="/edit/:productId" element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
