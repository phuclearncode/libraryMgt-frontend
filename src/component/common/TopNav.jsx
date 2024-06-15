import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style/TopBar.css";
import { useAuth } from "../context/AuthContext";

const TopNav = () => {
  const navigate = useNavigate();
  const { isUserAuthenticated, logout, user } = useAuth();
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated());

  useEffect(() => {
    setAuthenticated(isUserAuthenticated());
  }, [isUserAuthenticated]);

  const getFullName = user ? user.fullName : "";

  console.log(user);

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="d-flex" style={{ padding: "10px 10px 0 0" }}>
      <Nav className="me-auto">
        <Form className="d-flex">
          <div
            className="d-flex"
            style={{
              border: "1px solid #DEDEE1",
              borderRadius: "50px",
              height: "35px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form.Select
              aria-label="Default select example"
              style={{
                width: "70px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "transparent",
                fontSize: "small",
                height: "35px",
              }}
            >
              <option>All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "small",
                height: "35px",
                fontSize: "small",
                borderRadius: "0",
              }}
            />
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#F87555",
                borderRadius: "0",
                fontSize: "small",
              }}
            >
              <i className="bi bi-search"></i>
            </Button>
          </div>
        </Form>
      </Nav>
      <Nav>
        {!authenticated && <Link className="btnLogin" to="/login">Login</Link>}

        {authenticated &&
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                border: "1px solid #DEDEE1",
                color: "#000",
                fontSize: "small",
                borderRadius: "50px",
                padding: "0px 10px",
                height: "35px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {getFullName}
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                fontSize: "small",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #DEDEE1",
                color: "#000",
                backgroundColor: "#fff",
              }}
            >
              <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
      </Nav>
    </div>
  );
};

export default TopNav;
