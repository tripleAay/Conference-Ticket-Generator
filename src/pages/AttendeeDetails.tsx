import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AttendeeDetails = ({ onRegister }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("ticketDetails");
        if (storedData) {
            const { selectedTicket } = JSON.parse(storedData);
            setSelectedOption(selectedTicket);
        }
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-white px-6">
            <div className="w-full max-w-lg bg-[#051b1b] p-6 rounded-2xl shadow-lg border border-[#064d4d]">
                <h2 className="text-xl font-semibold mb-4">Attendee Details</h2>
                <div className="w-full border-b border-gray-500 mb-4"></div>

                <div className="flex flex-col items-center justify-center w-full bg-[#0D1F28] p-4 rounded-lg mb-4">
                    {image ? (
                        <img src={image} alt="Uploaded" className="w-32 h-32 rounded-full object-cover" />
                    ) : (
                        <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-[#1C4A57]">
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            <span className="text-gray-400">Drag & drop or click to upload</span>
                        </label>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">Enter your name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border border-[#1A3A4B] focus:ring-2 focus:ring-[#1C8DA5] outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">Enter your email *</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border border-[#1A3A4B] focus:ring-2 focus:ring-[#1C8DA5] outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">About the project</label>

                    <textarea className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border border-[#1A3A4B]">{selectedOption || "No ticket selected"}</textarea>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 py-1.5 px-3 text-xs font-medium text-black rounded-md border border-gray-500 hover:bg-gray-700 transition-all">
                        Back
                    </button>
                    <button onClick={onRegister} className="flex-1 py-2 px-4 text-xs font-medium text-black rounded-md bg-[#1C8DA5] hover:bg-[#177A91] transition-all whitespace-nowrap">
                        Get My Free Ticket
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AttendeeDetails;
