import { useState } from "react";
import TicketSelection from "../components/TicketSelection";
import AttendeeDetails from "../pages/AttendeeDetails";

const EventFlow = () => {
  const [step, setStep] = useState(1); // 1 for TicketSelection, 2 for AttendeeDetails

  return (
    <div>
      {step === 1 ? (
        <TicketSelection onProceed={() => setStep(2)} />
      ) : (
        <AttendeeDetails />
      )}
    </div>
  );
};

export default EventFlow;
