// import React, { useEffect } from 'react'

// export default function CheckoutPage() {
//     useEffect(() => {
//         sessionStorage.removeItem("redirect")
//     } ,[])
//   return (
//     <div>CheckoutPage</div>
//   )
// }


import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CreditCard from '../components/CreditCard';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Clear redirect parameter
    sessionStorage.removeItem("redirect");
    
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    
    // Calculate subtotal
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.salePrice * item.qty), 0);
    setSubtotal(cartSubtotal);
    setTotal(cartSubtotal + shipping);
  }, [shipping]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
    city: Yup.string()
      .required('City is required'),
    zipCode: Yup.string()
      .required('Zip code is required'),
    //   .matches(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
    country: Yup.string()
      .required('Country is required'),
    paymentMethod: Yup.string()
      .required('Payment method is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Here you would normally send the order to your backend
    console.log('Order submitted:', values);
    toast.success("Order placed successfully!");
    
    // Clear cart
    // localStorage.removeItem('cart');
    
    // Redirect to order confirmation
    setTimeout(() => {
      setSubmitting(false);
      navigate('/order-confirmation');
    }, 1000);
  };



  
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("");
  
    // Format card number with spaces
    const formatCardNumber = (value) => {
      const v = value.replace(/\s+/g, "").replace(/[^0-9]/g, "");
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];
  
      for (let i = 0; i < match.length; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
  
      if (parts.length) {
        return parts.join(" ");
      } else {
        return value;
      }
    };
  
    // Detect card type
    useEffect(() => {
      if (!cardNumber) {
        setCardType("");
        return;
      }
  
      const cleanedNumber = cardNumber.replace(/\s+/g, "");
  
      if (/^4/.test(cleanedNumber)) {
        setCardType("visa");
      } else if (/^5[1-5]/.test(cleanedNumber)) {
        setCardType("mastercard");
      } else if (/^3[47]/.test(cleanedNumber)) {
        setCardType("amex");
      } else if (/^6(?:011|5)/.test(cleanedNumber)) {
        setCardType("discover");
      } else {
        setCardType("");
      }
    }, [cardNumber]);
  
    // Handle card number input
    const handleCardNumberChange = (e) => {
      const formatted = formatCardNumber(e.target.value);
      setCardNumber(formatted.substring(0, 19)); // Limit to 16 digits + spaces
    };
  
    // Handle CVV focus to flip the card
    const handleCvvFocus = () => {
      setIsFlipped(true);
    };
  
    const handleCvvBlur = () => {
      setIsFlipped(false);
    };
  
    // Generate years for expiry selection
    const years = Array.from(
      { length: 12 },
      (_, i) => new Date().getFullYear() + i
    );
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-medium">${(item.salePrice * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              address: '',
              city: '',
              zipCode: '',
              country: 'Egypt',
              paymentMethod: 'credit'
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 font-medium">First Name</label>
                    <Field 
                      name="firstName" 
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Last Name</label>
                    <Field 
                      name="lastName" 
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Email</label>
                  <Field 
                    name="email" 
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Address</label>
                  <Field 
                    name="address" 
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 font-medium">City</label>
                    <Field 
                      name="city" 
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Zip Code</label>
                    <Field 
                      name="zipCode" 
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <Field 
                      as="select"
                      name="country" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Egypt">Egypt</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4 mt-6">Payment Method</h2>
                
                <div className="mb-6">
                    <CreditCard />
                  <div className="flex items-center mt-2 mb-2">
                    <Field 
                      type="radio" 
                      name="paymentMethod" 
                      value="cash" 
                      id="cash"
                      className="mr-2" 
                    />
                    <label htmlFor="cash" className="cursor-pointer">Cash on Delivery</label>
                  </div>
                  <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// export default function FlippableCard() {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardName, setCardName] = useState('');
//   const [expiryMonth, setExpiryMonth] = useState('');
//   const [expiryYear, setExpiryYear] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [cardType, setCardType] = useState('');

//   // Format card number with spaces
//   const formatCardNumber = (value) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
//     const matches = v.match(/\d{4,16}/g);
//     const match = matches && matches[0] || '';
//     const parts = [];
    
//     for (let i = 0; i < match.length; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }
    
//     if (parts.length) {
//       return parts.join(' ');
//     } else {
//       return value;
//     }
//   };

//   // Detect card type
//   useEffect(() => {
//     if (!cardNumber) {
//       setCardType('');
//       return;
//     }
    
//     const cleanedNumber = cardNumber.replace(/\s+/g, '');
    
//     if (/^4/.test(cleanedNumber)) {
//       setCardType('visa');
//     } else if (/^5[1-5]/.test(cleanedNumber)) {
//       setCardType('mastercard');
//     } else if (/^3[47]/.test(cleanedNumber)) {
//       setCardType('amex');
//     } else if (/^6(?:011|5)/.test(cleanedNumber)) {
//       setCardType('discover');
//     } else {
//       setCardType('');
//     }
//   }, [cardNumber]);

