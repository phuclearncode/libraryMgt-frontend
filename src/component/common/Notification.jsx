import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
};

export const successNotification = (title, description) => {
  toast.success(`${title}: ${description}`);
};

export const errorNotification = (title, description) => {
  toast.error(`${title}: ${description}`);
};

export default Notification;
