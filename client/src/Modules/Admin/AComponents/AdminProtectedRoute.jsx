import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("UserToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}