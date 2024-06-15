import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/style/Register.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of Redirect
import { useAuth } from "../context/AuthContext.js";
import Notification from "../../component/common/Notification";
import useNotification from "../../hooks/useNotification.js";

const Register = () => {
  const { register } = useAuth();
  const { showError } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;
    if (!fullName || !email || !password || !confirmPassword) {
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

    if (formData.password !== formData.confirmPassword) {
      showError('Error', 'Passwords do not match');      
      return;
    }

    try {
      const response = await register(formData);
      console.log("response", response);

      if (response.status === 201) {

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        navigate('/verify');
      }
    } catch (error) {
      showError('Error', error);      
    }
    
  };

  return (
    <div className="register-container">
      <Notification />
      <div className="register">
        <div className="register-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="register-title">
          <h6>Registration</h6>
          <div className="sub-title">
            Do have an account ? <Link to="/login">Login here</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Full name</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Full name"
              style={{ fontSize: "small" }}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">College Email ID</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Email"
              name="email"
              style={{ fontSize: "small" }}
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
          <Form.Group className="mb-3">
            <Form.Label className="label">Confirm Password</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              style={{ fontSize: "small" }}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              className="btn-register"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
