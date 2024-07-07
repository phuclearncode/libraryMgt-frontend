import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Dropdown } from "react-bootstrap";
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
    <div className="d-flex justify-content-end"  style={{ marginBottom: '50px'}}>
        
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
