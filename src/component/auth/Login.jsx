
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/style/Login.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";


const Login = () => {
  const { login, isMember, sendOtp } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      showSuccess(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
    const { email, password } = formData;
    if (!email || !password) {
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

    try {
      const response = await login(formData);
      console.log("response", response);
      if (response.status === 200) {
        if (isMember()) {
          navigate("/");
        } else {
          navigate("/admin");
        }
      } else if (response.status === 302) {
        send();
        navigate("/verify");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
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
  //     showError(error.message);
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.error("Google login failed:", error);
  //   showError('Google login failed');
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
          <h6>Đăng nhập</h6>
          <div className="sub-title">
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Nhập email"
              style={{ fontSize: "small" }}
              name="email"
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
          <div className="forgot-password">
            <Link to="/forgotpassword">Quên mật khẩu?</Link>
          </div>
          <Form.Group className="mb-1">
            <Button
              className="btn-login"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Group>
        </Form>
        <div className="or">Hoặc đăng nhập bằng</div>
        <div className="d-flex justify-content-center align-items-center">
          <Link onClick={handleLogin} className="btn-login-google">
            <i className="bi bi-google"></i>
          </Link>
        </div>


      </div>
    </div>
  );
}

export default Login;
