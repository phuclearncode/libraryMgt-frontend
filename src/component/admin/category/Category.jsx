import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../../service/CategoryService';
import { deleteCategory } from '../../../service/CategoryService';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && response.status === 200) {
          const data = response.data[0];  
          if (data && data.categoryList) { 
            setCategories(data.categoryList); 
          }
        } else {
          console.error("API did not return expected data structure:", response);
        }
      } catch (error) {
        console.error(error);
      } 
    };
    fetchCategories();
  }, []);


  const findCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Bạn chac chua?")) {
      try {
        await deleteCategory(categoryId);
        setCategories(categories.filter(cat => cat.id !== categoryId)); 
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleAdd = () => {
    navigate('category/add');
  };

  const handleEdit = (categoryId) => {
    navigate(`category/edit/${categoryId}`);
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
          <i class="bi bi-plus-lg" onClick={() => handleAdd()}></i>
          <span className="m-2">Thêm</span>
        </Link>
      </div>
      {categories.length > 0 ? (
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
                  <i className="bi bi-pen" onClick={() => handleEdit(category.id)}></i>
                  <span className='m-2'onClick={() => handleEdit(category.id)}>Sửa</span>
                </Link>
                 {/* Chỗ này có cần chuyển hướng sang delete/${category.id} không? */}
                <Link
                  // to={`/admin/category/delete/${category.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'none'
                  }}
                >
                    <i className="bi bi-trash3" onClick={() => handleDelete(category.id)}></i> 
                    <span className='m-2' onClick={() => handleDelete(category.id)}>Xóa</span>
                 
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default Category;