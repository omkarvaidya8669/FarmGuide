import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewProductsFarmer() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editPrice, setEditPrice] = useState('');
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

  const startEditing = (product) => {
    setEditingProduct(product);
    setEditQuantity(product.quantity);
    setEditPrice(product.price);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditQuantity('');
    setEditPrice('');
  };

  const saveEdit = () => {
    const updatedProduct = { ...editingProduct, quantity: editQuantity, price: editPrice };

    fetch(`http://localhost:8080/updateproductfarmer/${editingProduct.pfid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(data => {
        setProducts(products.map(product => (product.pfid === data.pfid ? data : product)));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        cancelEditing();
        window.location.reload();
      })
      .catch(error => console.error("Error updating product:", error));
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
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container1 mt-5">
        <h1>My Products</h1>
        {products.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sub Product</th>
                <th>Quantity (kg)</th>
                <th>Price (per kg)</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.pfid}>
                  <td>{product.product.pname}</td>
                  <td>{product.subProduct.spname}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => startEditing(product)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">To view your products, first add products!</div>
        )}
        {editingProduct && (
          <div className="edit-form">
            <h3>Edit Product</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
              <div className="mb-3">
                <label className="form-label">Quantity (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price (per kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={cancelEditing}>Cancel</button>
            </form>
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3">Product updated successfully!</div>
        )}
      </div>
    </div>
  );
}
