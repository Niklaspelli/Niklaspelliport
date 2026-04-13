import Navbar from "./components/Navbar";
import About from "./pages/About";
import Work from "./pages/Work";
import ContactForm from "./components/Contactform/ContactForm";
import { useState } from "react";
import { UserProvider } from "./context/Usercontext.jsx";

import "./waves.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay.jsx";
import Guestbook from "./pages/Guestbook.jsx";

function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("visitorName") || "",
  );

  const handleNameSave = (name) => {
    setUserName(name);
    localStorage.setItem("visitorName", name);
  };

  return (
    <UserProvider>
      <Router>
        {/* --- BAKGRUNDS-VÅGOR --- */}
        <div className="wave-container">
          <div className="wave grey-wave"></div>
          <div className="wave white-wave"></div>
        </div>

        {/* --- NAVIGATION --- */}
        <Navbar />

        {/* --- LOGIN/WELCOME OVERLAY --- */}
        {/* Denna renderas nu globalt så den täcker hela sidan tills man är klar */}
        <WelcomeOverlay />

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/About" element={<About />} />
          <Route path="/Work" element={<Work />} />
          <Route path="/Guestbook" element={<Guestbook />} />
          <Route path="/Contact" element={<ContactForm />} />
        </Routes>

        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
