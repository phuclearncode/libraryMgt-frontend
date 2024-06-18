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
import { Outlet } from "react-router-dom";
import Author from "./component/admin/author/Author";
import Category from "./component/admin/category/Category";
import AddBook from "./component/admin/book/AddBook";
import EditBook from "./component/admin/book/EditBook";
import AddCategory from "./component/admin/category/AddCategory";
import EditCategory from "./component/admin/category/EditCategory";
import AddAuthor from "./component/admin/author/AddAuthor";
import EditAuthor from "./component/admin/author/EditAuthor";

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
            <Route path="user" element={<AdminRoute element={<Outlet />} />}> {/* Outlet added */}
              <Route index element={<AdminRoute element={<User />} />} />   {/* Index route for User */}
              <Route path="add" element={<AdminRoute element={<AddUser />} />} />
            </Route>
            <Route path="book" element={<AdminRoute element={<Outlet />} />}> {/* Outlet added */}
              <Route index element={<AdminRoute element={<Book />} />} />   {/* Index route for User */}
              <Route path="add" element={<AdminRoute element={<AddBook />} />} />
              <Route path="edit-book/:isbn" element={<AdminRoute element={<EditBook />} />} />
            </Route>
            <Route path="category" element={<AdminRoute element={<Outlet />} />}> {/* Outlet added */}
              <Route index element={<AdminRoute element={<Category />} />} />   {/* Index route for User */}
              <Route path="add" element={<AdminRoute element={<AddCategory />} />} />
              <Route path="edit-category/:id" element={<AdminRoute element={<EditCategory />} />} />
            </Route>
            <Route path="author" element={<AdminRoute element={<Outlet />} />}> {/* Outlet added */}
              <Route index element={<AdminRoute element={<Author />} />} />   {/* Index route for User */}
              <Route path="add" element={<AdminRoute element={<AddAuthor />} />} />
              <Route path="edit-author/:id" element={<AdminRoute element={<EditAuthor />} />} />
            </Route>
          </Route>

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" />} />


        </Routes>
      </Container>
    </div>
  );
}

export default App;
