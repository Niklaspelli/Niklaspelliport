import { Container } from "react-bootstrap";
import "../styles.css";
import YouTubeVideo from "../components/YoutubeVideo";

export default function Work() {
  const videos = [
    {
      videoId: "F2rtDUqujcA",
      description:
        "Here is a Fullstack project I am currently working on. Here I am using React, Node.js and mySQL.",
      sourceUrl: "https://github.com/Niklaspelli/Social-media-project",
      sourceLabel: "Social media project",
      showLikeButton: true,
    },
    {
      videoId: "diBxFVftmf4",
      description:
        "Here is an old school project made in React Vite and Node.js.",
      sourceUrl: "https://github.com/Niklaspelli/WebshopProject/tree/main",
      sourceLabel: "Amazing shirts!",
      showLikeButton: true,
    },
  ];

  return (
    <Container>
      <main className="Work" style={{ color: "orange" }}>
        <h2>My work</h2>
        <YouTubeVideo videos={videos} />
      </main>
    </Container>
  );
}
