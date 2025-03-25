// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";
// import { ShopRepo } from "../../data/repos/ShopRepo";
// import { domain } from "../../store";
// import styles from "./index.module.css";
// import { FiSearch } from "react-icons/fi";
// export default function ShopPage() {
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
//       {/* <div className="col-3">
//         <div className="card border-0 shadow-sm mb-4">
//           <div className="card-header bg-white border-0">
//             <h5 className="mb-0 fw-bold">Filter By Category</h5>
//           </div>
//           <div className="card-body">
//             <div className="input-group mb-3">
//               <input
//                 type="search"
//                 placeholder="Search categories..."
//                 className="form-control"
//                 aria-label="Search categories"
//               />
//               <button className="btn btn-outline-secondary" type="button">
//                 <FiSearch />
//               </button>
//             </div>

//             <div className="category-list">
//               {cats &&
//                 Array.isArray(cats) &&
//                 cats.map((el) => (
//                   <div
//                     key={el.documentId}
//                     className="form-check d-flex align-items-center py-2 border-bottom"
//                   >
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id={`category-${el.documentId}`}
//                     />
//                     <label
//                       className="form-check-label ms-2 d-block w-100"
//                       htmlFor={`category-${el.documentId}`}
//                     >
//                       {el.name}
//                       <span className="badge rounded-pill bg-light text-dark float-end">
//                         12
//                       </span>
//                     </label>
//                   </div>
//                 ))}
//             </div>

//             {cats && Array.isArray(cats) && cats.length > 0 && (
//               <button className="btn btn-sm btn-outline-dark mt-3 w-100">
//                 Apply Filters
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="card border-0 shadow-sm mb-4">
//           <div className="card-header bg-white border-0">
//             <h5 className="mb-0 fw-bold">Price Range</h5>
//           </div>
//           <div className="card-body">
//             <div className="range-slider">
//               <input type="range" className="form-range" min="0" max="1000" />
//               <div className="d-flex justify-content-between mt-2">
//                 <span>$0</span>
//                 <span>$1000</span>
//               </div>
//             </div>
//           </div>
//         </div>{" "}
//       </div> */}
//       <div className="col-3">
//         <div className="accordion" id="accordionExample">
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapseOne"
//                 aria-expanded="true"
//                 aria-controls="collapseOne"
//               >
//                 Categories
//               </button>
//             </h2>
//             <div
//               id="collapseOne"
//               className="accordion-collapse collapse show"
//               data-bs-parent="#accordionExample"
//             >
//               <div className="accordion-body gap-2">
//                 <input
//                   type="search"
//                   placeholder="search"
//                   className="form-control"
//                 />
//                 <div className="d-flex flex-column col-12 gap-2 mt-3">
//                   {cats &&
//                     Array.isArray(cats) &&
//                     cats.map((el) => {
//                       return (
//                         <label
//                           key={el.documentId}
//                           className="col-12 d-flex gap-2 align-items-center"
//                         >
//                           <input type="checkbox" name="" id="" />
//                           <span>{el.name}</span>
//                         </label>
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-9 d-flex flex-column p-3">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="d-flex align-items-center">
//             <h3 className="m-0 me-1">Products</h3>
//             <span className="badge bg-dark rounded-pill fs-6">
//               {productsTotal}
//             </span>
//           </div>

