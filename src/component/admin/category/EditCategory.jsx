import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../../service/CategoryService';

const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await getCategoryById(categoryId);
      setId(response.data.id);
      setName(response.data.name);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCategory(categoryId, { id, name });
      navigate('/admin/category');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Chỉnh sửa danh mục</h5>
        <Link
          className="btn btn-primary"
          to="/admin/category"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i className="bi bi-arrow-left-circle-fill"></i>
          <span className="m-2">Quay lại</span>
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <Button variant="primary" type="submit" style={{ marginTop: '20px', fontSize: 'small', backgroundColor: '#F87555', border: 'none' }}>
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditCategory;