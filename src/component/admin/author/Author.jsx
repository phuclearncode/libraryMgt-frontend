import React, { useState} from 'react';
import { Table} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Author = () => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([
    { id: 1, name: 'J.K. Rowling', description: 'Author of the Harry Potter series' },
    { id: 2, name: 'Stephen King', description: 'Horror and fantasy writer' },
    { id: 3, name: 'Jane Austen', description: 'English novelist known for her social commentary' },
  ]);


  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Tác giả</h5>
        <Link
          className="btn btn-primary"
          to="/admin/author/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i class="bi bi-plus-lg"></i>
          <span className="m-2">Thêm</span>
        </Link>
      </div>
      <Table style={{ fontSize: 'small' }}>
        <thead>
          <tr>
            <th>Tác giả</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td className="align-middle">{author.name}</td>
              <td className="align-middle">{author.description}</td>
              <td className="align-middle">
                <Link
                  to={`/admin/author/edit/${author.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-pen"></i>
                  <span className='m-2'>Sửa</span>
                </Link>
                <Link
                  to={`/admin/author/delete/${author.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                  <i class="bi bi-trash3"></i>
                  <span className='m-2'>Xóa</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Author;
