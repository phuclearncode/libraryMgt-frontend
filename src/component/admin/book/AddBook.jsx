import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';
import OptionSelect from '../../common/OptionSelect';
import CustomSelect from '../../common/CustomSelect';
import MultipleSelect from '../../common/MultipleSelect';
import ImageUpload from '../../common/ImageUpload';
import PDFUpload from '../../common/PDFUpload';
import TextInput from '../../common/TextInput';
import Textarea from '../../common/TextArea';

const AddBook = () => {
  const navigate = useNavigate();
  const { showError } = useNotification();

  const [bookData, setBookData] = useState({
    isbn: '',
    title: '',
    price: '',
    totalPage: '',
    status: 'ACTIVE',
    publisher: '',
    publicationYear: '',
    language: 'English',
    description: '',
    authors: [],
    category: '',
    bookImage: null,
    pdfSamples: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting book data:', bookData);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ];

  const status = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Vietnamese', value: 'Vietnamese' },
    { label: 'Japanese', value: 'Japanese' }
  ];

  const data = [
    {
      label: 'Manager',
      options: [
        { label: 'Jack', value: 'Jack' },
        { label: 'Lucy', value: 'Lucy' },
      ],
    },
    {
      label: 'Engineer',
      options: [
        { label: 'Chloe', value: 'Chloe' },
        { label: 'Lucas', value: 'Lucas' },
      ],
    },
  ];

  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5>Thêm sách</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7}>
            <TextInput
              label="ISBN"
              name="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              placeholder="Nhập ISBN"
              type="text"
            />

            <TextInput
              label="Tiêu đề sách"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề sách"
              type="text"
            />

            <Row>
              <Col>
                <TextInput
                  label="Giá"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  placeholder="Nhập giá sách"
                  type="text"
                />
              </Col>
              <Col>
                <TextInput
                  label="Số trang"
                  name="totalPage"
                  value={bookData.totalPage}
                  onChange={handleChange}
                  placeholder="Nhập số trang"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="label">Trạng thái</Form.Label>
                  <CustomSelect
                    name="status"
                    value={bookData.status}
                    onChange={handleChange}
                    data={status}
                    placeholder="Chọn trạng thái"
                  />
                </Form.Group>
              </Col>
            </Row>

            <TextInput
              label="Nhà xuất bản"
              name="publisher"
              value={bookData.publisher}
              onChange={handleChange}
              placeholder="Nhập nhà xuất bản"
              type="text"
            />

            <Row>
              <Col>
                <TextInput
                  label="Năm xuất bản"
                  name="publicationYear"
                  value={bookData.publicationYear}
                  onChange={handleChange}
                  placeholder="Nhập năm xuất bản"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="label">Ngôn ngữ</Form.Label>
                  <CustomSelect
                    name="language"
                    value={bookData.language}
                    onChange={handleChange}
                    data={languages}
                    placeholder="Chọn ngôn ngữ"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Textarea
              label="Mô tả"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả"
              rows={10}
            />
          </Col>

          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label className="label">Tác giả</Form.Label>
              <MultipleSelect
                name="authors"
                value={bookData.authors}
                onChange={handleChange}
                options={options}
                placeholder="Chọn tác giả"
                mode="tags"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label">Danh mục</Form.Label>
              <OptionSelect
                name="category"
                value={bookData.category}
                onChange={handleChange}
                data={data}
                placeholder="Chọn danh mục"
              />
            </Form.Group>

            <ImageUpload
              label="Tải ảnh sách"
              name="bookImage"
              value={bookData.bookImage}
              onChange={handleChange}
              showError={showError}
            />

            <PDFUpload
              label="Tải mẫu PDF"
              name="pdfSamples"
              value={bookData.pdfSamples}
              onChange={handleChange}
              showError={showError}
            />

          </Col>
        </Row>
        <Button
          type="submit"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
            marginTop: '20px'
          }}>
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
}

export default AddBook;
