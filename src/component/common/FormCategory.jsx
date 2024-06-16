import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FormCategory = ({ category, onSave }) => {
  const [name, setName] = useState(category ? category.name : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ name });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
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
          Lưu
        </Button>
      </div>
    </Form>
  );
};

export default FormCategory;