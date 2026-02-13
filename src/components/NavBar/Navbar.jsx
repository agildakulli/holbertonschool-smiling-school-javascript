import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import smile_off from "../../assets/smile_off.png";
import "./NavBar.css";

const MainNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(prev => !prev);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      bg="dark"
      variant="dark"
      className="py-3 custom-navbar"
      style={{ backgroundColor: "#071629" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={handleClose}
          className="d-flex align-items-center" >
          <img src={smile_off} alt="Smile" height="30" className="me-2" />
          <img src={logo} alt="Logo" height="30" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={handleToggle}/>
        <Navbar.Collapse
          id="navbar-nav"
          className="justify-content-end" >
          <Nav className="fw-bold txt-size">
            <Nav.Link
              as={NavLink}
              to="/courses"
              onClick={handleClose}
              className="mx-3 txt-link"
            >COURSES
            </Nav.Link>
            <Nav.Link
              as={NavLink} to="/pricing"  onClick={handleClose}className="mx-3 txt-link"> PRICING</Nav.Link>
            <Nav.Link as={NavLink} to="/login" onClick={handleClose} className="mx-3 txt-link">LOGIN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
