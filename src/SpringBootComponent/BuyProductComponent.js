import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BuyProduct() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/getProductFarmer")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
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
        <h1>Products</h1>
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
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.pfid}>
                  <td>{product.product.pname}</td>
                  <td>{product.subProduct.spname}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
        {success && (
          <div className="alert alert-success mt-3">Product added to cart!</div>
        )}
        {/* <h2 className="mt-5">Cart</h2>
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
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.pname}</td>
                  <td>{item.subProduct.spname}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No items in cart</td>
              </tr>
            )}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
