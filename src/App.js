import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import Home from "./component/client/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Verify from "./component/auth/Verify";
import Search from "./component/client/search/Search";
import MyShelf from "./component/client/myshelf/MyShelf";
import Contribute from "./component/client/contribute/Contribute";
import Dashboard from "./component/admin/dashboard/Dashboard";
import User from "./component/admin/user/User";
import AddUser from "./component/admin/user/AddUser";
import EditUser from "./component/admin/user/EditUser";
import Book from "./component/admin/book/Book";
import BookDetail from "./component/admin/book/BookDetail";
import BookCategory from "./component/common/BookCategory";
import Author from "./component/admin/author/Author";
import Category from "./component/admin/category/Category";
import AddBook from "./component/admin/book/AddBook";
import EditBook from "./component/admin/book/EditBook";
import AddCategory from "./component/admin/category/AddCategory";
import EditCategory from "./component/admin/category/EditCategory";
import AddAuthor from "./component/admin/author/AddAuthor";
import EditAuthor from "./component/admin/author/EditAuthor";
import Layout from "./component/common/Layout";
import { ProtectedRoute, AdminRoute, LibrarianRoute } from "./routes/Guard";

const App = () => {
  return (
    <div className="App bg-light">
      <Container fluid>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/detail/:id" element={<BookDetail />} />
            <Route path="book/category/:parentCategoryId" element={<BookCategory />} />
            <Route path="book/category/:parentCategoryId/:subCategoryId" element={<BookCategory />} />
            <Route path="my-shelf" element={<MyShelf />} />
            <Route path="contribute" element={<Contribute />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Client Protected Routes */}
          {/* <Route path="/" element={<ProtectedRoute element={Layout} />} >
            <Route path="search/detail/:id" element={<M element={<BookDetail />} />} />
          </Route> */}


          {/* Common Admin/Librarian Route */}
          <Route path="/admin" element={<ProtectedRoute element={<Layout />} />} >
            <Route index element={<Dashboard />} />

            {/* Admin-specific routes */}
            <Route path="user" element={<AdminRoute element={<User />} />} />
            <Route path="user/add" element={<AdminRoute element={<AddUser />} />} />
            <Route path="user/edit/:id" element={<AdminRoute element={<EditUser />} />} />

            {/* Librarian-specific routes */}
            <Route path="book" element={<LibrarianRoute element={<Book />} />} />
            <Route path="book/add" element={<LibrarianRoute element={<AddBook />} />} />
            <Route path="book/edit/:id" element={<LibrarianRoute element={<EditBook />} />} />
            <Route path="book/detail/:id" element={<LibrarianRoute element={<BookDetail />} />} />

            <Route path="category" element={<LibrarianRoute element={<Category />} />} />
            <Route path="category/add" element={<LibrarianRoute element={<AddCategory />} />} />
            <Route path="category/edit/:id" element={<LibrarianRoute element={<EditCategory />} />} />

            <Route path="author" element={<LibrarianRoute element={<Author />} />} />
            <Route path="author/add" element={<LibrarianRoute element={<AddAuthor />} />} />
            <Route path="author/edit/:id" element={<LibrarianRoute element={<EditAuthor />} />} />

          </Route>

          {/* Redirect any unmatched route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
