// import React, { useEffect, useState } from "react";
// import { domain } from "../../store";

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem("cart")) || [];
//     cartData && setCart(cartData);
//   }, []);
//   useEffect(() => {
//     const totalPrice = cart.reduce((acc, item) => {
//       return acc + item.salePrice * item.qty;
//     }, 0);
//     setTotal(totalPrice);
//   }, [cart]);

//   const incrementQty = (index) => {
//     const copy = [...cart];
//     copy[index].qty++;
//     setCart(copy);
//     localStorage.setItem("cart", JSON.stringify(copy));
//   };
//   const decrementQty = (index) => {
//     const copy = [...cart];
//     if (copy[index].qty > 1) {
//       copy[index].qty -= 1;
//     } else {
//       copy.splice(index, 1);
//     }
//     setCart(copy);
//     localStorage.setItem("cart", JSON.stringify(copy));
//   };

//   const removeItem = (index) => {
//     const copy = [...cart];
//     copy.splice(index, 1);
//     setCart(copy);
//     localStorage.setItem("cart", JSON.stringify(copy));
//   }

//   return (
//     <div>
//       {cart.length > 0 ? (
//         <div className="overflow-x-auto ">
//           <table className="table">
//             {/* head */}
//             <thead className=" text-black">
//               <tr>
//                 <th>
//                   <label>
//                     <input type="checkbox" className="checkbox" />
//                   </label>
//                 </th>
//                 <th>Item Name</th>
//                 <th>Item quantity</th>
//                 <th>Item Qty</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {cart.map((el, index) => (
//                 <tr>
//                   <th>
//                     <label>
//                       <input type="checkbox" className="checkbox" />
//                     </label>
//                   </th>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="mask mask-squircle h-12 w-12">
//                           <img
//                             //   domain + el.coverImg[0].url
//                             src={
//                               el.coverImg
//                                 ? `${domain}${el.coverImg[0].url}`
//                                 : "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
//                             }
//                             alt="Avatar Tailwind CSS Component"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold">{el.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-error bg-red-600"
//                       onClick={() => decrementQty(index)}
//                     >
//                       -
//                     </button>
//                     <span className="badge badge-ghost badge-sm">{el.qty}</span>
//                     <button
//                       className="btn btn-success"
//                       onClick={() => incrementQty(index)}
//                     >
//                       +
//                     </button>
//                   </td>
//                   <td>${el.salePrice}</td>
//                   <th>
//                     <button onClick={()=>removeItem(index)} className="btn btn-ghost btn-xs bg-red-500 hover:bg-red-700">Delete</button>
//                   </th>
//                 </tr>
//               ))}
//             </tbody>
//             {/* foot */}
//             <tfoot className=" text-black">
//               <tr>
//                 <th colSpan={4}>Total</th>
//                 <th colSpan={2}>${total}</th>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       ) : (
//         <h1>There are no products in cart</h1>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { domain } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthRepo } from "../../data/repos/Authentication";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData && setCart(cartData);
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + item.salePrice * item.qty;
    }, 0);
    setTotal(totalPrice);
  }, [cart]);

  const incrementQty = (index) => {
    const copy = [...cart];
    copy[index].qty++;
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const decrementQty = (index) => {
    const copy = [...cart];
    if (copy[index].qty > 1) {
      copy[index].qty -= 1;
    } else {
      copy.splice(index, 1);
    }
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const removeItem = (index) => {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const placeOrder = () => {
    // TO DO: implement place order logic here
    let token =
      sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
    if (!token) {
      sessionStorage.setItem('redirect', 'checkout');
      toast.error("Please login to place an order.");
      navigate("/login");
    } else {
      toast.success("Order placed successfully!");
      AuthRepo.checkToken(token).then((res) => {
        if (res) {
          navigate("/checkout");
        } else {
          
          toast.error("Please login to place an order.");
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200 text-white">
                  <th className="hidden md:table-cell">Product</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="hover:bg-amber-50">
                    <td className="hidden md:table-cell">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img
                            src={
                              item.coverImg
                                ? `${domain}${item.coverImg[0].url}`
                                : "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
                            }
                            alt={item.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm opacity-70">
                        ${item.salePrice} each
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decrementQty(index)}
                          className="btn btn-circle btn-sm btn-outline"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-base-200 text-white rounded-md min-w-8 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => incrementQty(index)}
                          className="btn btn-circle btn-sm btn-outline"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-medium">
                      ${(item.salePrice * item.qty).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() => removeItem(index)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-end p-6 border-t">
            <div className="md:w-1/2 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={placeOrder}
                className="btn btn-primary w-full mt-4"
              >
                place order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-base-200 p-8 rounded-xl text-center max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold mt-4">Your cart is empty</h2>
            <p className="mt-2 text-base-content/70">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/" className="btn btn-primary mt-6">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
