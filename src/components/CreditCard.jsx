import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Credit card validation schema
const CardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9\s]+$/, "Card number can only contain numbers")
    .test(
      "len",
      "Card number must be valid",
      (val) => val && val.replace(/\s+/g, "").length >= 13
    ),
  cardName: Yup.string()
    .required("Cardholder name is required")
    .min(2, "Name must be at least 2 characters"),
  expiryMonth: Yup.string().required("Month is required"),
  expiryYear: Yup.string().required("Year is required"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d+$/, "CVV must be numeric")
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot exceed 4 digits")
});

export default function CreditCard({ onChange }) {
  const [isFlipped, setIsFlipped] = useState(false);
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

  // Detect card type based on number
  const detectCardType = (number) => {
    if (!number) return "";
    
    const cleanedNumber = number.replace(/\s+/g, "");

    if (/^4/.test(cleanedNumber)) {
      return "visa";
    } else if (/^5[1-5]/.test(cleanedNumber)) {
      return "mastercard";
    } else if (/^3[47]/.test(cleanedNumber)) {
      return "amex";
    } else if (/^6(?:011|5)/.test(cleanedNumber)) {
      return "discover";
    } else {
      return "";
    }
  };

  // Generate years for expiry selection
  const years = Array.from(
    { length: 12 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <Formik
        initialValues={{
          cardNumber: "",
          cardName: "",
          expiryMonth: "",
          expiryYear: "",
          cvv: ""
        }}
        validationSchema={CardSchema}
        onSubmit={(values) => {
          // In a real application, you'd handle the submission here
          console.log("Form submitted", values);
        }}
      >
        {({ values, setFieldValue, handleBlur }) => {
          // Update card type when card number changes
          useEffect(() => {
            setCardType(detectCardType(values.cardNumber));
            
            // Pass form data to parent via onChange callback
            if (onChange) {
              onChange(values);
            }
          }, [values]);

          // Custom handlers
          const handleCardNumberChange = (e) => {
            const formatted = formatCardNumber(e.target.value);
            setFieldValue("cardNumber", formatted.substring(0, 19));
          };

          const handleCvvFocus = () => setIsFlipped(true);
          const handleCvvBlur = (e) => {
            setIsFlipped(false);
            handleBlur(e);
          };

          return (
            <>
              <div className="relative mb-8">
                {/* Card Container with flip effect */}
                <div
                  className="relative w-full h-56 transition-transform duration-700"
                  style={{ 
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg px-6 py-4 text-white"
                    style={{ 
                      backfaceVisibility: "hidden",
                      visibility: isFlipped ? "hidden" : "visible"
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-lg font-bold">Credit Card</div>
                      {cardType && (
                        <div className="h-8 w-12 rounded bg-white p-1">
                          {cardType === "visa" && (
                            <div className="text-blue-600 font-bold text-xs">VISA</div>
                          )}
                          {cardType === "mastercard" && (
                            <div className="text-orange-600 font-bold text-xs">MC</div>
                          )}
                          {cardType === "amex" && (
                            <div className="text-blue-500 font-bold text-xs">AMEX</div>
                          )}
                          {cardType === "discover" && (
                            <div className="text-orange-500 font-bold text-xs">
                              DISC
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="h-6 w-10 bg-yellow-400 rounded mb-4"></div>
                      <div className="text-xl mb-6 font-mono">
                        {values.cardNumber || "•••• •••• •••• ••••"}
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className="text-xs opacity-75 mb-1">Card Holder</div>
                          <div className="font-medium uppercase text-sm">
                            {values.cardName || "YOUR NAME"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75 mb-1">Expires</div>
                          <div className="font-medium text-sm">
                            {values.expiryMonth || "MM"}/
                            {values.expiryYear 
                              ? values.expiryYear.toString().substring(2) 
                              : "YY"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl shadow-lg"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      visibility: isFlipped ? "visible" : "hidden"
                    }}
                  >
                    <div className="h-12 bg-black w-full mt-4"></div>
                    <div className="px-6 mt-4">
                      <div className="flex justify-end items-center mb-4">
                        <div className="h-10 bg-gray-200 w-3/4 flex items-center justify-end pr-4">
                          <div className="font-mono">{values.cvv || "•••"}</div>
                        </div>
                      </div>
                      <div className="text-white text-xs mt-4">
                        <p>
                          This card is property of the issuing bank. Use of this card
                          constitutes acceptance of cardholder agreement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Input Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Form>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Card Number</label>
                    <Field
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      maxLength="19"
                      onChange={handleCardNumberChange}
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">
                      Card Holder Name
                    </label>
                    <Field
                      name="cardName"
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="cardName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Month</label>
                      <Field
                        as="select"
                        name="expiryMonth"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month.toString().padStart(2, "0")}>
                            {month.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="expiryMonth"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Year</label>
                      <Field
                        as="select"
                        name="expiryYear"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">YY</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="expiryYear"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">CVV</label>
                      <Field
                        name="cvv"
                        type="text"
                        placeholder="123"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        maxLength="4"
                        validate={(value) => {
                          if (!/^\d+$/.test(value) && value) {
                            return "CVV must contain only numbers";
                          }
                        }}
                        onFocus={handleCvvFocus}
                        onBlur={handleCvvBlur}
                      />
                      <ErrorMessage
                        name="cvv"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}