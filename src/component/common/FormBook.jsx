import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormBook = ({ book, onSave }) => {
  const [isbn, setIsbn] = useState(book ? book.isbn : '');
  const [title, setTitle] = useState(book ? book.title : '');
  // Add more state variables for other book properties

  const handleSave = () => {
    const newBook = {
      isbn,
      title,
      // Add more book properties based on the form fields
    };

    onSave(newBook);
  };

  return (
    <Form>
      <Form.Group controlId="formIsbn">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formTitle">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      {/* Add more form fields for other book properties */}

      <Button variant="primary" onClick={handleSave}>
        {book ? 'Chỉnh sửa' : 'Thêm'}
      </Button>
    </Form>
  );
};

export default FormBook;