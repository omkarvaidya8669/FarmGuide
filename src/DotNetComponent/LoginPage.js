import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./Slice";
import "../css/LoginPage.css";

export default function LoginComponent() {
    const init = {
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

    const [passwordType, setPasswordType] = useState('password');
    const [info, dispatch] = useReducer(reducer, init);
    const [validationMsg, setValidationMsg] = useState({});
    const [generalMsg, setGeneralMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const reduxAction = useDispatch();

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const validate = () => {
        let errors = {};
        if (!info.username.trim()) {
            errors.username = "Username is required!";
        }
        if (!info.pwd) {
            errors.pwd = "Password is required!";
        }
        return errors;
    };

    const handleInputChange = (field, value) => {
        dispatch({ type: 'update', fld: field, val: value });
        setValidationMsg(prev => ({ ...prev, [field]: "" }));
        setGeneralMsg(""); // Clear general error message on input change
    };

    const sendData = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setValidationMsg(validationErrors);
            return;
        }

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        };

        fetch("https://localhost:7219/api/User/VerifyLogin", reqdata)
            .then(resp => {
                if (resp.status === 401) {
                    throw new Error("Invalid username or password!");
                }
                if (!resp.ok) {
                    throw new Error("An error occurred while verifying login.");
                }
                return resp.json();
            })
            .then(obj => {
                if (Object.keys(obj).length === 0) {
                    throw new Error("Invalid username or password!");
                } else {
                    reduxAction(login());
                    localStorage.setItem("LoggedUser", JSON.stringify(obj));
                    setSuccessMsg("Login successful! Redirecting...");
                    setTimeout(() => {
                        switch (obj.rid) {
                            case 1:
                                navigate("/farmer/home");
                                break;
                            case 2:
                                navigate("/wholesaler/home");
                                break;
                            case 3:
                                navigate("/admin/home");
                                break;
                            default:
                                navigate("/");
                                break;
                        }
                    }, 2000);
                }
            })
            .catch(error => {
                setGeneralMsg(error.message);
            });
    };

    return (
        <div className="login-card" style={{ top: 30 }}>
            <div className="bg-image" style={{ opacity: 0.7 }}></div>
            <h1 className="login-title">Login</h1>
            <div className="login-form-container">
                <form className="login-form" onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={info.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                        {validationMsg.username && <p className="error-message">{validationMsg.username}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password:</label>
                        <input
                            type={passwordType}
                            className="form-control"
                            id="pwd"
                            name="pwd"
                            value={info.pwd}
                            onChange={(e) => handleInputChange('pwd', e.target.value)}
                        />
                        {validationMsg.pwd && <p className="error-message">{validationMsg.pwd}</p>}
                    </div>
                    <div>
                        <input type='checkbox' checked={passwordType !== 'password'} onChange={togglePassword} />
                        <label className='m-2'>Show Password</label>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary m-3">Login</button>
                        <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
                    </div>
                </form>
                {generalMsg && <p className="error-message">{generalMsg}</p>}
                {successMsg && <p className="success-message">{successMsg}</p>}
            </div>
        </div>
    );
}
