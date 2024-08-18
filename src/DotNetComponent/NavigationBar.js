import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';

const NavigationBar = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const mystate = useSelector((state)=> state.logged);

  return (
    <div>
    <div style={{display: mystate.loggedIn?"none":"block"}}></div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          FarmGuide
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item dropdown" onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
              <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={dropdown}>
                Register
              </div>
              <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <li>
                  <Link to="farmer/registration" className="dropdown-item">
                    Farmer
                  </Link>
                </li>
                <li>
                  <Link to="wholesaler/registration" className="dropdown-item">
                    Wholesaler
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/aboutus" className="nav-link">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default NavigationBar;
