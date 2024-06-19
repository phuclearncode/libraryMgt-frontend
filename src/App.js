import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import Home from "./component/client/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Verify from "./component/auth/Verify";
import ClientLayout from "./component/client/ClientLayout";
import Search from "./component/client/search/Search";
import MyShelf from "./component/client/myshelf/MyShelf";
import Contribute from "./component/client/contribute/Contribute";
import AdminLayout from "./component/admin/AdminLayout";
import Dashboard from "./component/admin/dashboard/Dashboard";
import User from "./component/admin/user/User";
import AddUser from "./component/admin/user/AddUser";
import EditUser from "./component/admin/user/EditUser";
import Book from "./component/admin/book/Book";
import { ProtectedRoute, AdminRoute, LibrarianRoute } from "./routes/Guard";

const App = () => {
  return (
    <div className="App bg-light">
      <Container fluid>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ClientLayout />}>
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

          {/* Client Protected Routes */}
          {/* <Route path="/profile" element={<ProtectedRoute element={Profile} />} /> */}

          {/* Common Admin/Librarian Route */}
          <Route path="/admin" element={<ProtectedRoute element={AdminLayout} />}>
            <Route index element={<Dashboard />} />

            {/* Admin-specific routes */}
            <Route path="user" element={<AdminRoute element={User} />} />
            <Route path="user/add" element={<AdminRoute element={AddUser} />} />
            <Route path="user/edit/:id" element={<AdminRoute element={EditUser} />} />

            {/* Librarian-specific routes */}
            <Route path="book" element={<LibrarianRoute element={Book} />} />
          </Route>

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
