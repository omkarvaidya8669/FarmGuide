import React, { useState, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ContactUs.css';

export default function ContactUs() {
  const init = {
    name: '',
    email: '',
    message: ''
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

  const [info, dispatch] = useReducer(reducer, init);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);


  const validate = () => {
    const errors = {};
    if (!info.name) errors.name = "Name is required";
    if (!/^[A-Z][a-zA-Z\s]{0,19}$/.test(info.name)) errors.name = "Name must start with captial letter and only contain letters!"
    if (!info.message) errors.message = "Message is required";
    if (!/^[a-zA-Z0-9\s,'/!.-]{5,100}$/.test(info.message)) errors.message = "Message must contain characters only between 5 to 100!"
    if (!info.email) errors.email = "Email is required";
    if (!/^[\w#.-]{5,15}@[\w]{5,15}\.[a-z]{2,3}$/.test(info.email)) errors.email = 'Email must be of type "(5-15 c)@(5-15 c).(2 or 3 c)" (c = characters)';
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
      name: info.name,
      message: info.message,
      email: info.email,
    };

    const reqdata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    };

    console.log(dataToSend);

    fetch("http://localhost:8080/insertcontactdetail", reqdata)
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
        console.log("Success:", data);
        dispatch({ type: 'reset' }); 
        setErrors({}); 
      })
      .catch(error => {
        setSuccess(false); 
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="login-card" style={{top:30}}>
      <div className="bg-image" style={{ opacity: 0.7 }}></div>
      <h2>Contact Us</h2>
      <p>We would love to hear from you! Please fill out this form and we'll get in touch with you shortly.</p>
      <form onSubmit={sendData} className="contact-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={info.name}
            onChange={(e) => dispatch({ type: 'update', fld: 'name', val: e.target.value })}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={info.email}
            onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={info.message}
            onChange={(e) => dispatch({ type: 'update', fld: 'message', val: e.target.value })}
            required
          ></textarea>
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {success && (
        <div className="alert alert-success mt-3">Thank you for contacting us! We'll get back to you soon.</div>)}
    </div>
  );
}
