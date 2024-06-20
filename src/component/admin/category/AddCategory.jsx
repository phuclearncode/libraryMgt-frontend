import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can use the state variables (id, name) to send data to your backend
    console.log('Form submitted:', { id, name });
    navigate('/admin/category'); // Redirect to the category list page after submission
  };

  return (
    <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Thêm danh mục</h5>
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
            Thêm
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddCategory;