// import React from 'react'
// import styles from "./index.module.css"
// export default function ProductCard({ name, price, imgUrl, salePrice }) {
//   return (
//     <div className='col-12 col-md-6 col-lg-4 p-2'>
//     <div className={'col-12 p-3 rounded d-flex gap-2 flex-column ' + styles.productCard}>
//         <img src={imgUrl ?imgUrl : "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png" }  alt="No Img"/>
//         <h5 className="m-0">{name}</h5>
//         <p className="m-0">$ {salePrice} <del>{price}</del></p>
//         <button className="btn btn-dark">Add To Cart</button>
//     </div>
// </div>
//   )
// }

// import React from "react";
// import styles from "./index.module.css";
// import { CiHeart, CiShoppingCart } from "react-icons/ci";

// export default function ProductCard({ name, price, imgUrl, salePrice }) {
//   return (
//     <div className="w-full md:w-1/2 lg:w-1/3 p-2">
//       <div className="w-full rounded overflow-hidden relative bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
//         {/* Image container with overlay */}
//         <div className="relative overflow-hidden pb-[100%]">
//           <img
//             src={
//               imgUrl ||
//               "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
//             }
//             alt={name}
//             className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           />
//           <div className="absolute -bottom-12 left-0 w-full p-2 flex justify-center gap-2 transition-all duration-300 group-hover:bottom-2">
//             <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow hover:bg-gray-800 hover:text-white hover:-translate-y-1 transition-all">
//               <CiShoppingCart />
//             </button>
//             <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow hover:bg-gray-800 hover:text-white hover:-translate-y-1 transition-all">
//               <CiHeart />
//             </button>
//           </div>

//           {/* Sale tag */}

//           {salePrice < price && (
//             <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">
//               Sale
//             </div>
//           )}
//         </div>

//         {/* Product details */}
//         <div className="p-3">
//           <h5 className="mb-2 text-base font-medium truncate">{name}</h5>
//           <div className="flex items-center mb-3">
//             <span className="font-semibold text-lg text-gray-800">${salePrice}</span>
//             <span className="text-gray-500 line-through ml-2 text-sm">${price}</span>
//           </div>
//           <button className="w-full py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors uppercase text-sm font-medium tracking-wider">
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";

export default function ProductCard({
  name,
  price,
  imgUrl,
  salePrice,
  product,
}) {
  const addProductToCart = () => {
    // Logic to add product to cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let index = cart.findIndex(
      (item) => item.documentId === product.documentId
    );
    if (index === -1) {
      cart.push({ ...product, qty: 1 });
      toast.success("Product added to cart", {
        autoClose: 2000,
      });
    } else {
      cart[index].qty += 1;
      toast.info("Product quantity updated in cart", {
        autoClose: 2000,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <div className="w-full ">
      <div className="group w-full rounded overflow-hidden relative bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        {/* Image container with overlay */}
        <div className="relative overflow-hidden pb-[100%]">
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
            }
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-12 left-0 w-full p-2 flex justify-center gap-2 transition-all duration-300 group-hover:bottom-2">
            <button className="w-10 h-10 flex items-center justify-center text-lg shadow hover:bg-gray-800 hover:text-white hover:-translate-y-1 transition-all rounded-full">
              <CiShoppingCart />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-lg shadow hover:bg-gray-800 hover:text-white hover:-translate-y-1 transition-all rounded-full">
              <CiHeart />
            </button>
          </div>

          {/* Sale tag */}
          {salePrice < price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">
              Sale
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="p-3">
          <h5 className="mb-2 text-base font-medium truncate">{name}</h5>
          <div className="flex items-center mb-3">
            <span className="font-semibold text-lg text-gray-800">
              ${salePrice}
            </span>
            <span className="text-gray-500 line-through ml-2 text-sm">
              ${price}
            </span>
          </div>
          <button
            onClick={addProductToCart}
            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors uppercase text-sm font-medium tracking-wider"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
