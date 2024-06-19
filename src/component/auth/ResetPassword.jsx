import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import '../../assets/style/ResetPassword.css';
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";

const ResetPassword = () => {
  const { resetPassword, resend } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const validateForm = () => {
    const { otp, newPassword, confirmPassword } = formData;
    if (!otp || !newPassword || !confirmPassword) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    console.log("formData", formData)
    e.preventDefault();
    if (!validateForm()) {
      showError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await resetPassword(formData.otp, email, formData.newPassword);
      
      console.log("response", response);
      if (response.status === 200) {
        navigate("/login", { state: { message: response.message } });
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setResendLoading(true);

    try {
      const response = await resend(email);
      if (response.status === 200) {
        showSuccess(response.message);
      }
    } catch (error) {
      showError(error);
    } finally {
      setResendLoading(false);
    }
  };


  return (
    <div className="reset-pw-container">
      <Notification />
      <div className="reset-pw">
        <div className="reset-pw-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="reset-pw-title">
          <h6>Thay đổi mật khẩu</h6>
          <div className="sub-title">
            Bạn chưa nhận được mã?
            <Link
              to="/verify"
              onClick={handleResendOtp}
              disabled={resendLoading}
              style={{ cursor: resendLoading ? "not-allowed" : "pointer" }}
            >
              {resendLoading ? "Đang gửi..." : "Gửi lại mã"}
            </Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1">
            <Form.Label className="label">Mã xác nhận</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Nhập mã xác nhận"
              style={{ fontSize: "small" }}
              name="otp"
              value={formData.otp}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label className="label">Mật khẩu mới</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập mật khẩu mới"
              style={{ fontSize: "small" }}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label className="label">Nhập lại mật khẩu mới</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              style={{ fontSize: "small" }}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <div className="d-flex">
              <Link to="/forgotpassword" className="btn-back-forgot">Quay lại</Link>
              <Button
                className="btn-update-pw"
                type="submit"
                style={{
                  backgroundColor: '#F87555',
                  border: 'none',
                  fontSize: 'small'
                }}
              >
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form.Group>


        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;