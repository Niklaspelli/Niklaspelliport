import { Container } from "react-bootstrap";
import "../styles.css";
import YouTubeVideo from "../components/YoutubeVideo";

export default function Work() {
  const videos = [
    {
      videoId: "F2rtDUqujcA",
      title: "Social Platform (Ongoing Project)",
      repoName: "Social-media-project",
      description: `I’m currently developing a social platform as a fullstack project with a focus on modern web development and security. The application is built using React (Vite) for the frontend, Node.js with Express for the backend, and MySQL as the database.

The platform includes features such as user registration, login, content posting, and user interaction, similar to a basic social network. The project is still in progress and serves as an opportunity to deepen my skills in fullstack development.

I’ve placed particular emphasis on security, implementing:

- CSRF protection using CSRF tokens  
- Authentication and session handling with access tokens (JWT)  
- Basic protection against common vulnerabilities such as XSS and SQL injection

The goal is to build a responsive, secure, and scalable web application with a clear separation between client and server.`,
      sourceUrl: "https://github.com/Niklaspelli/Social-media-project",
      sourceLabel: "Social media project",
      showLikeButton: true,
    },
    {
      videoId: "DrnsbG_C0Q8",
      title: "Simple Webshop (School Project)",
      repoName: "mock-webshop-typescript",
      description: `This is a simple webshop developed as part of a school project using React (Vite) (with TypeScript) for the frontend and Node.js (Express) for the backend. I also use MySQL for the database.

The webshop includes core features such as:
- Product listing
- Basic shopping cart functionality
- A user-friendly UI built with React Bootstrap.

Although the project is not perfect and lacks some advanced features, it was a fun and educational experience that helped me gain a deeper understanding of client-server interaction, API consumption, and frontend state management.`,
      sourceUrl: "https://github.com/Niklaspelli/mock-webshop-typescript",
      sourceLabel: "Amazing shirts!",
      showLikeButton: true,
    },
  ];

  return (
    <Container>
      <main className="Work" style={{ color: "orange" }}>
        <h1 style={{ color: "white" }}>My work</h1>
        <YouTubeVideo videos={videos} />
      </main>
    </Container>
  );
}
