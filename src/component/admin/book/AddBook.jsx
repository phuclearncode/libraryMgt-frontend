import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';
import '../../../assets/style/Style.css';


export default function AddBook() {
  const navigate = useNavigate();
  

  
  return (
    <div style={{ margin: '0 200px' }}>
    <Notification />
    <div style={{ marginBottom: '20px' }}>
      <h5 >Thêm sách</h5>
    </div>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="label">Tác giả</Form.Label>
        <Form.Control
          className="field-input"
          type="text"
          placeholder="Nhập tên tác giả"
          style={{ fontSize: "small" }}
          name="name"
        />
        <Form.Control type="file" className="field-input" style={{fontSize: 'small'}} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control as="textarea" rows={3} />
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
}