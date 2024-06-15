import { Form } from 'react-bootstrap';

const FormUser = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Họ tên</Form.Label>
        <Form.Control type="email" placeholder="Nhập họ tên" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}

export default FormUser;