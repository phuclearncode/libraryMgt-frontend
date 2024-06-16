import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthors, deleteAuthor } from '../../../service/AuthorService';
import CustomModal from '../../common/CustomModal';
import FormAuthor from '../../common/FormAuthor';

const Author = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  const [authors, setAuthors] = useState([
    // Demo authors
    { id: 1, name: 'J.K. Rowling', description: 'Author of the Harry Potter series' },
    { id: 2, name: 'Stephen King', description: 'Horror and fantasy writer' },
    { id: 3, name: 'Jane Austen', description: 'English novelist known for her social commentary' },
  ]);
  useEffect(() => {
    //fetchAuthors();
  }, []);

//   const fetchAuthors = async () => {
//     try {
//       const response = await getAuthors();
//       setAuthors(response.data);
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//     }
//   };

  const handleShowModal = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAuthor(null);
    setShowModal(false);
  };

  const handleSaveAuthor = (author) => {
    if (selectedAuthor) {
      // Update author
      setAuthors((prevAuthors) =>
        prevAuthors.map((prevAuthor) =>
          prevAuthor.id === selectedAuthor.id ? { ...author, id: selectedAuthor.id } : prevAuthor
        )
      );
    } else {
      // Add new author
      const newAuthor = { ...author, id: authors.length + 1 };
      setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
    }
    handleCloseModal();
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      await deleteAuthor(authorId);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleEditAuthor = (authorId) => {
    // Handle edit author logic
    return (
      navigate('/admin/author/edit/' + authorId)
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Quản lý tác giả</h5>
        <Link
          className="btn btn-primary"
          to="/admin/author/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i className="bi bi-plus-circle-fill"></i>
          <span className="m-2">Thêm</span>
        </Link>
      </div>
      <Table style={{ fontSize: 'small' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên tác giả</th>
            <th>Mô tả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.description}</td>
              <td>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleEditAuthor(author.id)}>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleDeleteAuthor(author.id)}>
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title={selectedAuthor ? 'Chỉnh sửa tác giả' : 'Thêm tác giả'}
      >
        <FormAuthor author={selectedAuthor} onSave={handleSaveAuthor} />
      </CustomModal>
    </div>
  );
};

export default Author;