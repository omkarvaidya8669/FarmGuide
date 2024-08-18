import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';
import WholesalerSlideshow from './WholesalerSlideshow';


export default function WholesalerHome(){

  const [wholesaler, setWholesaler] = useState(null);
  useEffect( ()=>{
    const loginid = JSON.parse(localStorage.getItem("LoggedUser")).uid;

    fetch("https://localhost:7219/api/Wholesaler/GetWholesalerById/"+loginid)
    .then(resp=>resp.json())
    .then(obj=>{
      localStorage.setItem("loggedWholesaler",JSON.stringify(obj))
      setWholesaler(obj);
    })
  }, [])

    return (
        <div style={{backgroundColor:'beige'}}>
            <br/><br/><br/>
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
              <Link to="/wholesaler/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wholesaler/buy" className="nav-link">
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wholesaler/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wholesaler/orders" className="nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <u><i><h5 style={{paddingLeft:1350}}>{wholesaler && wholesaler.fname} {wholesaler && wholesaler.lname}</h5></i></u>
    <WholesalerSlideshow />
        </div>
    )
} 