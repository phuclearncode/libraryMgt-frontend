import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; // Import icon

const EditBook = () => {
  const navigate = useNavigate();
  const { isbn } = useParams();
  
  const [book, setBook] = useState({});

  // Get the book from the backend based on the isbn
  React.useEffect(() => {
    fetch(`/api/books/${isbn}`)
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [isbn]);

  const UploadArea = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the book in the backend
    fetch(`/api/books/${isbn}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Book updated:', data);
        navigate('/admin/book'); // Redirect to the book list page after submission
      });
  };

  const handleImageChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      handleImageChange({ target: { files: acceptedFiles } });
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Chỉnh sửa sách</h5>
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
              <Form.Control type="text" value={book.isbn} readOnly />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={book.price}
                onChange={(e) => setBook({ ...book, price: e.target.value })}
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
                value={book.totalPages}
                onChange={(e) => setBook({ ...book, totalPages: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStock">
              <Form.Label>Tồn kho</Form.Label>
              <Form.Control
                type="number"
                value={book.stock}
                onChange={(e) => setBook({ ...book, stock: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLanguage">
              <Form.Label>Ngôn ngữ</Form.Label>
              <Form.Control
                type="text"
                value={book.language}
                onChange={(e) => setBook({ ...book, language: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPublisher">
              <Form.Label>Nhà xuất bản</Form.Label>
              <Form.Control
                type="text"
                value={book.publisher}
                onChange={(e) => setBook({ ...book, publisher: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                type="text"
                value={book.category}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Năm sản xuất</Form.Label>
              <Form.Control
                type="number"
                value={book.year}
                onChange={(e) => setBook({ ...book, year: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                type="text"
                value={book.status}
                onChange={(e) => setBook({ ...book, status: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAuthor">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <Button variant="primary" type="submit" style={{ marginTop: '20px', fontSize: 'small', backgroundColor: '#F87555', border: 'none' }}>
            Chỉnh sửa
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditBook;