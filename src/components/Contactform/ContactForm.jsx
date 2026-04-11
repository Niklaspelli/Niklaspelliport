import { useEffect, useState } from "react";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "styled-components";
import "./contactform.css";
import emailjs from "@emailjs/browser";
import { useUser } from "../../context/Usercontext";

const service = import.meta.env.VITE_SERVICE;
const template = import.meta.env.VITE_TEMPLATE;
const id = import.meta.env.VITE_ID;

const ContactForm = () => {
  const { userName } = useUser();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    role: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation before submission
    if (!values.fullName || !values.email || !values.message) {
      setStatus("ERROR");
      return;
    }
    setIsSending(true);

    emailjs.send(service, template, values, id).then(
      (response) => {
        setIsSending(false);
        console.log("SUCCESS!", response);
        setValues({
          fullName: "",
          email: "",
          role: "",
          message: "",
        });
        setStatus("SUCCESS");
      },
      (error) => {
        console.log("FAILED...", error);
        setIsSending(false);
        setStatus("ERROR");
      },
    );
  };

  useEffect(() => {
    if (status === "SUCCESS" || status === "ERROR") {
      setTimeout(() => {
        setStatus(""); // Reset status after 3 seconds
      }, 3000);
    }
  }, [status]);

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const renderAlert = () => {
    return (
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`fancy-popup ${status === "SUCCESS" ? "success" : "error"}`}
          >
            <div className="popup-content">
              <div className="popup-icon">
                {status === "SUCCESS" ? "✓" : "✕"}
              </div>
              <div className="popup-text">
                <h5>{status === "SUCCESS" ? "Sent!" : "Oh no!"}</h5>
                <p>
                  {status === "SUCCESS"
                    ? "Your message is on its way to Niklas."
                    : "Something went wrong. Please try again."}
                </p>
              </div>
            </div>
            {/* En liten progress bar som visar när den försvinner */}
            <motion.div
              className="popup-progress"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <Container>
      <Grid
        animate={{ opacity: 5 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Row className="justify-content-center align-items-center h-100">
          <h2 style={{ color: "orange" }}>Send me a message, {userName}!</h2>
          <Col md={6} lg={4} className="justify-content-center">
            <label style={{ color: "orange" }}>Name:</label>
            <Form.Floating className="mb-1" inline>
              <InputField
                value={values.fullName}
                handleChange={handleChange}
                name="fullName"
                type="text"
                placeholder="John Doe"
                required // Make full name required
              />
            </Form.Floating>
            <label style={{ color: "orange" }}>E-mail:</label>
            <Form.Floating className="mb-1" inline>
              <InputField
                value={values.email}
                handleChange={handleChange}
                name="email"
                type="email"
                placeholder="john@example.com"
                required // Make email required
              />
            </Form.Floating>
            <label style={{ color: "orange" }}>Message:</label>
            <Form.Floating className="mb-1" inline>
              <TextareaField
                value={values.message}
                handleChange={handleChange}
                name="message"
                required // Make message required
              />
            </Form.Floating>
            {renderAlert()}
            <div style={{ position: "relative" }}>
              <Button
                className="--btn"
                type="submit"
                disabled={isSending} // Förhindra dubbelklick
                style={{
                  background: "black",
                  border: "1px solid orange",
                  color: "orange",
                  padding: "6px 20px",
                  margin: "30px 0",
                  width: "150px", // Fast bredd så knappen inte hoppar
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "100px",
                }}
                onClick={handleSubmit}
              >
                {isSending ? "Sending..." : "Send"}

                {/* Denna rörelse skapar en "skugga" som sveper över knappen när man skickar */}
                {isSending && (
                  <motion.div
                    className="button-shimmer"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                )}
              </Button>

              {/* Den faktiska laddningsmätaren under knappen */}
              <AnimatePresence>
                {isSending && (
                  <motion.div
                    className="loading-bar-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="loading-bar-fill"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default ContactForm;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
