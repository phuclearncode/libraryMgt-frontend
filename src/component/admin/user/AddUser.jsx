import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import '../../../assets/style/Style.css'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../../common/Notification'
import useNotification from '../../../hooks/useNotification'
import { addUser } from '../../../service/UserService'

const AddUser = () => {
    const { showError } = useNotification();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "MEMBER",
        status: "ACTIVE"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const validateForm = () => {
        const { fullName, email, phoneNumber} = formData;
        if (!fullName || !email || !phoneNumber) {
            return false;
        }
        return true;
    }

    

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
            const response = await addUser(formData);
            console.log("response", response);
            console.log("response.status", response.status);
            console.log("response.message", response.message);

            if (response.status === 201) {
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                    role: "MEMBER",
                    status: "ACTIVE"
                });

                navigate('/admin/user', { state: { success: response.message }});
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            showError('Có lỗi xảy ra khi thêm người dùng');
        }



    }

    

    return (
        <div style={{ margin: '0 200px' }}>
            <Notification />
            <div style={{ marginBottom: '20px' }}>
                <h5 >Thêm người dùng</h5>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="label">Họ tên</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="Nguyen Van A"
                        style={{ fontSize: "small" }}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="email@example.com"
                        style={{ fontSize: "small" }}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="label">Số điện thoại</Form.Label>
                        <Form.Control
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small" }}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label className="label">Vai trò</Form.Label>
                        <Form.Select
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small" }}
                            name="role"
                            value={formData.role}
                            handleChange={handleChange}
                        >
                            <option
                                value="MEMBER"
                                style={{ fontSize: "small" }}
                            >
                                Thành viên
                            </option>
                            <option 
                                value="LIBRARIAN"
                                style={{ fontSize: "small" }}
                            >
                                Thủ thư
                            </option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label className="label">Trạng thái</Form.Label>
                        <Form.Select
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small" }}
                            name="status"
                            value={formData.status}
                            handleChange={handleChange}
                        >
                            <option
                                value="ACTIVE"
                                style={{ fontSize: "small" }}
                            >
                                Đã kích hoạt
                            </option>
                            <option 
                                value="INACTIVE"
                                style={{ fontSize: "small" }}
                            >
                                Chưa kích hoạt
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <hr style={{ border: '1px solid #DEE2E6', marginBottom: '30px' }} />

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Mật khẩu</Form.Label>
                            <Form.Control
                                className="field-input"
                                type="password"
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
                                style={{ fontSize: "small" }}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Group>



                    <Form.Group as={Col}>
                        <Form.Label className="label">Yêu cầu mật khẩu</Form.Label>
                        <p style={{ fontSize: "small" }}>Để tạo mật khẩu, bạn phải đáp ứng tất cả các yêu cầu sau:</p>
                        <ul style={{ fontSize: "small" }}>
                            <li>Mật khẩu phải chứa ít nhất 8 ký tự</li>
                            <li>Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa</li>
                            <li>Mật khẩu phải chứa ít nhất 1 chữ cái viết thường</li>
                            <li>Mật khẩu phải chứa ít nhất 1 số</li>
                        </ul>
                    </Form.Group>
                </Row>


                <Button
                    type="submit"
                    style={{
                        fontSize: 'small',
                        backgroundColor: '#F87555',
                        border: 'none'
                    }}>
                    Lưu thay đổi
                </Button>
            </Form>

        </div>
    )
}

export default AddUser