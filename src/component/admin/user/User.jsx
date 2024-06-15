import React, { useState } from 'react'
import NavBar from '../../common/NavBar';
import TopNav from '../../common/TopNav';
import { Row, Col, Table, Button } from 'react-bootstrap';
import CustomModal from '../../common/CustomModal';
import FormUser from '../../common/FormUser';
import { Link } from 'react-router-dom';


const User = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalTitle = "Update User";

  const handleSave = () => {
    handleClose();
  };

  return (
    <div style={{ marginTop: '50px', paddingRight: '10px' }}>
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
          <i class="bi bi-person-plus-fill"></i>
          <span className='m-2'>Thêm</span>
        </Link>
      </div>
      <Table
        style={{
          fontSize: 'small'
        }}
      >
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Mật khẩu</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dien Nguyen</td>
            <td>diennvhe171038@fpt.edu.vn</td>
            <td>*********</td>
            <td>LIBRARIAN</td>
            <td>Đã xác thực</td>
            <td><Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={handleShow}><i class="bi bi-three-dots-vertical"></i></Button></td>
          </tr>
          <tr>
            <td>Dien Nguyen</td>
            <td>diennvhe171038@fpt.edu.vn</td>
            <td>*********</td>
            <td>LIBRARIAN</td>
            <td>Đã xác thực</td>
            <td><Button style={{ fontSize: 'small' }} variant="outline-danger" >Cập nhật</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default User