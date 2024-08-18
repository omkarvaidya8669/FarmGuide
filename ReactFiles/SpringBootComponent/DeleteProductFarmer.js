import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DeleteProductsFarmer() {

  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [farmer, setFarmer] = useState(null);

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
      fetch(`http://localhost:8080/getproductsbyfid/${farmer.fid}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error("Error fetching products:", error));
    }
  }, [farmer]);

  const deleteProduct = (id) => {
    fetch("http://localhost:8080/deleteProductFarmer?pfid=" + id, {
      method: 'DELETE',
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Failed to delete product');
        }
        setSuccess(true);
        setProducts(products.filter(product => product.id !== id));
        setTimeout(() => setSuccess(false), 2000);
        window.location.reload();
      })
      .catch(error => {
        console.error("Error deleting product:", error.message);
      });
  };

  return (
    <div>
      <div className="bg-image" style={{ opacity: 0.7 }}></div>
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
                <Link to="/farmer/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/farmer/addproduct" className="nav-link">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/farmer/products" className="nav-link">
                  View Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/farmer/deleteproduct" className="nav-link">
                  Delete Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/farmer/orders" className="nav-link">Orders</Link>
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
        <h1>Delete Product</h1>
        {products.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sub Product</th>
                <th>Quantity(kg)</th>
                <th>Price(per kg)</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.pfid}>
                  <td>{product.product.pname}</td>
                  <td>{product.subProduct.spname}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.pfid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">No products found to delete!</div>
        )}
        {success && (
          <div className="alert alert-success mt-3">Product deleted successfully!</div>
        )}
      </div>
    </div>
  );
}
