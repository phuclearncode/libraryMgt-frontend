import React, { useState } from 'react';
import { Form, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; // Import icon
import styled from 'styled-components';
export default function AddBook() {
  const navigate = useNavigate();
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [language, setLanguage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [stock, setStock] = useState('');
  const [author, setAuthor] = useState('');

  const UploadArea = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

  const categoryOptions = ['Danh mục 1', 'Danh mục 2']; // Array for category dropdown options
  const statusOptions = ['Còn sách', 'Đã mượn']; // Array for status dropdown options
  const authorOptions = ['Tác giả 1', 'Tác giả 2']; // Array for author dropdown options

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can use the state variables (isbn, title, image, etc.) to send data to your backend
    console.log('Form submitted:', {
      isbn,
      title,
      image,
      price,
      totalPages,
      language,
      publisher,
      category,
      year,
      status,
      stock,
      author,
    });
    navigate('/admin/book'); // Redirect to the book list page after submission
  };

  return (
     <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Thêm sách</h5>
        <Link
          className="btn btn-primary"
          to="/admin/book"
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
            <Form.Group controlId="formIsbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage">
        <Form.Label>Hình ảnh</Form.Label>
        <UploadArea {...getRootProps()}>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faUpload} />
          <p>Kéo và thả hình ảnh vào đây hoặc nhấp vào đây để tải lên</p>
        </UploadArea>
      </Form.Group>

            <Form.Group controlId="formTotalPages">
              <Form.Label>Tổng số trang</Form.Label>
              <Form.Control
                type="number"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStock">
              <Form.Label>Tồn kho</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLanguage">
              <Form.Label>Ngôn ngữ</Form.Label>
              <Form.Control
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPublisher">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Năm sản xuất</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAuthor">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control as="select" value={author} onChange={(e) => setAuthor(e.target.value)}>
                {authorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>

        <Button variant="primary" type="submit" style={{ marginTop: '20px' , fontSize: 'small', backgroundColor: '#F87555', border: 'none'}}>
          Thêm
        </Button>

        </div>

      </Form>

    </>
  );
}