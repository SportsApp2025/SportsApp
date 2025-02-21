import { Navigate } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store";

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const user = useAppSelector((state: RootState) => state.user);
  return user.id ? children : <Navigate to="/signup" replace />;
};
