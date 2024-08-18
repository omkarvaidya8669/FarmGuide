import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminViewOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/getorders`)
      .then(response => response.json())
      .then(data => {
        console.log("Orders Data:", data);
        setOrders(data);
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  const viewOrderDetails = (orderId) => {
    fetch(`http://localhost:8080/getallorderdetailsbyoid/${orderId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Order Details:", data);
        setSelectedOrderDetails(data);
      })
      .catch(error => console.error("Error fetching order details:", error));
  };

  const hideOrderDetails = () => {
    setSelectedOrderDetails(null);
  };

  return (
    <div style={{ backgroundColor: 'beige' }}>
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
                <Link to="/vieworders" className="nav-link">
                  View Orders
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
      <div className="container3 mt-5">
        <h1>Orders</h1>
        {orders.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderid}>
                  <td>{order.oid}</td>
                  <td>{new Date(order.datetime).toLocaleString()}</td>
                  <td>₹{order.amount}</td> {/* Adding Rupee symbol here */}
                  <td>
                    <button className="btn btn-primary" onClick={() => viewOrderDetails(order.oid)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No orders found</div>
        )}
        {selectedOrderDetails && (
          <div className="container2 mt-5">
            <h2>Order Details</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Farmer</th>
                  <th>Wholesaler</th>
                  <th>Product</th>
                  <th>SubProduct</th>
                  <th>Quantity(kg)</th>
                  <th>Price(per kg)</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderDetails.map(item => (
                  <tr key={item.itemId}>
                    <td>{item.productFarmer.farmer.fname} {item.productFarmer.farmer.lname}</td>
                    <td>{item.order.wholesaler.fname} {item.order.wholesaler.lname}</td>
                    <td>{item.productFarmer.subProduct.product.pname}</td>
                    <td>{item.productFarmer.subProduct.spname}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.amount}</td>
                    <td>₹{item.quantity * item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-secondary mb-3" onClick={hideOrderDetails}>
              Hide Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
