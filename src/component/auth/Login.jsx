
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/style/Login.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import {useAuth} from "../context/AuthContext.js";


const Login = () => {
  const { login, isMember } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showError('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await login(formData);
      console.log("response", response);
      if (response.status === 200) {
        if (isMember()) {
          navigate("/");
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log("Error logging in:", error);
      
      showError('Error', error);
    }

  };

  // const handleGoogleLoginSuccess = async (response) => {
  //   try {
  //     const { credential } = response;
  //     const googleUser = await oAuth2Login(credential);
  //     if (googleUser.status === 200) {
  //       if (isMember()) {
  //         navigate("/");
  //       } else {
  //         navigate("/admin");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error logging in with Google:", error);
  //     showError('Error', error.message);
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.error("Google login failed:", error);
  //   showError('Error', 'Google login failed');
  // };

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/login/oauth2/code/google';
};



  return (
    <div className="login-container">
      <Notification />
      <div className="login">
        <div className="login-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-title">
          <h6>Welcome back !</h6>
          <div className="sub-title">
            Don't have an account ? <Link to="/register">Register here</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Email"
              style={{ fontSize: "small" }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Password"
              style={{ fontSize: "small" }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="forgot-password">
            <a href="/">Forgot password?</a>
          </div>
          <Form.Group className="mb-3">
            <Button
              className="btn-login"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
        <div className="or">Or</div>
        <a onClick={handleLogin} className="btn-login-google">
          <i className="bi bi-google"></i>
          <span className="mx-2">Login with Google</span>
        </a>

      </div>
    </div>
  );
}

export default Login;
