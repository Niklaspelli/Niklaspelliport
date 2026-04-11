import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ContactForm from "./components/Contactform/ContactForm";
import { useState } from "react";
import { UserProvider } from "./context/Usercontext.jsx";

import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay.jsx";

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
        <Navbar />

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <About name={userName} />
                  <WelcomeOverlay />
                  {/*  <LandingPage /> */}
                </>
              }
            />
            <Route path="/About" element={<About name={userName} />} />
            <Route path="/Work" element={<Work />} />
            <Route path="/Contact" element={<ContactForm />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
