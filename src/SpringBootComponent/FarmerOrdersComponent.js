import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavigationBar.css';

export default function FarmerOrders() {
    const [farmer, setFarmer] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loginid = JSON.parse(localStorage.getItem("LoggedUser")).uid;
    
        fetch(`https://localhost:7219/api/Farmer/GetFarmerById/${loginid}`)
            .then(resp => resp.json())
            .then(obj => {
                localStorage.setItem("loggedFarmer", JSON.stringify(obj));
                setFarmer(obj);
            })
            .catch(error => console.error("Error fetching farmer:", error));
    }, []);
    
    useEffect(() => {
        if (farmer) {
            fetch(`http://localhost:8080/getodetailsbyfid/${farmer.fid}`)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error("Error fetching orders:", error));
        }
    }, [farmer]);

    return (
        <div style={{backgroundColor:'beige'}}>
            <br/><br/><br/>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">FarmGuide</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/farmer/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/farmer/addproduct" className="nav-link">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/farmer/products" className="nav-link">View Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/farmer/deleteproduct" className="nav-link">Delete Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/farmer/orders" className="nav-link">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container2 mt-5">
                <h2>Orders History</h2>
                {orders.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>SubProduct</th>
                                <th>Quantity(kg)</th>
                                <th>Price(per kg)</th>
                                <th>Total Amount</th>
                                <th>Wholesaler</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.order.oid}</td>
                                    <td>{order.productFarmer.product.pname}</td>
                                    <td>{order.productFarmer.subProduct.spname}</td>
                                    <td>{order.quantity}</td>
                                    <td>₹{order.amount}</td>
                                    <td>₹{order.amount * order.quantity}</td>
                                    <td>{order.order.wholesaler.fname} {order.order.wholesaler.lname}</td>
                                    <td>{order.order.wholesaler.mobileNo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No orders available.</div>
                )}
            </div>
        </div>
    );
}
