import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ children }) {
  const token = localStorage.getItem("UserToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}