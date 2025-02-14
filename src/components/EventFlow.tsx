import AttendeeDetails from "../pages/AttendeeDetails";
import TicketSelection from "../components/TicketSelection";
import { useState } from "react";

type EventFlowProps = {
  onRegister: (data: any) => void; // Define onRegister as a prop
};

const EventFlow: React.FC<EventFlowProps> = ({ onRegister }) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      {step === 1 ? (
        <TicketSelection onProceed={() => setStep(2)} />
      ) : (
        <AttendeeDetails onRegister={onRegister} /> 
      )}
    </div>
  );
};

export default EventFlow;
