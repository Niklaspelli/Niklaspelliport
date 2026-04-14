/* import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/About" className="nav_link">
          About
        </CustomLink>
        <CustomLink to="/Work">Work</CustomLink>
        <CustomLink to="/Contact">Contact</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
 */
import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function PelliNavbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <style>{`
        /* Bakgrund och ram */
        .navbar-custom {
          background-color: #0a0a0a !important;
          border-bottom: 1px solid orange;
        }

        /* All text ska vara orange */
        .navbar-custom .navbar-brand,
        .navbar-custom .nav-link,
        .navbar-custom .dropdown-toggle,
        .navbar-custom .dropdown-item {
          color: orange !important;
        }

        /* Titeln (Home) */
        .brand-text {
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
              animation: glow 1s ease-in-out infinite alternate;

        }

        /* Dropdown-menyn styling */
      .navbar-custom .dropdown-menu {
  background-color: #0a0a0a !important;
  border: 1px solid orange !important;
  padding: 0; /* Tar bort Bootstraps standard-padding */
  border-radius: 4px; /* Valfritt: för snyggare hörn */
}

/* 2. Se till att länkarna inuti inte får vit bakgrund vid hover */
.navbar-custom .dropdown-item {
  color: orange !important;
  background-color: transparent !important;
  padding: 10px 20px;
}

.navbar-custom .dropdown-item:hover {
  background-color: rgba(255, 165, 0, 0.1) !important; /* Din orangea hover-effekt */
  color: orange !important;
}

/* 3. Ta bort den lilla vita "pilen" om den syns i vissa webbläsare */
.dropdown-menu[data-bs-popper] {
  margin-top: 0;
}

        /* Hamburgermeny-ikonen */
        .navbar-toggler {
          border-color: orange !important;
        }
      .navbar-toggler-icon {
  filter: invert(65%) sepia(97%) saturate(1354%) hue-rotate(360deg) brightness(103%) contrast(106%);
}


.nav-item {
    position: relative;
    display: flex;
    align-items: center;
}

.nav-item::after {
    content: '';
    height: 2px;
    width: 95%;
    background: orange;
    position: absolute;
    left: 0;
    bottom: 0; /* Justerad för att ligga i botten av navbaren */
    opacity: 0;
    transition: all 0.4s;
    pointer-events: none;
}

/* Visa linjen vid hover eller om länken är aktiv */
.nav-item:hover::after, 
.nav-item.active::after {
    opacity: 3;
}


.navbar-toggler {
  border-color: orange !important;
}
      `}</style>

      <Navbar
        expanded={expanded} // Koppla statet till Bootstrap
        onToggle={(isExpanded) => setExpanded(isExpanded)} // Uppdatera när man klickar på hamburgaren
        expand="lg"
        fixed="top"
        className="navbar-custom"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="brand-text"
            onClick={() => setExpanded(false)}
          >
            HOME
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Skicka med setExpanded till dina länkar */}
              <CustomLink to="/About" setExpanded={setExpanded}>
                ABOUT
              </CustomLink>
              <CustomLink to="/Work" setExpanded={setExpanded}>
                WORK
              </CustomLink>

              <NavDropdown title="CONTACT" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/Contact"
                  onClick={() => setExpanded(false)}
                >
                  SEND MESSAGE
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/Guestbook"
                  onClick={() => setExpanded(false)}
                >
                  GUESTBOOK
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function CustomLink({ to, children, setExpanded }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Nav.Item className={isActive ? "active" : ""}>
      <Nav.Link
        as={Link}
        to={to}
        className="px-3"
        onClick={() => setExpanded(false)} // STÄNGER MENYN HÄR
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}
