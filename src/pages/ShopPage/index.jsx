// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";
// import { ShopRepo } from "../../data/repos/ShopRepo";
// import { domain } from "../../store";
// import styles from "./index.module.css";
// export default function ShopPage() {
//   //States
//   const [products, setProducts] = useState();
//   const [cats, setCats] = useState([]);
//   const [productsTotal, setProductsTotal] = useState(0);
//   const [productPerPage, setProductPerPage] = useState(5);
//   const [activePage, setActivePage] = useState(2);
//   const [filters, setFilters] = useState([]);

//   // Logic
//   const handleFilters = (id) => {
//     let copy = [...filters];
//     if (filters.includes(id)) {
//       // setFilters(filters.filter((filter) => filter !== id));
//       copy.splice(filters.indexOf(id), 1);
//     } else {
//       copy.push(id);
//     }
//     setFilters(copy);
//     console.log(copy);
//     // alert(id);
//   };

//   //Effects
//   useEffect(() => {
//     ShopRepo.categories_index().then(setCats);
//     ShopRepo.products_index(activePage, productPerPage, filters).then((res) => {
//       setProducts(res.data);
//       setProductsTotal(res.total);
//     });
//   }, []);

//   useEffect(() => {
//     setActivePage(1);
//   }, [productPerPage]);

//   useEffect(() => {
//     ShopRepo.products_index(activePage, productPerPage, filters).then((res) =>
//       setProducts(res.data)
//     );
//   }, [activePage, productPerPage, filters]);

//   return (
//     <section className="d-flex col-12 container">
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
//                           onChange={() => handleFilters(el.documentId)}
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
//           {products && Array.isArray(products) ? (
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
//             ))
//           ) : (
//             <div className="col-12 text-center py-5">No products found</div>
//           )}
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

//               {activePage < Math.ceil(productsTotal / productPerPage) && (
//                 <li className="page-item">
//                   <a
//                     className="page-link rounded-end shadow-sm"
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
      copy.splice(filters.indexOf(id), 1);
    } else {
      copy.push(id);
    }
    setFilters(copy);
    console.log(copy);
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
    ShopRepo.products_index(activePage, productPerPage, filters).then((res) =>
      setProducts(res.data)
    );
  }, [activePage, productPerPage, filters]);

  return (
    <section className="flex w-full container mx-auto">
      {/* Sidebar */}
      <div className="w-1/4">
        <div className="border border-gray-200 rounded shadow-sm mb-4">
          <div className="border-b">
            <button
              className="w-full py-3 px-4 flex justify-between items-center text-left font-medium focus:outline-none bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div id="collapseOne" className="p-4">
            <input
              type="search"
              placeholder="Search categories"
              className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="flex flex-col gap-2 mt-3 ">
              {cats &&
                Array.isArray(cats) &&
                cats.map((el) => (
                  <label
                    onChange={() => handleFilters(el.documentId)}
                    key={el.documentId}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-gray-800 focus:ring-gray-800"
                    />
                    <span className="m-3">{el.name}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className=" flex flex-grow-1 flex-col p-3">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="text-xl font-medium mr-1">Products</h3>
            <span className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">
              {productsTotal}
            </span>
          </div>

          <div className="flex items-center">
            <label htmlFor="items-per-page" className="mr-2 text-gray-500">
              Show:
            </label>
            <select
              id="items-per-page"
              className="py-1 px-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
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

        {/* Product grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((el) => (
              <ProductCard
                key={el.documentId}
                product={el}
                name={el.name}
                price={el.price}
                salePrice={el.salePrice}
                imgUrl={
                  el.coverImg &&
                  el.coverImg.length > 0 &&
                  domain + el.coverImg[0].url
                }
              />
            ))
          ) : (
            <div className="w-full bg-gray-50 rounded-lg py-16 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="w-full my-4">
          <div className="flex justify-center">
            <nav
              className="inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {activePage > 1 && (
                <a
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                  aria-label="Previous"
                  onClick={() => setActivePage(activePage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}

              {Array(Math.ceil(productsTotal / productPerPage))
                .fill(0)
                .map((_, index) => (
                  <a
                    key={index}
                    onClick={() => setActivePage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer
                      ${
                        activePage === index + 1
                          ? "z-10 bg-gray-800 border-gray-800 text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {index + 1}
                  </a>
                ))}

              {activePage < Math.ceil(productsTotal / productPerPage) && (
                <a
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                  aria-label="Next"
                  onClick={() => setActivePage(activePage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