//           <div className="d-flex align-items-center">
//             <label htmlFor="items-per-page" className="me-2 text-secondary">
//               Show:
//             </label>
//             <select
//               id="items-per-page"
//               className={"form-select form-select-sm " + styles.select}
//               onChange={(e) => setProductPerPage(e.target.value)}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="20">20</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//             </select>
//           </div>
//         </div>
//         <div className="col-12 d-flex flex-wrap">
//           {products &&
//             Array.isArray(products) &&
//             products.map((el) => (
//               <ProductCard
//                 key={el.documentId}
//                 name={el.name}
//                 price={el.price}
//                 salePrice={el.salePrice}
//                 imgUrl={
//                   el.coverImg &&
//                   el.coverImg.length > 0 &&
//                   domain + el.coverImg[0].url
//                 }
//               />
//             ))}
//           {/*  */}
//         </div>
//         <div className="col-12 my-4">
//           <nav aria-label="Product pagination">
//             <ul className="pagination justify-content-center">
//               {activePage > 1 && (
//                 <li className="page-item">
//                   <a
//                     className="page-link rounded-start shadow-sm"
//                     aria-label="Previous"
//                     onClick={() => setActivePage(activePage - 1)}
//                   >
//                     <span aria-hidden="true">&laquo;</span>
//                   </a>
//                 </li>
//               )}
//               {Array(Math.ceil(productsTotal / productPerPage))
//                 .fill(0)
//                 .map((el, index) => (
//                   <li
//                     key={index}
//                     onClick={() => setActivePage(index + 1)}
//                     className={`page-item ${
//                       activePage == index + 1 ? "active" : null
//                     }`}
//                   >
//                     <a className="page-link shadow-sm" href="#">
//                       {index + 1}
//                     </a>
//                   </li>
//                 ))}
//               {/* <li className="page-item">
//                 <a className="page-link shadow-sm" href="#">
//                   2
//                 </a>
//               </li>
//               <li className="page-item">
//                 <a className="page-link shadow-sm" href="#">
//                   3
//                 </a>
//               </li> */}
//               {activePage < Math.ceil(productsTotal / productPerPage) && (
//                 <li className="page-item">
//                   <a
//                     className="page-link rounded-end shadow-sm"
//                     href="#"
//                     aria-label="Next"
//                     onClick={() => setActivePage(activePage + 1)}
//                   >
//                     <span aria-hidden="true">&raquo;</span>
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { ShopRepo } from "../../data/repos/ShopRepo";
import { domain } from "../../store";
import styles from "./index.module.css";
export default function ShopPage() {
  //States
  const [products, setProducts] = useState();
  const [cats, setCats] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productPerPage, setProductPerPage] = useState(5);
  const [activePage, setActivePage] = useState(2);
  const [filters, setFilters] = useState([]);

  // Logic
  const handleFilters = (id) => {
    let copy = [...filters];
    if (filters.includes(id)) {
      // setFilters(filters.filter((filter) => filter !== id));
      copy.splice(filters.indexOf(id), 1);
    } else {
      copy.push(id);
    }
    setFilters(copy);
    console.log(copy);
    // alert(id);
  };

  //Effects
  useEffect(() => {
    ShopRepo.categories_index().then(setCats);
    ShopRepo.products_index(activePage, productPerPage, filters).then((res) => {
      setProducts(res.data);
      setProductsTotal(res.total);
    });
  }, []);

  useEffect(() => {
    setActivePage(1);
  }, [productPerPage]);

  useEffect(() => {
    ShopRepo.products_index(activePage, productPerPage, filters).then( res =>
      setProducts(res.data)
    );
  }, [activePage, productPerPage, filters]);

  return (
    <section className="d-flex col-12 container">
      <div className="col-3">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Categories
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body gap-2">
                <input
                  type="search"
                  placeholder="search"
                  className="form-control"
                />
                <div className="d-flex flex-column col-12 gap-2 mt-3">
                  {cats &&
                    Array.isArray(cats) &&
                    cats.map((el) => {
                      return (
                        <label
                          onChange={() => handleFilters(el.documentId)}
                          key={el.documentId}
                          className="col-12 d-flex gap-2 align-items-center"
                        >
                          <input type="checkbox" name="" id="" />
                          <span>{el.name}</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-9 d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h3 className="m-0 me-1">Products</h3>
            <span className="badge bg-dark rounded-pill fs-6">
              {productsTotal}
            </span>
          </div>

          <div className="d-flex align-items-center">
            <label htmlFor="items-per-page" className="me-2 text-secondary">
              Show:
            </label>
            <select
              id="items-per-page"
              className={"form-select form-select-sm " + styles.select}
              onChange={(e) => setProductPerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="col-12 d-flex flex-wrap">
          {products &&
            Array.isArray(products) &&
            products.map((el) => (
              <ProductCard
                key={el.documentId}
                name={el.name}
                price={el.price}
                salePrice={el.salePrice}
                imgUrl={
                  el.coverImg &&
                  el.coverImg.length > 0 &&
                  domain + el.coverImg[0].url
                }
              />
            ))}
        </div>
        <div className="col-12 my-4">
          <nav aria-label="Product pagination">
            <ul className="pagination justify-content-center">
              {activePage > 1 && (
                <li className="page-item">
                  <a
                    className="page-link rounded-start shadow-sm"
                    aria-label="Previous"
                    onClick={() => setActivePage(activePage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              )}
              {Array(Math.ceil(productsTotal / productPerPage))
                .fill(0)
                .map((el, index) => (
                  <li
                    key={index}
                    onClick={() => setActivePage(index + 1)}
                    className={`page-item ${
                      activePage == index + 1 ? "active" : null
                    }`}
                  >
                    <a className="page-link shadow-sm" href="#">
                      {index + 1}
                    </a>
                  </li>
                ))}

              {activePage < Math.ceil(productsTotal / productPerPage) && (
                <li className="page-item">
                  <a
                    className="page-link rounded-end shadow-sm"
                    aria-label="Next"
                    onClick={() => setActivePage(activePage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
