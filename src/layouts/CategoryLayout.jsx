// import React, { useEffect, useState } from "react";

// import { ShopRepo } from "../../data/repos/ShopRepo";
// import { domain } from "../../store";
// import styles from "./index.module.css";
// import { FiSearch } from "react-icons/fi";
// import { Outlet } from "react-router-dom";
// export default function CategoryLayout() {
//   const [products, setProducts] = useState();
//   const [cats, setCats] = useState([]);
//   const [productsTotal, setProductsTotal] = useState(0);
//   const [productPerPage, setProductPerPage] = useState(5);
//   const [activePage, setActivePage] = useState(2);
//   useEffect(() => {
//     ShopRepo.categories_index().then(setCats);
//     ShopRepo.products_index(1, productPerPage).then((res) => {
//       setProducts(res.data);
//       setProductsTotal(res.total);
//       // let pagesNo = Math.ceil(res.total / productPerPage);
//       // let x = Array(pagesNo).fill(0);
//       // console.log(x);
//     });
//   }, []);

//   useEffect(() => {
//     ShopRepo.products_index(activePage, productPerPage).then((res) => {
//       setProducts(res.data);
//     });
//   }, [activePage, productPerPage]);

//   useEffect(() => {
//     setActivePage(1);
//   }, [productPerPage]);
//   return (
//     <section className="d-flex col-12 container">
//       <div className="col-9 d-flex flex-column p-3">
//         {/* Shop Page */}
//             <Outlet />
//       </div>
//     </section>
//   );
// }
