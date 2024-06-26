import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { addAuthor } from '../../../service/AuthorService';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';
import '../../../assets/style/Style.css';
import { useAuth } from '../../context/AuthContext';

const AddAuthor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [nameAuthor, setNameAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAuthor = {
        nameAuthor: nameAuthor,
        description: description,
        modifiedById: user?.id // Assuming you have user authentication
      };

      const response = await addAuthor(newAuthor); 
      if (response && response.status === 201) { 
        showSuccess("Thêm tác giả thành công");
        navigate('/admin/author');
      } else {
        showError(response?.data?.message || "Thêm tác giả thất bại"); 
      }
    } catch (error) {
      showError("Lỗi thêm tác giả: " + error.message);
    }
  };

  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Thêm tác giả</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="label">Tác giả</Form.Label>
          <Form.Control
            className="field-input"
            type="text"
            placeholder="Nhập tên tác giả"
            style={{ fontSize: "small" }}
            name="nameAuthor"
            value={nameAuthor}
            onChange={(e) => setNameAuthor(e.target.value)}
          />
          <Form.Control type="file" size="sm" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: 'small' }}>Mô tả</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

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
  );
};

export default AddAuthor;