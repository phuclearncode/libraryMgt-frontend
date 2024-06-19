import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/style/Register.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext.js";
import Notification from "../../component/common/Notification";
import useNotification from "../../hooks/useNotification.js";

const Register = () => {
  const { register, sendOtp } = useAuth();
  const { showError, showSuccess } = useNotification();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  // xử lý send otp
    const send = async () => {
      try {
        const response = await sendOtp(formData.email);
        if (response.status === 200) {
          showSuccess(response.message);
        }
      } catch (error) {
        showError(error.message);
      }
    };


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
      showError('Vui lòng điền đầy đủ thông tin');
      
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError('Mật khẩu không khớp');      
      return;
    }

    try {
      const response = await register(formData);
      console.log("response", response);

      if (response.status === 201) {

        send();

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        navigate('/verify');
      }
    } catch (error) {
      showError(error);      
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
          <h6>Đăng ký tài khoản</h6>
          <div className="sub-title">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1">
            <Form.Label className="label">Họ và tên</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Nhập họ và tên"
              style={{ fontSize: "small" }}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Nhập email"
              name="email"
              style={{ fontSize: "small" }}
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label className="label">Mật khẩu</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập mật khẩu"
              style={{ fontSize: "small" }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">Xác nhận mật khẩu</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập lại mật khẩu"
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
              Đăng ký
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
