import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode; // Menentukan bahwa komponen bisa menerima anak-anak
  role?: string; // Opsional, karena ada pengecekan `role && user.role !== role`
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children, role }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
