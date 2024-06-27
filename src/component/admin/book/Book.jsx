import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Book = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState(
    [
      {
        "id": 1,
        "name": "Learning React",
        "author": "Alex Banks, Eve Porcello",
        "publishedYear": 2020,
        "rating": 4.5,
        "subcategory": "Programming",
        "category": "Technology",
        "stock": 15,
        "status": "Available",
        "imageUrl": "https://m.media-amazon.com/images/I/71GsZGf3opL._SL1500_.jpg"
      },
      {
        "id": 2,
        "name": "JavaScript: The Good Parts",
        "author": "Douglas Crockford",
        "publishedYear": 2008,
        "rating": 4.3,
        "subcategory": "Programming",
        "category": "Technology",
        "stock": 8,
        "status": "Available",
        "imageUrl": "path/to/image2.jpg"
      },
      {
        "id": 3,
        "name": "You Don't Know JS",
        "author": "Kyle Simpson",
        "publishedYear": 2015,
        "rating": 4.7,
        "subcategory": "Programming",
        "category": "Technology",
        "stock": 12,
        "status": "Out of Stock",
        "imageUrl": "path/to/image3.jpg"
      },
      {
        "id": 4,
        "name": "Clean Code",
        "author": "Robert C. Martin",
        "publishedYear": 2008,
        "rating": 4.8,
        "subcategory": "Software Development",
        "category": "Technology",
        "stock": 20,
        "status": "Available",
        "imageUrl": "path/to/image4.jpg"
      },
      {
        "id": 5,
        "name": "The Pragmatic Programmer",
        "author": "Andrew Hunt, David Thomas",
        "publishedYear": 1999,
        "rating": 4.6,
        "subcategory": "Software Development",
        "category": "Technology",
        "stock": 10,
        "status": "Available",
        "imageUrl": "path/to/image5.jpg"
      }
    ]


  );



  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Sách</h5>
        <Link
          className="btn btn-primary"
          to="/admin/book/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i className="bi bi-plus-lg"></i>
          <span className="m-2">Thêm</span>
        </Link>
      </div>
      <Table style={{ fontSize: 'small' }}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Thời gian sửa đổi</th>
            <th>Người sửa đổi</th>
            <th>Đánh giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="align-middle">
                <div className="d-flex align-items-center">
                  <img
                    src={book.imageUrl}
                    alt={book.name}
                    style={{ width: '70px', height: 'auto', marginRight: '20px' }}
                  />
                  <div>
                    {book.name}
                    <div style={{ fontSize: 'x-small' }}>{book.author}, {book.publishedYear}</div>
                  </div>
                </div>
              </td>
              <td className="align-middle">2021-09-01 </td>
              <td className="align-middle">Dien Nguyen</td>
              <td className="align-middle">{book.rating}/5.0</td>
              <td className="align-middle">
                {book.subcategory}
                <div style={{ fontSize: 'x-small' }}>{book.category}</div>
              </td>
              <td className="align-middle">{book.stock}</td>
              <td className="align-middle">{book.status}</td>
              <td className="align-middle">
                <Link
                  to={`/admin/book/detail/${book.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-journal-bookmark"></i>
                  <span className='m-1'>Chi tiết</span>
                </Link>
                <Link
                  to={`/admin/book/edit/${book.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none',
                    margin: '0 5px'
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                  <span className='m-1'>Sửa</span>
                </Link>
                <Link
                  to={`/admin/book/delete/${book.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-trash3"></i>
                  <span className='m-1'>Xóa</span>
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Book;