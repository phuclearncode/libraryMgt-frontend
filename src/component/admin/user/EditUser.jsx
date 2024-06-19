import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import '../../../assets/style/User.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getUserById, updateUser } from '../../../service/UserService'
import useNotification from '../../../hooks/useNotification'
import Notification from '../../common/Notification'

const AddUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showError } = useNotification();
    const [user, setUser] = useState({});
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserById(id);
                setUser(user.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordData({ ...passwordData, [name]: value });
        } else {
            setUser({ ...user, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedUser = { ...user };
            if (passwordData.password && passwordData.confirmPassword) {
                if (passwordData.password !== passwordData.confirmPassword) {
                    showError('Mật khẩu không khớp');
                    return;
                }
                updatedUser.password = passwordData.password;
            }

            const response = await updateUser(id, updatedUser);
            if (response.status === 200) {
                navigate('/admin/user', { state: { success: response.message } });
            }

        } catch (error) {
            console.error('Error updating user:', error);
            showError('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };



    return (
        <div style={{ margin: '0 200px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h5 >Thêm người dùng</h5>
            </div>
            <Notification />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="label">Họ tên</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="Nguyen Van A"
                        style={{ fontSize: "small" }}
                        name="fullName"
                        value={user.fullName}
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
                        value={user.email}
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
                            value={user.phoneNumber}
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
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option
                                value="MEMBER"
                                style={{ fontSize: "small" }}
                                defaultValue={user.role === "MEMBER"}
                            >
                                Thành viên
                            </option>
                            <option
                                value="LIBRARIAN"
                                style={{ fontSize: "small" }}
                                defaultValue={user.role === "LIBRARIAN"}
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
                            value={user.status}
                            onChange={handleChange}
                        >
                            <option
                                value="ACTIVE"
                                style={{ fontSize: "small" }}
                                defaultValue={user.status === "ACTIVE"}
                            >
                                Đã kích hoạt
                            </option>
                            <option
                                value="INACTIVE"
                                style={{ fontSize: "small" }}
                                defaultValue={user.status === "INACTIVE"}
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
                                value={passwordData.password}
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
                                value={passwordData.confirmPassword}
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