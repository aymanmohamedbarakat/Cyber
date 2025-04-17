import React, { useEffect, useState } from "react";

export default function CreditCard({ onChange }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });

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
    
    // Update card data when card number changes
    updateCardData();
  }, [cardNumber]);

  // Update card data when fields change
  useEffect(() => {
    updateCardData();
  }, [cardName, expiryMonth, expiryYear, cvv]);

  // Update card data with current values
  const updateCardData = () => {
    const newCardData = {
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvv
    };
    
    setCardData(newCardData);
  };

  // Send card data to parent component only when cardData changes
  useEffect(() => {
    if (onChange) {
      onChange(cardData);
    }
  }, [cardData, onChange]);

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
    <div className="w-full max-w-md mx-auto">
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
                {cardNumber || "•••• •••• •••• ••••"}
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="text-xs opacity-75 mb-1">Card Holder</div>
                  <div className="font-medium uppercase text-sm">
                    {cardName || "YOUR NAME"}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-75 mb-1">Expires</div>
                  <div className="font-medium text-sm">
                    {expiryMonth || "MM"}/
                    {expiryYear ? expiryYear.toString().substring(2) : "YY"}
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
                  <div className="font-mono">{cvv || "•••"}</div>
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
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength="19"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Card Holder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Month</label>
            <select
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Year</label>
            <select
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">YY</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))
              }
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              placeholder="123"
              className="w-full p-2 border border-gray-300 rounded-md"
              maxLength="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}