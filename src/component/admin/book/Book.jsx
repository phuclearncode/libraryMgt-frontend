import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import CustomModal from '../../common/CustomModal';
import FormBook from '../../common/FormBook';
import { getAllBooks, addBook, updateBook, deleteBook } from '../../../service/BookService';

const Book = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  // const [books, setBooks] = useState([
    // {
    //   id: 1,
    //   isbn: '9781234567890',
    //   title: 'Sách 1',
    //   image: 'book1.png',
    //   price: 29.99,
    //   totalPages: 300,
    //   language: 'Tiếng Việt',
    //   publisher: 'Nhà xuất bản ABC',
    //   category: 'Danh mục 1',
    //   year: 2022,
    //   status: 'Còn sách',
    //   stock: 10,
    //   author: 'Tác giả 1',
    // },
    // {
    //   id: 2,
    //   isbn: '9780987654321',
    //   title: 'Sách 2',
    //   image: 'book2.png',
    //   price: 19.99,
    //   totalPages: 250,
    //   language: 'Tiếng Anh',
    //   publisher: 'Nhà xuất bản XYZ',
    //   category: 'Danh mục 2',
    //   year: 2021,
    //   status: 'Đã mượn',
    //   stock: 5,
    //   author: 'Tác giả 2',
    // },
  // ]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }

    };

    fetchBooks();
  }, []);
  
  console.log(books);

 

  // const handleShowModal = (book) => {
  //   setSelectedBook(book);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setSelectedBook(null);
  //   setShowModal(false);
  // };

  // const handleSaveBook = (book) => {
  //   if (selectedBook) {
  //     // Update book
  //     setBooks((prevBooks) =>
  //       prevBooks.map((prevBook) =>
  //         prevBook.id === selectedBook.id ? { ...book, id: selectedBook.id } : prevBook
  //       )
  //     );
  //   } else {
  //     // Add new book
  //     const newBook = { ...book, id: books.length + 1 };
  //     setBooks((prevBooks) => [...prevBooks, newBook]);
  //   }
  //   handleCloseModal();
  // };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = (isbn) => {
    // Handle edit book logic
    return (
      navigate('/admin/book/edit-book/' + isbn)
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Quản lý sách</h5>
        <Link
          className="btn btn-primary"
          to="/admin/book/add"
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
            <th>ISBN</th>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Tổng trang</th>
            <th>Ngôn ngữ</th>
            <th>Nhà sản xuất</th>
            <th>Chủ đề</th>
            <th>Năm sản xuất</th>
            <th>Trạng thái</th>
            <th>Tồn kho</th>
            <th>Tác giả</th>
            <th>Danh mục</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.image}</td>
              <td>{book.price}</td>
              <td>{book.totalPages}</td>
              <td>{book.language}</td>
              <td>{book.publisher}</td>
              <td>{book.category}</td>
              <td>{book.year}</td>
              <td>{book.status}</td>
              <td>{book.stock}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleEditBook(book.isbn)}>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleDeleteBook(book.id)}>
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title={selectedBook ? 'Chỉnh sửa sách' : 'Thêm sách'}
      >
        <FormBook book={selectedBook} onSave={handleSaveBook} />
      </CustomModal> */}
    </div>
  );
};

export default Book;