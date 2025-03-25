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

import React from "react";
import logoImg from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { useSideHeader } from "../../store";
import SideHeader from "../SideHeader";
export default function MainHeader() {
  const { sideHeader, openSideHeader } = useSideHeader();
  return (
    <header className="col-12 border-bottom shadow-sm sticky-top bg-white mb-3">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="navbar-brand">
          <img src={logoImg} alt="Logo" height="40" />
        </Link>

        <div className="d-none d-md-flex col-4 position-relative">
          <input
            className="form-control rounded-pill"
            placeholder="Search products..."
          />
          <button className="btn position-absolute end-0 top-0 bottom-0">
            <i className="bi bi-search"></i>
          </button>
        </div>

        <nav className="d-none d-md-flex gap-3">
          <Link to="/" className="nav-link fw-medium text-decoration-none">
            Home
          </Link>
          <Link to="/about" className="nav-link fw-medium text-decoration-none">
            About
          </Link>
          <Link
            to="/contact"
            className="nav-link fw-medium text-decoration-none"
          >
            Contact
          </Link>
          <Link to="/blog" className="nav-link fw-medium text-decoration-none">
            Blog
          </Link>
        </nav>

        <div className="d-none d-md-flex align-items-center">
          <div className="d-flex gap-4">
            <Link to="/wishlist" className="position-relative icon-link">
              <CiHeart className="fs-3 text-dark hover-icon" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                0
              </span>
            </Link>

            <Link to="/cart" className="position-relative icon-link">
              <CiShoppingCart className="fs-3 text-dark hover-icon" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                2
              </span>
            </Link>

            <Link to="/account" className="position-relative icon-link">
              <CiUser className="fs-3 text-dark hover-icon" />
            </Link>
          </div>
        </div>

        <button
          className="btn d-block d-md-none border-0"
          onClick={openSideHeader}
        >
          <IoIosMenu className="text-dark fs-3" />
        </button>
      </div>
      {sideHeader && <SideHeader />}
    </header>
  );
}
