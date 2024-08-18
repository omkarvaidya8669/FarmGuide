import React, { useState, useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/LoginPage.css";

export default function WholesalerRegistration() {
  const init = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    gst_no: "",
    email: "",
    mobile_no: "",
    username: "",
    pwd: ""
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

  useEffect(() => {
    fetch("http://localhost:8080/getcities")
      .then(response => response.json())
      .then(data => setCity(data))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const [passwordType, setPasswordType] = useState('password');
  const [info, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState({});
  const [city, setCity] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const validate = () => {
    const errors = {};
    if (!info.firstName) errors.firstName = "First Name is required";
    if (!/^[A-Z][a-zA-Z]{0,19}$/.test(info.firstName)) errors.firstName = "First Name must start with capital letter and only contain letters!";
    if (!info.lastName) errors.lastName = "Last Name is required";
    if (!/^[A-Z][a-zA-Z]{0,19}$/.test(info.lastName)) errors.lastName = "Last Name must start with capital letter and only contain letters!";
    if (!info.address) errors.address = "Address is required";
    if (!/^[a-zA-Z0-9\s,'/.-]{15,100}$/.test(info.address)) errors.address = "Address must contain characters only between 15 to 100!";
    if (!info.city) errors.city = "City is required";
    if (!info.gst_no.trim()) errors.gst_no = "GST number is required";
    if (!/^[A-Z0-9]{15}$/.test(info.gst_no)) errors.gst_no = "GST Number can contain only 15 characters (capital letters and digits)!";
    if (!info.email) errors.email = "Email is required";
    if (!/^[\w#.-]{5,15}@[\w]{5,15}\.[a-z]{2,3}$/.test(info.email)) errors.email = 'Email must be of type "(5-15 c)@(5-15 c).(2 or 3 c)" (c = characters)';
    if (!info.mobile_no) errors.mobile_no = "Mobile number is required";
    if (!/^\d{10}$/.test(info.mobile_no)) errors.mobile_no = "Mobile number must be of 10 digits";
    if (!info.username) errors.username = "Username is required";
    if (!/^[A-Za-z]{1}[A-Za-z0-9]{5,12}$/.test(info.username)) errors.username = "Username must start with capital letter and be of 5 to 12 characters with only alphabets and digits!";
    if (!info.pwd) errors.pwd = "Password is required";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/.test(info.pwd)) errors.pwd = "Password must contain at least 1 capital, 1 small letter, 1 digit, 1 special character and should be of length 6-12 only!";
    return errors;
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'update', fld: field, val: value });
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const dataToSend = {
      fname: info.firstName,
      lname: info.lastName,
      address: info.address,
      cityid: info.city,
      gstNo: info.gst_no,
      email: info.email,
      mobileNo: info.mobile_no,
      uidNavigation: {
        username: info.username,
        pwd: info.pwd,
        rid: 2,
        status: 1
      }
    };
  
    fetch("https://localhost:7219/api/Wholesaler/SaveWholesaler", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
    .then(resp => {
      if (!resp.ok) {
          return resp.json().then(error => {
              throw new Error(JSON.stringify(error.errors));
           
          });
      }
      return resp.json();
  })
  .then(data => {
    setApiMessage("Registration successful! You are now a prestigious member of FarmGuide family.");
    setRegistrationSuccess(true);
    dispatch({ type: 'reset' });
    setErrors({});
  })
  .catch(error => {
      console.error("Error:", error.message);
      setApiMessage("Registration failed! Values for 1 or more fields marked with * already exits.. replace them with unique values");
  });
  };


  return (
    <div className="login-card" style={{ top: 30 }}>
      <div className="bg-image" style={{ opacity: 0.7 }}></div>
      <h2>Wholesaler Registration</h2>
      <form className="login-form" onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:<span className="required">*</span></label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={info.username}
            onChange={(e) => handleFieldChange('username', e.target.value)}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">Password:</label>
          <input
            type={passwordType}
            className="form-control"
            id="pwd"
            name="pwd"
            value={info.pwd}
            onChange={(e) => handleFieldChange('pwd', e.target.value)}
            required
          />
          {errors.pwd && <p className="error-message">{errors.pwd}</p>}
        </div>
        <div className="mb-3">
          <input type='checkbox' checked={passwordType !== 'password'} onChange={togglePassword} />
          <label className='m-2'>Show Password</label>
        </div>

        <hr />
        <b><h5>Personal Details</h5></b>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={info.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            required
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={info.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            required
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="textarea"
            rows="5"
            className="form-control"
            id="address"
            name="address"
            value={info.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            required
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="gst_no" className="form-label">GST no:<span className="required">*</span></label>
          <input
            type="text"
            className="form-control"
            id="gst_no"
            name="gst_no"
            value={info.gst_no}
            onChange={(e) => handleFieldChange('gst_no', e.target.value)}
            required
          />
          {errors.gst_no && <p className="error-message">{errors.gst_no}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:<span className="required">*</span></label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={info.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="mobile_no" className="form-label">Mobile no:<span className="required">*</span></label>
          <input
            type="number"
            className="form-control"
            id="mobile_no"
            name="mobile_no"
            value={info.mobile_no}
            onChange={(e) => handleFieldChange('mobile_no', e.target.value)}
            required
          />
          {errors.mobile_no && <p className="error-message">{errors.mobile_no}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City:</label>
          <select
            id="city"
            className="form-select"
            value={info.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            required
          >
            <option value="">Select City</option>
            {city.map(c => (
              <option key={c.cityid} value={c.cityid}>{c.cityname}</option>
            ))}
          </select>
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>
        
        <div className="button-group">
          <button type="submit" className="btn btn-primary m-3">Register</button>
          <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
        </div>
      </form>

      {apiMessage && (
        <div className={`alert ${registrationSuccess ? 'alert-success' : 'alert-danger'} mt-3`}>
          {apiMessage}
        </div>
      )}
    </div>
  );
}