//   // Handle card number input
//   const handleCardNumberChange = (e) => {
//     const formatted = formatCardNumber(e.target.value);
//     setCardNumber(formatted.substring(0, 19)); // Limit to 16 digits + spaces
//   };

//   // Handle CVV focus to flip the card
//   const handleCvvFocus = () => {
//     setIsFlipped(true);
//   };

//   const handleCvvBlur = () => {
//     setIsFlipped(false);
//   };

//   // Generate years for expiry selection
//   const years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i);

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="relative mb-8">
//         {/* Card Container with flip effect */}
//         <div className={`relative w-full h-56 transition-transform duration-700 perspective-1000 ${isFlipped ? 'rotate-y-180' : ''}`}>
//           {/* Front of Card */}
//           <div className={`absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg px-6 py-4 text-white backface-hidden ${isFlipped ? 'invisible' : ''}`}>
//             <div className="flex justify-between items-start">
//               <div className="text-lg font-bold">Credit Card</div>
//               {cardType && (
//                 <div className="h-8 w-12 rounded bg-white p-1">
//                   {cardType === "visa" && <div className="text-blue-600 font-bold text-xs">VISA</div>}
//                   {cardType === "mastercard" && <div className="text-orange-600 font-bold text-xs">MC</div>}
//                   {cardType === "amex" && <div className="text-blue-500 font-bold text-xs">AMEX</div>}
//                   {cardType === "discover" && <div className="text-orange-500 font-bold text-xs">DISC</div>}
//                 </div>
//               )}
//             </div>
            
//             <div className="mt-6">
//               <div className="h-6 w-10 bg-yellow-400 rounded mb-4"></div>
//               <div className="text-xl mb-6 font-mono">
//                 {cardNumber || '•••• •••• •••• ••••'}
//               </div>
              
//               <div className="flex justify-between">
//                 <div>
//                   <div className="text-xs opacity-75 mb-1">Card Holder</div>
//                   <div className="font-medium uppercase text-sm">{cardName || 'YOUR NAME'}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs opacity-75 mb-1">Expires</div>
//                   <div className="font-medium text-sm">
//                     {expiryMonth || 'MM'}/{expiryYear ? expiryYear.toString().substr(2) : 'YY'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Back of Card */}
//           <div className={`absolute w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl shadow-lg backface-hidden rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
//             <div className="h-12 bg-black w-full mt-4"></div>
//             <div className="px-6 mt-4">
//               <div className="flex justify-end items-center mb-4">
//                 <div className="h-10 bg-gray-200 w-3/4 flex items-center justify-end pr-4">
//                   <div className="font-mono">{cvv || '•••'}</div>
//                 </div>
//               </div>
//               <div className="text-white text-xs mt-4">
//                 <p>This card is property of the issuing bank. Use of this card constitutes acceptance of cardholder agreement.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Card Input Form */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium">Card Number</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={handleCardNumberChange}
//             placeholder="1234 5678 9012 3456"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             maxLength="19"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium">Card Holder Name</label>
//           <input
//             type="text"
//             value={cardName}
//             onChange={(e) => setCardName(e.target.value)}
//             placeholder="John Doe"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
        
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium">Month</label>
//             <select
//               value={expiryMonth}
//               onChange={(e) => setExpiryMonth(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">MM</option>
//               {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                 <option key={month} value={month.toString().padStart(2, '0')}>
//                   {month.toString().padStart(2, '0')}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block mb-1 text-sm font-medium">Year</label>
//             <select
//               value={expiryYear}
//               onChange={(e) => setExpiryYear(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">YY</option>
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block mb-1 text-sm font-medium">CVV</label>
//             <input
//               type="text"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
//               onFocus={handleCvvFocus}
//               onBlur={handleCvvBlur}
//               placeholder="123"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               maxLength="4"
//             />
//           </div>
//         </div>
        
//         <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import CreditCard from '../components/CreditCard';

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(10);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // Clear redirect parameter
//     sessionStorage.removeItem("redirect");
    
//     // Get cart data from localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(cart);
    
//     // Calculate subtotal
//     const cartSubtotal = cart.reduce((sum, item) => sum + (item.salePrice * item.qty), 0);
//     setSubtotal(cartSubtotal);
    
//     // Calculate total outside to avoid infinite loop
//     const calculatedTotal = cartSubtotal + shipping;
//     setTotal(calculatedTotal);
//   }, []); // Empty dependency array, will only run once

