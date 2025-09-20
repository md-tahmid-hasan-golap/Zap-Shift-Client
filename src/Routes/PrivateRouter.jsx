import React, { useContext } from "react";
import { AuthContext } from "../firebase/FirebaseAuthProvider";
import { Form, Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
        <span className="loading loading-ring loading-xl"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ Form: location }}></Navigate>;
  }
  return children;
};

export default PrivateRouter;
