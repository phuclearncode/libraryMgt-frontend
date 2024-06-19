import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import '../../assets/style/ForgotPassword.css';
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";

const ForgotPassword = () => {
  const { forgotPassword, sendOtp } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: ""
  });

  // xử lý send otp
  const send = async () => {
    try {
      const response = await sendOtp(formData.email);
      console.log("response", response);
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
    const { email} = formData;
    if (!email) {
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
      const response = await forgotPassword(formData.email);
      console.log("response", response);
      if (response.status === 200) {
        send();
        navigate("/resetpassword");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
    }

  };






  return (
    <div className="forgot-pw-container">
      <Notification />
      <div className="forgot-pw">
        <div className="forgot-pw-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="forgot-pw-title">
          <h6>Quên mật khẩu</h6>
          <div className="sub-title">
            Vui lòng nhập email đăng ký của bạn
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Nhập email"
              style={{ fontSize: "small" }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex">
            <Link to="/login" className="btn-back-login">
              <span>Quay lại</span>
            </Link>
            <Button
              className="btn-create-pw"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
            >
              Tạo lại mật khẩu
            </Button>
          </Form.Group>
        </Form>


      </div>
    </div>
  );
};

export default ForgotPassword;