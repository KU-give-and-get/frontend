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
import Chat from "./pages/Chat"
import ChatDetail from "./pages/ChatDetail"
import WishList from "./pages/WishList"
import WishDetail from "./pages/WishDetail"
import MyWishList from "./pages/MyWIshList"
import CreateWishItem from "./pages/CreateWishItem"
import EditWish from "./pages/EditWish"
import EditProfile from "./pages/EditProfile"
import Reservation from "./pages/Reservation"
import ReceivedItems from "./pages/ReceivedItems"
import ReceiverDetail from "./pages/ReceiverDetail"
import ResetPassword from "./pages/ResetPassword"

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname.startsWith('/verify-email') || location.pathname.startsWith('/reset-password');

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:[9vw]">
      {!hideNavbar && <Navbar/>}
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
      <Route path="/market/:productId" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
      <Route path="/createWishItem" element={<ProtectedRoute><CreateWishItem/></ProtectedRoute>}/>
      <Route path="/myList" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      <Route path="/edit/:productId" element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>
      <Route path="/editWish/:wishId" element={<ProtectedRoute><EditWish/></ProtectedRoute>}/>
      <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
      <Route path="/chat/:chatId" element={<ProtectedRoute><ChatDetail/></ProtectedRoute>}/>
      <Route path="/wishList" element={<ProtectedRoute><WishList/></ProtectedRoute>}/>
      <Route path="/wishList/:wishId"element={<ProtectedRoute><WishDetail/></ProtectedRoute>} />
      <Route path="/MyWishList"element={<ProtectedRoute><MyWishList/></ProtectedRoute>} />
      <Route path="/editProfile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
      <Route path="/reservation/:productId" element={<ProtectedRoute><Reservation/></ProtectedRoute>}/>
      <Route path="/received" element={<ProtectedRoute><ReceivedItems/></ProtectedRoute>}/>
      <Route path="/receiver/:receiverId" element={<ProtectedRoute><ReceiverDetail/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
