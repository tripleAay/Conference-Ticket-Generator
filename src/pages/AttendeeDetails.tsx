import { useState, useEffect } from "react";

const AttendeeDetails = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: null,
        selectedOption: null
    });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [touched, setTouched] = useState({});

    
    useEffect(() => {
        const loadSavedData = async () => {
            
            const ticketData = localStorage.getItem("ticketDetails");
            if (ticketData) {
                const { selectedTicket } = JSON.parse(ticketData);
                setFormData(prev => ({ ...prev, selectedOption: selectedTicket }));
            }

           
            const savedFormData = localStorage.getItem("attendeeFormData");
            if (savedFormData) {
                setFormData(prev => ({ ...prev, ...JSON.parse(savedFormData) }));
            }
        };

        loadSavedData();
    }, []);

   
    useEffect(() => {
        localStorage.setItem("attendeeFormData", JSON.stringify({
            name: formData.name,
            email: formData.email,
            image: formData.image
        }));
    }, [formData]);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return !value.trim() ? 'Name is required' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Invalid email format';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

     
        if (touched[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ticket-gen"); 
        formData.append("cloud_name", "db5xd42ce");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/db5xd42ce/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image: data.secure_url }));
            } else {
                setErrors(prev => ({ ...prev, image: "Failed to upload image" }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, image: "Upload error, try again" }));
        } finally {
            setUploading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault(); 
    
    
        let validationErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) validationErrors[key] = error;
        });
    
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length > 0) return;
    
        
        if (onRegister) {
            onRegister(formData);
        }
    };
    




    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white px-6 mt-32">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#051b1b] p-6 rounded-2xl shadow-lg border border-[#064d4d]">
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-semibold"> Attendee Details</h2>
                    <span className="text-[#1C8DA5]">Step 2 of 3</span>
                </div>
                <hr className="border-t border-white w-full mb-4" />


                <div className="flex flex-col items-center justify-center w-full bg-[#0D1F28] p-4 rounded-lg mb-4">
                    {formData.image ? (
                        <img src={formData.image} alt="Uploaded" className="w-32 h-32 rounded-full object-cover" />
                    ) : (
                        <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-[#1C4A57]">
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            <span className="text-gray-400">{uploading ? "Uploading..." : "Drag & drop or click to upload"}</span>
                        </label>
                    )}
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">Enter your name *</label>
                    <input
                        type="text"
                        name="name"
                        className={`w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border ${errors.name ? 'border-red-500' : 'border-[#1A3A4B]'} focus:ring-2 focus:ring-[#1C8DA5] outline-none`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">Enter your email *</label>
                    <input
                        type="email"
                        name="email"
                        className={`w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border ${errors.email ? 'border-red-500' : 'border-[#1A3A4B]'} focus:ring-2 focus:ring-[#1C8DA5] outline-none`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-1">About the project</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg bg-[#18343D] text-white border border-[#1A3A4B]"
                        value={formData.selectedOption || ""}
                        readOnly
                    />
                </div>

                <div className="flex gap-3">
                    <button type="button" className="flex-1 py-1.5 px-3 text-xs font-medium text-black rounded-md border border-gray-500 hover:bg-gray-700 transition-all">
                        Back
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-2 px-4 text-xs font-medium text-black rounded-md bg-[#1C8DA5] hover:bg-[#177A91] transition-all whitespace-nowrap"
                    >
                        Get My Free Ticket
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttendeeDetails;