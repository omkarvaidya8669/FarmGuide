import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [success, setSuccess] = useState(false);
  const [wholesaler, setWholesaler] = useState(null);

  const placeOrder = () => {
    console.log(cartItems);
    fetch(`http://localhost:8080/insertorder/${wholesaler.wid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(cartItems)
    })
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
        console.log("Order placed successfully:", data);
      })
      .catch(error => {
        console.error("Error placing order:", error.message);
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
    if (wholesaler) {
      fetch(`http://localhost:8080/getcartbyid/${wholesaler.wid}`)
        .then(response => response.json())
        .then(data => {
          console.log("Cart Items Data:", data);
          setCartItems(data);
        })
        .catch(error => console.error("Error fetching cart items:", error));
    }
  }, [wholesaler]);
  
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
      <div className="container1 mt-5">
        <h1>Cart</h1>
        {cartItems.length > 0 ? (
          <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sub Product</th>
                <th>Quantity (kg)</th>
                <th>Price (per kg)</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cartid}>
                  <td>{item.productFarmer.product.pname}</td>
                  <td>{item.productFarmer.subProduct.spname}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.productFarmer.price}</td>
                  <td>₹{item.quantity * item.productFarmer.price}</td>
                </tr>
              ))}
            </tbody>
            </table>
             <button className="btn btn-success" onClick={placeOrder}>
            Place Order
          </button>
            </div>
        ) : (
          <div className="text-center">Empty! Add products to cart to view.</div>
        )}
        <div className="text-end">
        </div>
        {success && (
          <div className="alert alert-success mt-3">Order placed successfully!</div>
        )}
      </div>
    </div>
  );
}