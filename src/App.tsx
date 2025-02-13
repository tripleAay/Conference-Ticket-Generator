import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TicketSelection from "./components/TicketSelection";
import AttendeeDetails from "./pages/AttendeeDetails";
import TicketReceipt from "./pages/TicketReceipt";

function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="app-container">
      <NavBar />
      <div className="content-container">
        {step === 1 && <TicketSelection onProceed={() => setStep(2)} />}
        {step === 2 && <AttendeeDetails onRegister={() => setStep(3)} />}
        {step === 3 && <TicketReceipt />}
      </div>
    </div>
  );
}

export default App;
