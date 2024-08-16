import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cart() {

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.pfid !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
                  Cart ({cart.length})
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
        <h1>Your Cart</h1>
        {cart.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sub Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr key={product.pfid}>
                  <td>{product.product.pname}</td>
                  <td>{product.subProduct.spname}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(product.pfid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No items added to cart</div>
        )}
      </div>
    </div>
  );
}
/*
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.pfid !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const placeOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    localStorage.removeItem("cart");
    setCart([]);
    setSuccessMessage("Order placed successfully!");
    
    // Optionally navigate to the orders page after a brief delay
    setTimeout(() => {
      navigate("/wholesaler/orders");
    }, 2000);
  };

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
                  Cart ({cart.length})
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
        <h1>Your Cart</h1>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        {cart.length > 0 ? (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sub Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(product => (
                  <tr key={product.pfid}>
                    <td>{product.product.pname}</td>
                    <td>{product.subProduct.spname}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(product.pfid)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-3">
              <button
                className="btn btn-success"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">No items added to cart</div>
        )}
      </div>
    </div>
  );
}
*/