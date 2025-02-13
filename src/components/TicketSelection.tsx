import { useState } from "react";
import { motion } from "framer-motion";

const EventCard = () => {
  return (
    <motion.div 
      className="w-full max-w-lg rounded-2xl bg-[#04292b] p-6 text-center text-white shadow-lg border border-[#064d4d] relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      whileHover={{ x: [-3, 3, -3], transition: { duration: 0.2, repeat: Infinity, ease: "easeInOut" } }}
    >
      <h2 className="text-3xl font-bold mb-2 tracking-wide font-[Cinzel]">
        Techember Fest '25
      </h2>
      <p className="text-sm text-gray-300 mb-4">
        Join us for an unforgettable experience at <br />
        <span className="font-semibold">[Event Name]</span>! Secure your spot now.
      </p>
      <div className="flex items-center justify-center gap-3 text-gray-300 text-sm">
        <span className="text-red-500">📍</span>
        <span>[Event Location]</span>
        <span className="text-gray-500">||</span>
        <span>March 15, 2025 | 7:00 PM</span>
      </div>
    </motion.div>
  );
};

const TicketSelection = ({ onProceed }: { onProceed: () => void }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const ticketTypes = [
    { type: "REGULAR", price: "Free", left: 20 },
    { type: "VIP", price: "$50", left: 20 },
    { type: "VVIP", price: "$150", left: 20 },
  ];

  const handleProceed = () => {
    if (!selectedTicket) {
      alert("Please select a ticket type before proceeding.");
      return;
    }

    const ticketData = { selectedTicket, quantity };
    localStorage.setItem("ticketDetails", JSON.stringify(ticketData));

    // Close the current component and show the next component
    onProceed();
  };

  const handleCancel = () => {
    setSelectedTicket(null);
    setQuantity(1);
  };

  return (
    <div className="h-screen flex flex-col items-center text-left justify-center bg-[#020C14] px-4 w-[700px] mt-32 border border-[#175050] rounded-lg bg-[#051b1b] text-white shadow-lg transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold">Select Your Ticket</h2>
      <hr className="border-t border-white w-full mb-4" />

      {/* Event Card */}
      <EventCard />

      {/* Ticket Container */}
      <div className="w-full p-6 rounded-2xl bg-[#0D1F28] shadow-xl text-white">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {ticketTypes.map((ticket, index) => (
            <button
              key={index}
              className={`w-full flex justify-between items-center px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 
              ${selectedTicket === ticket.type ? "bg-[#1C4A57] shadow-lg scale-105" : "bg-[#18343D] hover:bg-[#1C4A57] hover:scale-105"}`}
              onClick={() => setSelectedTicket(ticket.type)}
            >
              <span className="text-black font-medium">
                {ticket.type} <span className="text-gray-400 text-xs">({ticket.left} left)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1C8DA5] text-white text-xs font-bold">{ticket.price}</span>
            </button>
          ))}
        </div>

        {/* Ticket Quantity */}
        <div className="mb-5">
          <label className="text-sm text-gray-300 mb-1 block">Quantity:</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white text-sm border border-[#1A3A4B] focus:ring-2 focus:ring-[#1C8DA5] outline-none transition-all"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 text-black py-3 rounded-lg border border-gray-500 text-sm hover:bg-gray-700 transition-all"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 text-black py-3 rounded-lg bg-[#1C8DA5] text-sm hover:bg-[#177A91] transition-all"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
