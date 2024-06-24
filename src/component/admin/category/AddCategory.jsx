import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/style/Style.css';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification';
import { getCategories, addCategory } from '../../../service/CategoryService'; 
import { useAuth } from '../../context/AuthContext';
const AddCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { showSuccess, showError } = useNotification();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response && response.status === 200) {
          setCategories(response.data[0].categoryList || []);
        } else {
          console.error("API did not return expected data structure:", response);
        }
      } catch (error) {
        console.error(error);
      } 
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = {
        name: name,
        parentId: selectedCategoryId === null ? "" : selectedCategoryId.toString(),
        createdById: user?.id,
      };
      console.log(newCategory);
      const response = await addCategory(newCategory);
      if (response && response.status === 201) { 
        showSuccess("Thêm danh mục thành công");
        navigate('/admin/category');
      } else {
        showError(response?.data?.message || "Thêm danh mục thất bại"); 
      }
    } catch (error) {
      showError("Lỗi thêm danh mục: " + error.message);
    }
  };

  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Thêm danh mục</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục</Form.Label>
          <Form.Control
            className="field-input"
            type="text"
            placeholder="Nhập tên danh mục"
            style={{ fontSize: "small" }}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục cha</Form.Label>
          <Form.Select
           onChange={(e) => setSelectedCategoryId(parseInt(e.target.value, 10) || null)}
           value={selectedCategoryId || ''}
            style={{ fontSize: "small" }}>
            <option value="">Chọn danh mục cha</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          type='submit'
          style={{ fontSize: 'small', backgroundColor: '#F87555', border: 'none' }}>
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;