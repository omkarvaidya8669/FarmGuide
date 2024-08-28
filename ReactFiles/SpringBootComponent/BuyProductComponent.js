import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [wholesaler, setWholesaler] = useState(null);
  const [enteredQuantities, setEnteredQuantities] = useState({});

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    setEnteredQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };

  const sendData = (e, product) => {
    e.preventDefault();

    const enteredQuantity = parseInt(enteredQuantities[product.pfid], 10);

    if (isNaN(enteredQuantity) || enteredQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (enteredQuantity > product.quantity) {
      alert("Entered quantity exceeds available stock.");
      return;
    }

    const dataToSend = {
      quantity: enteredQuantity,  
      pfid: product.pfid, 
      wid: wholesaler.wid
    };

    console.log("Data to send:", dataToSend);

    const reqdata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    };

    fetch("http://localhost:8080/insertincart", reqdata)
      .then(resp => {
        if (!resp.ok) {
          return resp.json().then(error => {
            throw new Error(JSON.stringify(error.error));
          });
        }
        return resp.json();
      })
      .then(data => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        // window.location.reload();
      })
      .catch(error => {
        setSuccess(false);
        console.error("Error:", error.message);
      });
  };

  useEffect(() => {
    const loginid = JSON.parse(localStorage.getItem("LoggedUser")).uid;

    fetch(`https://localhost:7219/api/Wholesaler/GetWholesalerById/${loginid}`)
      .then(resp => resp.json())
      .then(obj => {
        localStorage.setItem("loggedWholesaler", JSON.stringify(obj));
        setWholesaler(obj);
      })
      .catch(error => console.error("Error fetching wholesaler:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/getProductFarmer")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ backgroundColor: 'beige' }}>
      <br /><br /><br />
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
      <div className="container2 mt-5">
        <h1>Products</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Product</th>
              <th>Sub Product</th>
              <th>Quantity (kg)</th>
              <th>Price (per kg)</th>
              <th>Enter Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.pfid}>
                  <td>{product.farmer.fname} {product.farmer.lname}</td>
                  <td>{product.product.pname}</td>
                  <td>{product.subProduct.spname}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={enteredQuantities[product.pfid] || ''}
                      onChange={(e) => handleQuantityChange(e, product.pfid)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => sendData(e, product)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
        {success && (
          <div className="alert alert-success mt-3">Product added to cart!</div>
        )}
      </div>
    </div>
  );
}
