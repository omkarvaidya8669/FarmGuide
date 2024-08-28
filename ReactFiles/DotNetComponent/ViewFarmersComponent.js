import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';


export default function ViewFarmers(){

    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7219/api/Farmer/GetFarmers")
          .then(response => response.json())
          .then(data => setFarmers(data))
          .catch(error => console.error("Error fetching farmers:", error));
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
    <div className="container2 mt-5">
        <h1>Farmers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>Aadhar No</th>
              <th>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {farmers.length > 0 ? (
              farmers.map(farmer1 => (
                <tr key={farmer1.fid}>
                  <td>{farmer1.fname}</td>
                  <td>{farmer1.lname}</td>
                  <td>{farmer1.email}</td>
                  <td>{farmer1.address}</td>
                  <td>{farmer1.city.cityname}</td>
                  <td>{farmer1.aadharNo}</td>
                  <td>{farmer1.mobileNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No farmers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
        </div>
        </div>
    )
}