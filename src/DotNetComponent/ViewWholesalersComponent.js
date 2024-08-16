import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';

export default function ViewWholesalers(){

    const [wholesalers, setWholesalers] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7219/api/Wholesaler/GetWholesellers")
          .then(response => response.json())
          .then(data => setWholesalers(data))
          .catch(error => console.error("Error fetching wholesalers:", error));
      }, []);


    return (
      <div style={{backgroundColor:'beige'}}>
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
              <Link to="/viewtransactions" className="nav-link">
                View Transactions
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
    <div className="container2 mt-5">
        <h1>Wholesalers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>GST No</th>
              <th>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {wholesalers.length > 0 ? (
              wholesalers.map(wholesaler => (
                <tr key={wholesaler.wid}>
                  <td>{wholesaler.fname}</td>
                  <td>{wholesaler.lname}</td>
                  <td>{wholesaler.email}</td>
                  <td>{wholesaler.address}</td>
                  <td>{wholesaler.city.cityname}</td>
                  <td>{wholesaler.gstNo}</td>
                  <td>{wholesaler.mobileNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No Wholesalers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        </div>
        </div>
    )
}