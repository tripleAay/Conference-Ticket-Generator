import { useState, useEffect } from "react";


interface TicketType {
  type: string;
  price: string;
  left: number;
}

interface TicketSelectionProps {
  onProceed: (ticketData: { selectedTicket: string; quantity: number; price: string }) => void;
}


const EventCard = () => {
  return (
    <div
      className="w-full max-w-lg rounded-2xl bg-[#04292b] p-6 text-center text-white shadow-lg border border-[#064d4d] relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"

    >
      <h2 className="text-3xl font-bold mb-2 tracking-wide font-[Cinzel]">
        Techember Fest '25
      </h2>
      <p className="text-sm text-gray-300 mb-4">
        Join us for an unforgettable experience at <br />
        <span className="font-semibold">Techember Fest</span>! Secure your spot now.
      </p>
      <div className="flex items-center justify-center gap-3 text-gray-300 text-sm">
        <span className="text-red-500">📍</span>
        <span>Virtual Event</span>
        <span className="text-gray-500">||</span>
        <span>March 15, 2025 | 7:00 PM</span>
      </div>
    </div>
  );
};

const TicketSelection: React.FC<TicketSelectionProps> = ({ onProceed }) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
 


  const ticketTypes: TicketType[] = [
    { type: "REGULAR", price: "Free", left: 20 },
    { type: "VIP", price: "$50", left: 20 },
    { type: "VVIP", price: "$150", left: 20 },
  ];


  useEffect(() => {
    const ticketData = localStorage.getItem("ticketDetails");

    if (ticketData) {
      const parsedData = JSON.parse(ticketData);
      const foundTicket = ticketTypes.find((ticket) => ticket.type === parsedData.selectedTicket);

      if (foundTicket) {
        setSelectedTicket(foundTicket);
        setQuantity(parsedData.quantity);
      }
    }
  }, []);




  useEffect(() => {
    if (touched && selectedTicket) {
      const ticketData = {
        selectedTicket: selectedTicket.type,
        quantity,
        price: selectedTicket.price
      };
      localStorage.setItem("ticketDetails", JSON.stringify(ticketData));
    }
  }, [selectedTicket, quantity, touched]);

  const validateSelection = (): boolean => {
    if (!selectedTicket) {
      setError("Please select a ticket type");
      return false;
    }

    if (quantity > selectedTicket.left) {
      setError(`Only ${selectedTicket.left} tickets available`);
      return false;
    }

    if (quantity < 1) {
      setError("Please select at least one ticket");
      return false;
    }

    setError("");
    return true;
  };

  const handleTicketSelect = (ticketType: string) => {
    const ticket = ticketTypes.find(t => t.type === ticketType);
    if (ticket) {
      setSelectedTicket(ticket);
      setTouched(true);
      setError("");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setTouched(true);

    if (selectedTicket && newQuantity > selectedTicket.left) {
      setError(`Only ${selectedTicket.left} tickets available`);
    } else {
      setError("");
    }
  };

  const handleProceed = () => {
    if (validateSelection()) {
      onProceed({ selectedTicket: selectedTicket!.type, quantity, price: selectedTicket!.price });
    }
  };


  return (
    <div className="h-screen flex flex-col items-center text-left justify-center bg-[#020C14] px-4 w-[700px] mt-32 border border-[#175050] rounded-lg bg-[#051b1b] text-white shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold">Select Your Ticket</h2>
        <span className="text-[#1C8DA5]">Step 1 of 3</span>
      </div>
      <hr className="border-t border-white w-full mb-4" />


      <EventCard />

      <div className="w-full p-6 rounded-2xl bg-[#0D1F28] shadow-xl text-white">
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          {ticketTypes.map((ticket) => (
            <button
              key={ticket.type}
              className={`w-full flex justify-between items-center px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 
              ${ticket.left === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              ${selectedTicket?.type === ticket.type ? "bg-[#1C4A57] shadow-lg scale-105" : "bg-[#18343D] hover:bg-[#1C4A57] hover:scale-105"}`}
              onClick={() => handleTicketSelect(ticket.type)}
              disabled={ticket.left === 0}
            >
              <span className="text-black font-medium">
                {ticket.type} <span className="text-gray-400 text-xs">({ticket.left} left)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1C8DA5] text-white text-xs font-bold">
                {ticket.price}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <label className="text-sm text-gray-300 mb-1 block">Quantity:</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white text-sm border border-[#1A3A4B] focus:ring-2 focus:ring-[#1C8DA5] outline-none transition-all"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!selectedTicket}
          >
            {[...Array(5)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <button
          className={`w-full py-3 rounded-lg text-black text-sm transition-all
    ${selectedTicket ? "bg-[#1C8DA5] hover:bg-[#147a89]" : "bg-gray-500 cursor-not-allowed"}
  `}
          onClick={handleProceed}
          disabled={!selectedTicket}
        >
          Proceed
        </button>

      </div>
    </div>
  );
};

export default TicketSelection;
