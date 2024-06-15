import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ForgotPassword from "./page/ForgotPassword";
import Home from "./component/client/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import ResetPassword from "./component/auth/ResetPassword";
import Verify from "./component/auth/Verify";
import ClientLayout from "./component/client/ClientLayout";
import Search from "./component/client/search/Search";
import MyShelf from "./component/client/myshelf/MyShelf";
import Contribute from "./component/client/contribute/Contribute";
import AdminLayout from "./component/admin/AdminLayout";
import Dashboard from "./component/admin/dashboard/Dashboard";
import User from "./component/admin/user/User";
import AddUser from "./component/admin/user/AddUser";
import Book from "./component/admin/book/Book";
import { ProtectedRoute, AdminRoute} from "./routes/Guard";


const App = () => {

  return (
    <div className="App bg-light">
      <Container fluid>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ClientLayout />} >
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="my-shelf" element={<MyShelf />} />
            <Route path="contribute" element={<Contribute />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Private Routes */}

          {/* Admin Route */}
          <Route path="/admin"
            element={<AdminRoute element={<AdminLayout />} />}
          >
            <Route index element={<AdminRoute element={<Dashboard />} />} />
            <Route path="user" element={<AdminRoute element={<User />} />} >
              <Route path="add" element={<AdminRoute element={<AddUser />} />} />
            </Route>
            <Route path="book" element={<AdminRoute element={<Book />} />} />
          </Route>

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" />} />


        </Routes>
      </Container>
    </div>
  );
}

export default App;
