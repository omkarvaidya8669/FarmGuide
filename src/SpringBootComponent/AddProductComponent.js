import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      pname: newProduct
    };

    fetch('http://localhost:8080/saveProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage('Product added successfully!');
        setNewProduct(''); 
      })
      .catch(error => {
        setErrorMessage('Error adding product: ' + error.message);
      });
  };

  return (
    <div style={{ backgroundColor: 'beige' }}>
      <div>
        <br /><br /><br />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              FarmGuide
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewfarmers">
                    View Farmers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewwholesalers">
                    View Wholesalers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewtransactions">
                    View Transactions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}
