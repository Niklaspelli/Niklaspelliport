import React, { useState, useEffect } from "react";
import bild from "/Niklas.jpg";
import "../styles.css";
import { Container } from "react-bootstrap";
import {
  faReact,
  faCss3Alt,
  faJs,
  faNodeJs,
  faHtml5,
  faGit,
  faBootstrap,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PDF_FILE_URL = "./Niklas_Pelli_CV_SV.pdf";

function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [message, setMessage] = useState("Good Evening!");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setMessage("Good morning and welcome!");
    } else if (currentHour < 18) {
      setMessage("Good day and welcome!");
    } else {
      setMessage("Good evening and welcome!");
    }
  }, []); // Empty dependency array to run once when the component mounts. */

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));

        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  // Toggle flip state when the card is clicked
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container>
      <div className="typer">
        <h1>{message}</h1>
      </div>
      <main className="About">
        <div className="card-container">
          <div className="card-bg">
            <p className="card-content" style={{ color: "orange" }}>
              <h2>About</h2>I am <b>Niklas Pelli</b>, born and raised in
              northern Sweden, from a small town called Haparanda. Currently
              studying "Front-end Cyber Sercurity" at Jensen Yrkeshögskola in
              Kista, Stockholm.
              <br></br> My creativity finds expression in various forms, whether
              it's through web design, music, or other outlets. I am a{" "}
              <b>team player</b> at heart and love to bounce ideas with others!
            </p>
            <p style={{ color: "orange" }}>
              Download my CV below or get in touch with me by clicking on
              <b>"Contact"</b>
            </p>
            <button
              onClick={() => {
                downloadFileAtURL(PDF_FILE_URL);
              }}
              className="btn"
            >
              Download CV
            </button>
          </div>
          <div className="card-img">
            <img src={bild} className="img-fluid" alt="" />
          </div>

          <div className="flip-card-container" onClick={handleClick}>
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
              <div className="flip-card-front">
                <div className="flip-headline">Click to see my skills</div>
              </div>
              <div className="flip-card-back">
                <FontAwesomeIcon
                  icon={faCss3Alt}
                  style={{
                    color: "blue",
                    fontSize: "5rem",
                    margin: "10px",
                  }}
                />
                <FontAwesomeIcon
                  icon={faJs}
                  style={{
                    color: "yellow",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
                <FontAwesomeIcon
                  icon={faNodeJs}
                  style={{
                    color: "green",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
                <FontAwesomeIcon
                  icon={faHtml5}
                  style={{
                    color: "orange",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
                <FontAwesomeIcon
                  icon={faGit}
                  style={{
                    color: "red",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
                <FontAwesomeIcon
                  icon={faReact}
                  style={{
                    color: "cyan",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
                <FontAwesomeIcon
                  icon={faBootstrap}
                  style={{
                    color: "purple",
                    fontSize: "5rem",
                    margin: "10",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default About;
