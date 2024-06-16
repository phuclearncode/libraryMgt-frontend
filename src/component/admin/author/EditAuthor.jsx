import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuthorById, updateAuthor } from '../../../service/AuthorService'; // Import functions

const EditAuthor = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();
  const [id, setId] = useState(''); // Add id state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await getAuthorById(authorId);
      setId(response.data.id); // Set initial id from response
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateAuthor(authorId, { id, name, description }); // Send id with data
      navigate('/admin/author');
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Chỉnh sửa tác giả</h5>
        <Link
          className="btn btn-primary"
          to="/admin/author"
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
                disabled // Disable the ID field
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditAuthor;