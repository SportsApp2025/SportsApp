import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const user = useSelector((state: RootState) => state.user);
  return user.id ? children : <Navigate to="/login" replace />;
};
