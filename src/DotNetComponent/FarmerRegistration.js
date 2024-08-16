import React, { useState, useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/LoginPage.css"

export default function FarmerRegistration() {
  const init = {
    firstName: "",
    lastName: "",
    address: "",
    cityid: "",
    aadhar_no: "",
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

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'update', fld: field, val: value });

    // Clear the specific error
    if (errors[field]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!info.firstName) errors.firstName = "First Name is required";
    if (!/^[A-Z]{1}[a-zA-Z]{0,19}$/.test(info.firstName)) errors.firstName = "First Name must start with capital letter and only contain letters!";
    if (!info.lastName) errors.lastName = "Last Name is required";
    if (!/^[A-Z]{1}[a-zA-Z]{0,19}$/.test(info.lastName)) errors.lastName = "Last Name must start with capital letter and only contain letters!";
    if (!info.address) errors.address = "Address is required";
    if (!/^[a-zA-Z0-9\s,'/.-]{15,50}$/.test(info.address)) errors.address = "Address must contain characters only between 15 to 50!";
    if (!info.cityid) errors.cityid = "City is required";
    if (!info.aadhar_no) errors.aadhar_no = "Aadhar number is required";
    if (!/^\d{12}$/.test(info.aadhar_no)) errors.aadhar_no = "Aadhar Number can contain only 12 digits!";
    if (!info.email) errors.email = "Email is required";
    if (!/^[\w#.-]{5,15}@[\w]{5,15}\.[a-z]{2,3}$/.test(info.email)) errors.email = 'Email must be of type "(5-15 c)@(5-15 c).(2 or 3 c)" (c = characters)';
    if (!info.mobile_no) errors.mobile_no = "Mobile number is required";
    if (!/^\d{10}$/.test(info.mobile_no)) errors.mobile_no = "Mobile number must be of 10 digits";
    if (!info.username) errors.username = "Username is required";
    if (!/^[A-Za-z]{1}[A-Za-z0-9]{5,12}$/.test(info.username)) errors.username = "Username must be of 5 to 12 characters with only alphabets and digits!";
    if (!info.pwd) errors.pwd = "Password is required";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/.test(info.pwd)) errors.pwd = "Password must contain at least 1 capital, 1 small letter, 1 digit, 1 special character and should be of length 6-12 only!";
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
      fname: info.firstName,
      lname: info.lastName,
      address: info.address,
      cityid: info.cityid,
      aadharNo: info.aadhar_no,
      email: info.email,
      mobileNo: info.mobile_no,
      uidNavigation: {
        username: info.username,
        pwd: info.pwd,
        rid: 1,
        status: 1
      }
    };

    const reqdata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    };

    fetch("https://localhost:7219/api/Farmer/SaveFarmer", reqdata)
      .then(resp => {
        if (!resp.ok) {
          return resp.json().then(error => {
            throw new Error(JSON.stringify(error.error));
          });
        }
        return resp.json();
      })
      .then(data => {
        console.log("Success:", data);
        dispatch({ type: 'reset' });
        setErrors({});
        setRegistrationSuccess(true);
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  }

  return (
    <div className="login-card" style={{ top: 30 }}>
      <div className="bg-image" style={{ opacity: 0.7 }}></div>
      <h2>Farmer Registration</h2>
      <form className="login-form" onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
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
            className="form-control"
            id="address"
            rows="5"
            name="address"
            value={info.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            required
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="aadhar_no" className="form-label">Aadhar no:</label>
          <input
            type="text"
            className="form-control"
            id="aadhar_no"
            name="aadhar_no"
            value={info.aadhar_no}
            onChange={(e) => handleFieldChange('aadhar_no', e.target.value)}
            required
          />
          {errors.aadhar_no && <p className="error-message">{errors.aadhar_no}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
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
          <label htmlFor="mobile_no" className="form-label">Mobile no:</label>
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
          <label htmlFor="cityid" className="form-label">City:</label>
          <select
            id="cityid"
            className="form-select"
            value={info.cityid}
            onChange={(e) => handleFieldChange('cityid', e.target.value)}
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

      {registrationSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Registration Successful! You are now a prestigious member of FarmGuide family.
        </div>
      )}
    </div>
  );
};
