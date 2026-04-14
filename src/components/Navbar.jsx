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

  .brand-text {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  /* Dropdown-menyn styling */
  .navbar-custom .dropdown-menu {
    background-color: #0a0a0a !important;
    border: 1px solid orange !important;
    padding: 0;
    border-radius: 4px;
  }

  /* --- HAMBURGERMENY (Endast för mobil/tablet) --- */
  @media (max-width: 991px) {
    .navbar-toggler {
      display: flex !important; /* Tvinga flex endast i mobilläge */
      align-items: center;
      gap: 8px;
      border-color: orange !important;
      padding: 5px 10px !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  /* --- DESKTOP (Dölj toggler helt) --- */
  @media (min-width: 992px) {
    .navbar-toggler {
      display: none !important;
    }
  }

  .toggler-text {
    color: orange;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .navbar-toggler-icon {
    filter: invert(65%) sepia(97%) saturate(1354%) hue-rotate(360deg) brightness(103%) contrast(106%);
    width: 1.2em;
    height: 1.2em;
  }

  /* Underline-effekt på länkar */
  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-item::after {
    content: '';
    height: 2px;
    width: 0%;
    background: orange;
    position: absolute;
    left: 5%;
    bottom: 0;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .nav-item:hover::after, 
  .nav-item.active::after {
    width: 90%;
    opacity: 1;
  }
`}</style>

      <Navbar
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
        expand="lg" // Detta är standard för laptop-brytpunkt
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

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="toggler-text d-lg-none">MENU</span>
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <CustomLink to="/About" setExpanded={setExpanded}>
                ABOUT
              </CustomLink>
              <CustomLink to="/Work" setExpanded={setExpanded}>
                WORK
              </CustomLink>
              <NavDropdown
                title="CONTACT"
                id="basic-nav-dropdown"
                className="nav-item"
              >
                <div className="navbar-custom .dropdown-menu">
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
                </div>
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
        onClick={() => setExpanded(false)}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}
