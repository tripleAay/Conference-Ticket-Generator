import React from "react";

const TicketReceipt = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  text-white p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold">Ready</h2>
        <div className="w-full h-1 bg-blue-500 my-2"></div>
        <p className="text-xl font-bold mt-4">Your Ticket is Booked!</p>
        <p className="text-sm text-gray-400">You can download or check your email for a copy</p>

        <div className="bg-teal-700 p-4 rounded-lg mt-6 relative flex items-center justify-between">
          <div className="bg-white p-2 rounded-md">
            {/* Placeholder QR Code */}
            <div className="w-16 h-16 bg-black"></div>
          </div>
          <div className="flex-1 px-4">
            <h3 className="text-lg font-bold">Techember Fest '25</h3>
            <p className="text-sm">📍 04 Rumens road, Ikoyi, Lagos</p>
            <p className="text-sm">📅 March 15, 2025 | 7:00 PM</p>
          </div>
          <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold">REG</span>
        </div>
        
        <div className="flex justify-between mt-6">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-1/2 mr-2 hover:bg-blue-500 hover:text-white">Book Another Ticket</button>
          <button className="bg-blue-500 text-black px-4 py-2 rounded-lg w-1/2 hover:bg-blue-600">Download Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default TicketReceipt;
