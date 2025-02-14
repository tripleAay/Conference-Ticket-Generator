import AttendeeDetails from "../pages/AttendeeDetails";
import TicketSelection from "../components/TicketSelection";
import { useState } from "react";

const EventFlow = ({ onRegister }) => {
  const [step, setStep] = useState(1);

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
