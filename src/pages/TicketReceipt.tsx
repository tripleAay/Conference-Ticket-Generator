
import { useState, useEffect } from "react";
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
  
    if (savedFormData && savedTicketData) {
      const { name, email, image } = JSON.parse(savedFormData);
      const ticketData = JSON.parse(savedTicketData); 
      const { selectedTicket, quantity, price } = ticketData || {};
  
      
      const ticketId = savedTicketId || "TCH" + Math.random().toString(36).substr(2, 9).toUpperCase();
      if (!savedTicketId) {
        localStorage.setItem("ticketId", ticketId);
      }
  
      setUserData({
        name: name || "John Doe",
        email: email || "john@example.com",
        avatar: image || null,
        ticketType: selectedTicket || "REGULAR",
        ticketId: ticketId,
        ticketCount: quantity || 1,
        totalAmount: (quantity || 1) * (price?.includes("$") ? parseInt(price.replace("$", "")) : 0), 
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


