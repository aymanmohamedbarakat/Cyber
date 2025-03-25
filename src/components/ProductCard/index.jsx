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


import React from 'react';
import styles from "./index.module.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

export default function ProductCard({ name, price, imgUrl, salePrice }) {
  return (
    <div className='col-12 col-md-6 col-lg-4 p-2'>
      <div className={'col-12 rounded overflow-hidden position-relative ' + styles.productCard}>
        {/* Image container with overlay */}
        <div className={styles.imgContainer}>
          <img 
            src={imgUrl || "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"} 
            alt={name} 
            className={styles.productImage}
          />
          <div className={styles.overlay}>
            <button className={styles.actionButton}><CiShoppingCart /></button>
            <button className={styles.actionButton}><CiHeart /></button>
          </div>
          
          {/* Sale tag */}
          {salePrice < price && (
            <div className={styles.saleTag}>Sale</div>
          )}
        </div>
        
        {/* Product details */}
        <div className="p-3">
          <h5 className="mb-2 text-truncate">{name}</h5>
          <div className="d-flex align-items-center mb-3">
            <span className={styles.currentPrice}>${salePrice}</span>
            <span className={styles.originalPrice}>${price}</span>
          </div>
          <button className={`btn w-100 ${styles.addToCartBtn}`}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}