import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../component/context/AuthContext";

export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();
  const { isUserAuthenticated } = useAuth();
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated());

  useEffect(() => {
    setAuthenticated(isUserAuthenticated());
  }, [isUserAuthenticated]);

  return authenticated ? (
    Component
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [admin, setAdmin] = useState(isAdmin());

  useEffect(() => {
    setAdmin(isAdmin());
  }, [isAdmin]);

  return admin ? (
    Component
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
