import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';
import '../../../assets/style/Style.css';
import { updateAuthor, getAuthors } from '../../../service/AuthorService'; 
import { useAuth } from '../../context/AuthContext';

const EditAuthor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { showError, showSuccess } = useNotification();
  const [nameAuthor, setNameAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuthors(); 
        if (response.status === 201) {
          const authorToEdit = response.data[0].authorList.find(author => author.id === parseInt(id));
          if (authorToEdit) {
            setNameAuthor(authorToEdit.name); 
            setDescription(authorToEdit.description);
            // co the xu ly anh o day
          } else {
            showError("Không tìm thấy tác giả");
           
          }
        } else {
          showError("Lỗi khi tải dữ liệu tác giả");
        }
      } catch (error) {
        showError("Lỗi khi tải dữ liệu tác giả");
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedAuthor = {
        nameAuthor: nameAuthor,
        description: description,
        modifiedById: user?.id 
        // neu co them truong image thi co the them vao day
      };
      await updateAuthor(id, updatedAuthor);
      showSuccess("Cập nhật tác giả thành công");
      navigate("/admin/author");
    } catch (error) {
      showError("Lỗi khi cập nhật tác giả");
    }
  };

  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Cập nhật tác giả</h5>
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
          <Form.Label>Mô tả</Form.Label>
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

export default EditAuthor;