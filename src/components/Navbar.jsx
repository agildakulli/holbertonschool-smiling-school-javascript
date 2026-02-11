import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span>☺</span> SmileSchool
        </div>

        <ul className="nav-links">
          <li><a href="#courses">COURSES</a></li>
          <li><a href="#pricing">PRICING</a></li>
          <li><a href="#login">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
