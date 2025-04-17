// import React from "react";
// import logoImg from "../../assets/Logo.png";
// import { Link } from "react-router-dom";
// import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// import { useSideHeader } from "../../store";
// import SideHeader from "../SideHeader";
// export default function MainHeader() {
//   const {sideHeader , openSideHeader} = useSideHeader();
//   return (
//     <header className="col-12 border-bottom mb-3">
//       <div className="container d-flex justify-content-between align-items-center py-3">
//         <img src={logoImg} alt="logoImg" />
//         <div className="d-none d-md-flex col-4">
//           <input className="form-control" placeholder="Search Here" />
//         </div>
//         <nav className="d-none d-md-flex gap-2">
//           <Link>Home</Link>
//           <Link>About</Link>
//           <Link>Contact</Link>
//           <Link>Blog</Link>
//         </nav>
//         <div className="d-none d-md-flex text-black fs-4 gap-3">
//           <CiHeart />
//           <CiShoppingCart />
//           <CiUser />
//         </div>
//         <IoIosMenu onClick={openSideHeader} className="d-block d-md-none text-dark fs-4" />
//       </div>
//       {sideHeader && <SideHeader />}
//     </header>
//   );
// }
//////////////////
// import React from "react";
// import logoImg from "../../assets/Logo.png";
// import { Link } from "react-router-dom";
// import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// import { useSideHeader } from "../../store";
// import SideHeader from "../SideHeader";
// export default function MainHeader() {
//   const { sideHeader, openSideHeader } = useSideHeader();
//   return (
//     <header className="col-12 border-bottom shadow-sm sticky-top bg-white mb-3">
//       <div className="container d-flex justify-content-between align-items-center py-3">
//         <Link to="/" className="navbar-brand">
//           <img src={logoImg} alt="Logo" height="40" />
//         </Link>

//         <div className="d-none d-md-flex col-4 position-relative">
//           <input
//             className="form-control rounded-pill"
//             placeholder="Search products..."
//           />

//         </div>

//         <nav className="d-none d-md-flex gap-3">
//           <Link to="/" className="nav-link fw-medium text-decoration-none">
//             Home
//           </Link>
//           <Link to="/about" className="nav-link fw-medium text-decoration-none">
//             About
//           </Link>
//           <Link
//             to="/contact"
//             className="nav-link fw-medium text-decoration-none"
//           >
//             Contact
//           </Link>
//           <Link to="/blog" className="nav-link fw-medium text-decoration-none">
//             Blog
//           </Link>
//         </nav>

//         <div className="d-none d-md-flex align-items-center">
//           <div className="d-flex gap-4">
//             <Link to="/wishlist" className="position-relative icon-link">
//               <CiHeart className="fs-3 text-dark hover-icon" />
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
//                 0
//               </span>
//             </Link>

//             <Link to="/cart" className="position-relative icon-link">
//               <CiShoppingCart className="fs-3 text-dark hover-icon" />
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
//                 2
//               </span>
//             </Link>

//             <Link to="/register" className="position-relative icon-link">
//               <CiUser className="fs-3 text-dark hover-icon" />
//             </Link>
//           </div>
//         </div>

//         <button
//           className="btn d-block d-md-none border-0"
//           onClick={openSideHeader}
//         >
//           <IoIosMenu className="text-dark fs-3" />
//         </button>
//       </div>
//       {sideHeader && <SideHeader />}
//     </header>
//   );
// }
///////////////////////////

import React, { useEffect, useState } from "react";
import logoImg from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { useSideHeader } from "../../store";
import SideHeader from "../SideHeader";

export default function MainHeader() {
  const { sideHeader, openSideHeader } = useSideHeader();
  const [token, setToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setToken(sessionStorage.getItem("jwt"));
  }, []);

  const Logout = () => {
    sessionStorage.clear();
    navigate("/");
    setToken(null);
  };
  return (
    <header className="w-full border-b shadow-sm sticky top-0 bg-white  z-40">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="navbar-brand">
          <img src={logoImg} alt="Logo" className="h-6" />
        </Link>

        <div className="hidden md:flex w-1/3 relative">
          <input
            className="w-full py-2 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Search products..."
          />
        </div>

        <nav className="hidden md:flex gap-3">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-black no-underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium text-gray-700 hover:text-black no-underline"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="font-medium text-gray-700 hover:text-black no-underline"
          >
            Contact
          </Link>
          <Link
            to="/blog"
            className="font-medium text-gray-700 hover:text-black no-underline"
          >
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center">
          <div className="flex gap-4">
            <Link to="/wishlist" className="relative group">
              <CiHeart className="text-2xl text-gray-800 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link to="/cart" className="relative group">
              <CiShoppingCart className="text-2xl text-gray-800 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            <Link to="/register" className="relative group">
              <CiUser className="text-2xl text-gray-800 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
        {token && (
          <button className="btn btn-error" onClick={Logout}>
            Logout
          </button>
        )}
        <button
          className="md:hidden border-0 bg-transparent p-1"
          onClick={openSideHeader}
        >
          <IoIosMenu className="text-gray-800 text-2xl" />
        </button>
      </div>
      {sideHeader && <SideHeader />}
    </header>
  );
}
