import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', description: 'Fictional works', parent_id: null },
    { id: 2, name: 'Non-fiction', description: 'Non-fictional works', parent_id: null },
    { id: 3, name: 'Fantasy', description: 'Fantasy books', parent_id: 1 },
    { id: 4, name: 'Science Fiction', description: 'Sci-fi books', parent_id: 1 },
    { id: 5, name: 'Biographies', description: 'Biographies and memoirs', parent_id: 2 },
  ]);

  const findCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };


  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Danh mục</h5>
        <Link
          className="btn btn-primary"
          to="/admin/category/add"
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
            <th>Danh mục</th>
            <th>Danh mục cha</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="align-middle">{category.name}</td>
              <td className="align-middle">{category.parent_id ? findCategoryById(category.parent_id).name : ''}</td>
              <td className="align-middle">
                <Link
                  to={`/admin/category/edit/${category.id}`}
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
                  to={`/admin/category/delete/${category.id}`}
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

export default Category;