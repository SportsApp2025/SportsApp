import Navbar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
