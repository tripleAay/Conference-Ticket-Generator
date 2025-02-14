import AttendeeDetails from "../pages/AttendeeDetails";
import TicketSelection from "../components/TicketSelection";
import { useState } from "react";

const EventFlow: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleRegister = (data: any): void => {
    console.log("User registered:", data);
  };

  return (
    <div>
      {step === 1 ? (
        <TicketSelection onProceed={() => setStep(2)} />
      ) : (
        <AttendeeDetails onRegister={handleRegister} /> // 
      )}
    </div>
  );
};

export default EventFlow;
