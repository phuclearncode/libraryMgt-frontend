import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FormAuthor = ({ author, onSave }) => {
  // State to manage form input values
  const [name, setName] = useState(author?.name || ''); 
  const [description, setDescription] = useState(author?.description || '');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSave({ name, description }); // Pass the form data to the onSave function
  };

  return (
    <Form onSubmit={handleSubmit}> 
      <Row>
        <Col md={12}>
          <Form.Group controlId="formName">
            <Form.Label>Tên tác giả</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group controlId="formDescription">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default FormAuthor;