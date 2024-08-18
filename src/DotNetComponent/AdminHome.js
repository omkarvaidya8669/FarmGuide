import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';


export default function AdminHome(){

    return (
      <div>
        <div>
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
              <Link to="/admin/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/viewfarmers" className="nav-link">
                View Farmers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/viewwholesalers" className="nav-link">
                View Wholesalers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vieworders" className="nav-link">
                View Orders
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
            <h1>Welcome back Admin</h1>
        </div>
        </div>
    )
}