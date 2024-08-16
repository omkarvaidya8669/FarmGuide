import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/PlacedOrdersPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PlacedOrders() {

  const [orders, setOrders] = useState(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders"));
    return savedOrders || [];
  });

  const removeOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.ofid !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wholesaler/orders" className="nav-link">
                  Orders ({orders.length})
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
        <h1>Your Orders</h1>
        {orders.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Sub Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.ofid}>
                  <td>{order.ofid}</td>
                  <td>{order.product.pname}</td>
                  <td>{order.subProduct.spname}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeOrder(order.ofid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No orders placed</div>
        )}
      </div>
    </div>
  );
}
