import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Button, Dropdown } from 'react-bootstrap';
import CustomModal from '../../common/CustomModal';
import FormUser from '../../common/FormUser';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUsersByRole } from '../../../service/UserService';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';


const User = () => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const modalTitle = "Update User";

  // const handleSave = () => {
  //   handleClose();
  // };


  const [users, setUsers] = useState([]);
  const { showSuccess } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.success) {
      showSuccess(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsersByRole();
        setUsers(usersData.data);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Users: ", users);

  return (

    <div >
      
      <div className='d-flex justify-content-between' style={{ marginBottom: '20px' }}>
        <h5 >Người dùng</h5>
        <Link
          className='btn btn-primary'
          to="/admin/user/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none'
          }}
        >
          <i className="bi bi-person-plus"></i>
          <span className='m-2'>Thêm</span>
        </Link>
      </div>
      <Notification />
      <Table
        style={{
          fontSize: 'small',
          border: '1px solid #DEDEE1',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái tài khoản</th>
            <th>Trạng thái xác thực</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>{user.status == 'ACTIVE' ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</td>
              <td>{user.verified == true ? 'Đã xác thực' : 'Chưa xác thực'}</td>
              <td>
                <Link
                  to={`/admin/user/edit/${user.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-pen"></i>
                  <span className='m-2'>Sửa</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User