import { useState } from "react";
import TicketSelection from "../components/TicketSelection";
import AttendeeDetails from "../pages/AttendeeDetails";

const EventFlow = () => {
  const [step, setStep] = useState(1); // 1 for TicketSelection, 2 for AttendeeDetails

  const handleRegister = () => {
    console.log("User registered");
    // Add any logic needed after registering an attendee
  };

  return (
    <div>
      {step === 1 ? (
        <TicketSelection onProceed={() => setStep(2)} />
      ) : (
        <AttendeeDetails onRegister={handleRegister} /> {/* Fix: Passing onRegister */}
      )}
    </div>
  );
};

export default EventFlow;
