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

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function PelliNavbar() {
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
        }

        /* Dropdown-menyn styling */
        .dropdown-menu-custom {
          background-color: #0a0a0a !important;
          border: 1px solid orange !important;
        }

        .dropdown-item:hover {
          background-color: rgba(255, 165, 0, 0.1) !important;
        }

        /* Hamburgermeny-ikonen */
        .navbar-toggler {
          border-color: orange !important;
        }
      .navbar-toggler-icon {
  filter: invert(65%) sepia(97%) saturate(1354%) hue-rotate(360deg) brightness(103%) contrast(106%);
}

.navbar-toggler {
  border-color: orange !important;
}
      `}</style>

      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">
            HOME
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/About">
                ABOUT
              </Nav.Link>
              <Nav.Link as={Link} to="/Work">
                WORK
              </Nav.Link>

              <NavDropdown
                title="CONTACT"
                id="basic-nav-dropdown"
                menuVariant="dark"
                className="dropdown-menu-custom-wrapper"
              >
                <div className="dropdown-menu-custom">
                  <NavDropdown.Item as={Link} to="/Contact">
                    SEND MESSAGE
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Guestbook">
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
