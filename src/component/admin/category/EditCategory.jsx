import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../assets/style/Style.css';
import Notification from '../../common/Notification'
import useNotification from '../../../hooks/useNotification'
import { MultiSelect } from "react-multi-select-component";


const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [categories, setCategories] = useState([
    { id: 1, name: 'Fiction', description: 'Fictional works', parent_id: null },
    { id: 2, name: 'Non-fiction', description: 'Non-fictional works', parent_id: null },
    { id: 3, name: 'Fantasy', description: 'Fantasy books', parent_id: 1 },
    { id: 4, name: 'Science Fiction', description: 'Sci-fi books', parent_id: 1 },
    { id: 5, name: 'Biographies', description: 'Biographies and memoirs', parent_id: 2 },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleParentCategoriesChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const options = categories.map(category => ({ label: category.name, value: category.id }));
  console.log(selectedCategories);


  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Cập nhật danh mục</h5>
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
          <MultiSelect
            options={options}
            value={selectedCategories}
            onChange={handleParentCategoriesChange}
            labelledBy="Danh mục cha"
            overrideStrings={{
              selectSomeItems: "Chọn danh mục cha",
              allItemsAreSelected: "Tất cả mục đã được chọn",
              selectAll: "Chọn tất cả",
              search: "Tìm kiếm",
            }}
            
          />
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

export default EditCategory;