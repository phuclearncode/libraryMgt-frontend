import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../../service/CategoryService';
import CustomModal from '../../common/CustomModal';
import FormCategory from '../../common/FormCategory';

const Category = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Khoa học viễn tưởng' },
    { id: 2, name: 'Lãng mạn' },
    { id: 3, name: 'Kinh dị' },
  ]); // Demo categories

  useEffect(() => {
    // fetchCategories(); // Remove this line since we are using demo data
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await getCategories();
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  const handleShowModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleSaveCategory = (category) => {
    if (selectedCategory) {
      // Update category
      setCategories((prevCategories) =>
        prevCategories.map((prevCategory) =>
          prevCategory.id === selectedCategory.id ? { ...category, id: selectedCategory.id } : prevCategory
        )
      );
    } else {
      // Add new category
      const newCategory = { ...category, id: categories.length + 1 };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
    handleCloseModal();
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // await deleteCategory(categoryId); // Remove this line since we are using demo data
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (categoryId) => {
    // Handle edit category logic
    return (
      navigate('/admin/category/edit/' + categoryId)
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Quản lý danh mục</h5>
        <Link
          className="btn btn-primary"
          to="/admin/category/add"
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
            <th>Tên danh mục</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleEditCategory(category.id)}>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button style={{ fontSize: 'small' }} variant="outline-danger" onClick={() => handleDeleteCategory(category.id)}>
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
        title={selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      >
        <FormCategory category={selectedCategory} onSave={handleSaveCategory} />
      </CustomModal>
    </div>
  );
};

export default Category;