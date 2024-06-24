import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/style/Style.css";
import Notification from "../../common/Notification";
import useNotification from "../../../hooks/useNotification";
import { updateCategory, getCategories } from "../../../service/CategoryService";
import { useAuth } from "../../context/AuthContext";

const EditCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { showError, showSuccess } = useNotification();
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null); // Thay đổi state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getCategories();
            if (response.status === 200 && response.data.length > 0) {
                const categories = response.data[0].categoryList; 
               
                setCategoryOptions(categories.map(category => ({
                    name: category.name,
                    id: category.id,
                })));

                const categoryToEdit = categories.find(cat => cat.id === parseInt(id));
                if (categoryToEdit) {
                    setCategoryName(categoryToEdit.name);
                    setSelectedParentCategory(categoryToEdit.parentCategory?.id || ''); 
                } else {
                    showError('Không tìm thấy danh mục');
                    navigate('/admin/category');
                }
            } else {
                showError('Không có danh mục nào được tìm thấy.'); 
                navigate('/admin/category');
            }
        } catch (error) {
            showError('Lỗi khi tải dữ liệu danh mục');
        }
    };
    fetchData();
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCategory = {
        name: categoryName,
        parentId: selectedParentCategory, 
        updatedById: user?.id,
      };
       await updateCategory(id, updatedCategory);
      showSuccess("Cập nhật danh mục thành công");
      navigate("/admin/category");
    } catch (error) {
      showError("Lỗi khi cập nhật danh mục");
    }
  };

  const handleParentCategoriesChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const options = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  console.log(selectedCategories);

  return (
    <div style={{ margin: "0 200px" }}>
      <Notification />
      <div style={{ marginBottom: "20px" }}>
        <h5>Cập nhật danh mục</h5>
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục cha</Form.Label>

          <Form.Select
            value={selectedParentCategory}
            style={{ fontSize: "small" }}
            onChange={(e) => setSelectedParentCategory(e.target.value)}
          >
            <option value="">Chọn danh mục cha</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          type="submit"
          style={{ fontSize: "small",  backgroundColor: "#F87555",  border: "none",}}>
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default EditCategory;
