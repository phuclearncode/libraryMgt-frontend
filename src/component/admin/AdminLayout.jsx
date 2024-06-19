import React from 'react'
import NavBar from '../common/NavBar';
import TopNav from '../common/TopNav';
import { Row, Col, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div>
      <Row>
        <Col className='col-2'>
          <NavBar />
        </Col>
        <Col className='col-10' style={{ padding: "10px 10px 0 0" }}>
          <TopNav />
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default AdminLayout