import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import { useAuth } from '../context/AuthContext.js';
import { Link } from 'react-router-dom';


const NavBar = () => {

  const { isUserAuthenticated, isMember, isAdmin, isLibrarian } = useAuth();
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated());
  const [member, setMember] = useState(isMember);
  const [admin, setAdmin] = useState(isAdmin);
  const [librarian, setLibrarian] = useState(isLibrarian);

  useEffect(() => {
    setAuthenticated(isUserAuthenticated());
    setMember(isMember);
    setAdmin(isAdmin);
    setLibrarian(isLibrarian);
  }, [isUserAuthenticated, isMember, isAdmin, isLibrarian]);

  return (

    <Nav defaultActiveKey="/" className="flex-column bg-white d-flex align-items-center"
      style={{
        height: '100vh',
        borderLeft: "1px solid #DEDEE1",
        borderRight: "1px solid #DEDEE1",
        boxShadow: "10px 0 10px -10px rgba(0, 0, 0, 0.1), -10px 0 10px -10px rgba(0, 0, 0, 0.1)"
      }}

    >
      <div className='d-flex flex-column align-items-start'>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            <img src={Logo} alt="logo" style={{ width: '120px', height: '74.18px', marginBottom: '50px' }} />
          </Nav.Link>
        </Nav.Item>

        {(!authenticated || member) && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-house"></i>
                <span className='mx-2'>Trang chủ</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/search" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-search"></i>
                <span className='mx-2'>Tìm kiếm</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/my-shelf" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-bookshelf"></i>
                <span className='mx-2'>Sách của tôi</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/contribute" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-box2-heart"></i>
                <span className='mx-2'>Đóng góp</span>
              </Nav.Link>
            </Nav.Item>
          </>
        )}


        {(admin || librarian) &&
          <Nav.Item>
            <Nav.Link as={Link} to="/admin" style={{ color: '#8A8A8A', fontSize: 'small' }}>
              <i className="bi bi-person"></i>
              <span className='mx-2'>Bảng điều khiển</span>
            </Nav.Link>
          </Nav.Item>
        }

        {admin &&
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/user" style={{ color: '#8A8A8A', fontSize: 'small' }}>
              <i className="bi bi-person"></i>
              <span className='mx-2'>Người dùng</span>
            </Nav.Link>
          </Nav.Item>

        }

        {librarian &&
          <Nav.Item>
            <Nav.Link as={Link} to="/" style={{ color: '#8A8A8A', fontSize: 'small' }}>
              <i className="bi bi-book"></i>
              <span className='mx-2'>Sách</span>
            </Nav.Link>
          </Nav.Item>
        }



      </div>
    </Nav>

  );
}

export default NavBar;
