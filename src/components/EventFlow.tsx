import { useState } from "react";
import TicketSelection from "../components/TicketSelection";
import AttendeeDetails from "../pages/AttendeeDetails";

const EventFlow: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleRegister = (): void => {
    console.log("User registered");
  };

  return (
    <div>
      {step === 1 ? (
        <TicketSelection onProceed={() => setStep(2)} />
      ) : (
        <AttendeeDetails onRegister={handleRegister} /> 
      )}
    </div>
  );
};

export default EventFlow;
