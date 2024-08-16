import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProductFarmer() {
  const init = {
    quantity: '',
    price: '',
    pid: '',
    spid: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, [action.fld]: action.val };
      case 'reset':
        return init;
      default:
        return state;
    }
  };

  const [farmer, setFarmer] = useState(null);
  const [info, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [subProducts, setSubProducts] = useState([]);

  useEffect(() => {
    const loginid = JSON.parse(localStorage.getItem("LoggedUser")).uid;

    fetch(`https://localhost:7219/api/Farmer/GetFarmerById/${loginid}`)
      .then(resp => resp.json())
      .then(obj => {
        localStorage.setItem("loggedFarmer", JSON.stringify(obj));
        setFarmer(obj);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/getProducts")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (info.pid) {
      fetch("http://localhost:8080/getsubprobyid?pid=" + info.pid)
        .then(response => response.json())
        .then(data => setSubProducts(data))
        .catch(error => console.error("Error fetching sub-products:", error));
    }
  }, [info.pid]);

  const validate = () => {
    const errors = {};
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(info.price)) errors.price = "Price must be a positive number with up to two decimal places!";
    if (!info.price) errors.price = "Price is required";
    else if (parseInt(info.price, 10) <= 0) errors.price = "Price must be greater than 0!";
    if (!/^[0-9]+$/.test(info.quantity)) errors.quantity = "Quantity must be a valid number!";
    if (!info.quantity) errors.quantity = "Quantity is required";
    else if (parseInt(info.quantity, 10) <= 49) errors.quantity = "Quantity must be greater than 50!";
    return errors;
  };

  const sendData = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSend = {
      quantity: info.quantity,
      price: info.price,
      pid: info.pid,
      spid: info.spid,
      fid: farmer.fid
    };

    const reqdata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    };

    fetch("http://localhost:8080/saveProductFarmer", reqdata)
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
        console.log("Success:", data);
        dispatch({ type: 'reset' });
        setErrors({});
      })
      .catch(error => {
        setSuccess(false);
        console.error("Error:", error.message);
      });
  };

  const handleInputChange = (e, field) => {
    dispatch({ type: 'update', fld: field, val: e.target.value });
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
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
      <div className="login-card" style={{ top: 30 }}>
        <h1>Add Your Product</h1>
        <form onSubmit={sendData} className="contact-form">
          <div className="mb-3">
            <label htmlFor="pid" className="form-label">Product:</label>
            <select
              id="pid"
              className="form-select"
              value={info.pid}
              onChange={(e) => handleInputChange(e, 'pid')}
              required
            >
              <option value="">Select product</option>
              {products.map(product => (
                <option key={product.pid} value={product.pid}>{product.pname}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="spid" className="form-label">Sub Product:</label>
            <select
              id="spid"
              className="form-select"
              value={info.spid}
              onChange={(e) => handleInputChange(e, 'spid')}
              required
            >
              <option value="">Select subproduct</option>
              {subProducts.map(subProduct => (
                <option key={subProduct.spid} value={subProduct.spid}>{subProduct.spname}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={info.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
              required
            />
            {errors.quantity && <p className="error-message">{errors.quantity}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={info.price}
              onChange={(e) => handleInputChange(e, 'price')}
              required
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
        {success && (
          <div className="alert alert-success mt-3">Added Successfully!</div>
        )}
      </div>
    </div>
  );
}
