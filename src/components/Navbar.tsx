import { Link, NavLink } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออก // redirect ไปหน้า login
  };

  return (
    <div className="flex justify-between py-5 font-medium">
      {/* logo */}
      <div>LOGO HERE</div>

      {/* middle section*/}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to='/' className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/market' className="flex flex-col items-center">
          <p>SHARING</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/wishList' className="flex flex-col items-center">
          <p>WISH ITEMS</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/myList' className="flex flex-col items-center">
          <p>MY SHARING</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/myWishList' className="flex flex-col items-center">
          <p>MY WISH LIST</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center">
          <p>CONTACT</p>
          <hr className="w-2/4 bg-gray-700 hidden"/>
        </NavLink>
      </ul>

      {/* last section */}
      <div className="flex items-center gap-6">
        <Link to='/chat'>
          <img 
            src="/images/chat_icon.png" 
            alt=""
            className="w-6 cursor-pointer"  
          />
        </Link>
        <div className="group relative">
          <img src="/images/profile_icon.png" alt="" className="w-5 cursor-pointer"/>
          {/* dropdown menu */}
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 bg-slate-100 text-gray-500 w-32 py-3 px-5 rounded">
              <Link to="/profile">
                <p className="hover:text-black cursor-pointer">profile</p>
              </Link>
              <Link to='/login'>
                <p 
                  className="hover:text-black cursor-pointer"
                  onClick={handleLogout}
                >Logout</p>
              </Link>
            </div>
          </div>
        </div>

        <img onClick={() => setVisible(true)} src="/images/menu_icon.png" alt="" className="w-5 sm:hidden cursor-pointer"/>
      </div>

      {/* sidebar for small screen */}
      <div className={`absolute overflow-hidden transition-all top-0 right-0 bottom-0 bg-white ${visible? 'w-full': 'w-0'}`}>
        <div className="flex flex-col text-gray-700">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
           <img className="rotate-180 w-4" src="/images/dropdown_icon.png" alt="" />
           <p>back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/market'>MARKET</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/myList'>MY LIST</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar
