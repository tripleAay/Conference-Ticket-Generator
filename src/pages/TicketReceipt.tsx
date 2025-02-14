
import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Barcode from "react-barcode";

const TicketReceipt = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    ticketType: "REGULAR",
    ticketId: "TCH" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    ticketCount: 1,
    totalAmount: 0,
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("attendeeFormData");
    const savedTicketData = localStorage.getItem("ticketDetails");
    const savedTicketId = localStorage.getItem("ticketId");

    const { selectedTicket, quantity, price } = JSON.parse(savedTicketData);

  
    if (savedFormData && savedTicketData) {
      const { name, email, image } = JSON.parse(savedFormData);
      const { selectedTicket, ticketCount, ticketPrice } = JSON.parse(savedTicketData);
      
      const ticketId = savedTicketId || "TCH" + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem("ticketId", ticketId);
  
      setUserData({
        name: name || "John Doe",
        email: email || "john@example.com",
        avatar: image || null,
        ticketType: selectedTicket || "REGULAR",
        ticketId: ticketId,
        ticketCount: quantity || 1, // Change `ticketCount` to `quantity`
        totalAmount: quantity * (price.includes("$") ? parseInt(price.replace("$", "")) : 0), // Fix price calculation
      });
      
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-white p-6 mt-32">
      <div className="bg-[#051b1b] p-6 rounded-2xl shadow-lg w-full max-w-lg border border-[#064d4d] relative">
        {/* Ticket Border Cut Effect */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-[#051b1b] rounded-b-full"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-[#051b1b] rounded-t-full"></div>
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ready</h2>
          <span className="text-[#1C8DA5]">#{userData.ticketId}</span>
        </div>
        <div className="w-full h-1 bg-[#1C8DA5] my-2"></div>

        <div className="text-center my-6">
          <p className="text-xl font-bold">Your Ticket is Booked!</p>
          <p className="text-sm text-gray-400">Check your email for a copy or download it below.</p>
        </div>

        {/* Main Ticket */}
        <div className="bg-[#0D1F28] rounded-lg overflow-hidden">
          <div className="bg-[#04292b] p-4 text-center">
            <h3 className="text-2xl font-bold">Techember Fest '25</h3>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1C8DA5]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <Camera size={24} className="text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold">{userData.name}</h3>
                <p className="text-sm text-gray-400">{userData.email}</p>
              </div>
            </div>

            <div className="p-4 bg-[#1A3A4B] rounded-lg text-center">
              <p className="text-lg font-semibold">Ticket Type</p>
              <p className="text-xl font-bold text-[#1C8DA5]">{userData.ticketType}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#1A3A4B] rounded-lg text-center">
                <p className="text-lg font-semibold">Tickets Purchased</p>
                <p className="text-xl font-bold text-[#1C8DA5]">{userData.ticketCount}</p>
              </div>
              <div className="p-4 bg-[#1A3A4B] rounded-lg text-center">
                <p className="text-lg font-semibold">Total Amount</p>
                <p className="text-xl font-bold text-[#1C8DA5]">${userData.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="mt-6 flex justify-center">
              <Barcode value={userData.ticketId} background="#0D1F28" lineColor="#1C8DA5" width={1.5} height={50} />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="bg-[#1C8DA5] hover:bg-[#177A91] text-black py-2 px-6 rounded-lg transition">
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketReceipt;


// import React from "react";

// const TicketReceipt = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen  text-white p-6  mt-32">
//       <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg">
//         <h2 className="text-lg font-semibold">Ready</h2>
//         <div className="w-full h-1 bg-blue-500 my-2"></div>
//         <p className="text-xl font-bold mt-4">Your Ticket is Booked!</p>
//         <p className="text-sm text-gray-400">You can download or check your email for a copy</p>

//         <div className="bg-teal-700 p-4 rounded-lg mt-6 relative flex items-center justify-between">
//           <div className="bg-white p-2 rounded-md">
//             {/* Placeholder QR Code */}
//             <div className="w-16 h-16 bg-black"></div>
//           </div>
//           <div className="flex-1 px-4">
//             <h3 className="text-lg font-bold">Techember Fest '25</h3>
//             <p className="text-sm">📍 04 Rumens road, Ikoyi, Lagos</p>
//             <p className="text-sm">📅 March 15, 2025 | 7:00 PM</p>
//           </div>
//           <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold">REG</span>
//         </div>
        
//         <div className="flex justify-between mt-6">
//           <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-1/2 mr-2 hover:bg-blue-500 hover:text-white">Book Another Ticket</button>
//           <button className="bg-blue-500 text-black px-4 py-2 rounded-lg w-1/2 hover:bg-blue-600">Download Ticket</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketReceipt;