//   const validationSchema = Yup.object({
//     firstName: Yup.string()
//       .required('First name is required')
//       .min(2, 'First name must be at least 2 characters'),
//     lastName: Yup.string()
//       .required('Last name is required')
//       .min(2, 'Last name must be at least 2 characters'),
//     email: Yup.string()
//       .email('Invalid email format')
//       .required('Email is required'),
//     address: Yup.string()
//       .required('Address is required')
//       .min(5, 'Address must be at least 5 characters'),
//     city: Yup.string()
//       .required('City is required'),
//     zipCode: Yup.string()
//       .required('Zip code is required'),
//     country: Yup.string()
//       .required('Country is required'),
//     paymentMethod: Yup.string()
//       .required('Payment method is required'),
//     cardDetails: Yup.object().when('paymentMethod', {
//       is: 'credit',
//       then: (schema) => schema.shape({
//         cardNumber: Yup.string().required('Card number is required'),
//         cardName: Yup.string().required('Card holder name is required'),
//         expiryMonth: Yup.string().required('Expiry month is required'),
//         expiryYear: Yup.string().required('Expiry year is required'),
//         cvv: Yup.string().required('CVV is required').min(3, 'CVV must be at least 3 digits'),
//       }),
//       otherwise: (schema) => schema.nullable(),
//     }),
//   });

//   const handleSubmit = (values, { setSubmitting }) => {
//     // Here you would normally send the order to your backend
//     console.log('Order submitted:', values);
//     toast.success("Order placed successfully!");
    
//     // Clear cart
//     localStorage.removeItem('cart');
    
//     // Redirect to order confirmation
//     setTimeout(() => {
//       setSubmitting(false);
//       navigate('/order-confirmation');
//     }, 1000);
//   };

//   // Calculate shipping fee change
//   const handleShippingChange = (newShipping) => {
//     setShipping(newShipping);
//     setTotal(subtotal + newShipping);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Order Summary */}
//         <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
//           <div className="divide-y">
//             {cartItems.map((item) => (
//               <div key={item.id} className="py-3 flex justify-between">
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-500">Qty: {item.qty}</p>
//                 </div>
//                 <p className="font-medium">${(item.salePrice * item.qty).toFixed(2)}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-4 pt-4 border-t">
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Shipping</span>
//               <span>${shipping.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Checkout Form */}
//         <div className="lg:col-span-2">
//           <Formik
//             initialValues={{
//               firstName: '',
//               lastName: '',
//               email: '',
//               address: '',
//               city: '',
//               zipCode: '',
//               country: 'Egypt',
//               paymentMethod: 'credit',
//               cardDetails: {
//                 cardNumber: '',
//                 cardName: '',
//                 expiryMonth: '',
//                 expiryYear: '',
//                 cvv: ''
//               }
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ values, setFieldValue, isSubmitting, errors, touched }) => (
//               <Form className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block mb-1 font-medium">First Name</label>
//                     <Field 
//                       name="firstName" 
//                       type="text"
//                       className="w-full p-2 border border-gray-300 rounded-md" 
//                     />
//                     <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Last Name</label>
//                     <Field 
//                       name="lastName" 
//                       type="text"
//                       className="w-full p-2 border border-gray-300 rounded-md" 
//                     />
//                     <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block mb-1 font-medium">Email</label>
//                   <Field 
//                     name="email" 
//                     type="email"
//                     className="w-full p-2 border border-gray-300 rounded-md" 
//                   />
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block mb-1 font-medium">Address</label>
//                   <Field 
//                     name="address" 
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded-md" 
//                   />
//                   <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div>
//                     <label className="block mb-1 font-medium">City</label>
//                     <Field 
//                       name="city" 
//                       type="text"
//                       className="w-full p-2 border border-gray-300 rounded-md" 
//                     />
//                     <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Zip Code</label>
//                     <Field 
//                       name="zipCode" 
//                       type="text"
//                       className="w-full p-2 border border-gray-300 rounded-md" 
//                     />
//                     <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Country</label>
//                     <Field 
//                       as="select"
//                       name="country" 
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     >
//                       <option value="Egypt">Egypt</option>
//                       <option value="USA">USA</option>
//                       <option value="UK">UK</option>
//                       <option value="Canada">Canada</option>
//                       <option value="Australia">Australia</option>
//                     </Field>
//                     <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>
//                 </div>
                
//                 <h2 className="text-xl font-semibold mb-4 mt-6">Payment Method</h2>
                
//                 <div className="mb-6">
//                   <div className="flex items-center mb-2">
//                     <Field 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="credit" 
//                       id="credit"
//                       className="mr-2" 
//                     />
//                     <label htmlFor="credit" className="cursor-pointer">Credit Card</label>
//                   </div>
                  
//                   {values.paymentMethod === 'credit' && (
//                     <div className="mt-4 mb-6">
//                       <CreditCard 
//                         onChange={(cardData) => {
//                         //   setFieldValue('cardDetails', cardData);
//                         }}
//                       />
//                     </div>
//                   )}
                  
//                   <div className="flex items-center mt-2 mb-2">
//                     <Field 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="cash" 
//                       id="cash"
//                       className="mr-2" 
//                     />
//                     <label htmlFor="cash" className="cursor-pointer">Cash on Delivery</label>
//                   </div>
//                   <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>
                
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//                 >
//                   {isSubmitting ? 'Processing...' : 'Place Order'}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }