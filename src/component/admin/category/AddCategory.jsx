import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/style/Style.css';
import Notification from '../../common/Notification'
import useNotification from '../../../hooks/useNotification'
import { MultiSelect } from "react-multi-select-component";

const AddCategory = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', description: 'Fictional works', parent_id: null },
    { id: 2, name: 'Non-fiction', description: 'Non-fictional works', parent_id: null },
    { id: 3, name: 'Fantasy', description: 'Fantasy books', parent_id: 1 },
    { id: 4, name: 'Science Fiction', description: 'Sci-fi books', parent_id: 1 },
    { id: 5, name: 'Biographies', description: 'Biographies and memoirs', parent_id: 2 },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleParentCategoryChange = (event) => {
    setSelectedCategoryId(parseInt(event.target.value)); // Convert value to integer
  };


  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Thêm danh mục</h5>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục</Form.Label>
          <Form.Control
            className="field-input"
            type="text"
            placeholder="Nhập tên danh mục"
            style={{ fontSize: "small" }}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục cha</Form.Label>

          <Form.Select
            onChange={handleParentCategoryChange}
            value={selectedCategoryId}
            style={{ fontSize: "small" }}
          >
            <option value="">Chọn danh mục cha</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>

        </Form.Group>

        <Button
          type="submit"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none'
          }}>
          Lưu thay đổi
        </Button>
      </Form>

    </div>
  );
};

export default AddCategory;