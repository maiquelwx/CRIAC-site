import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/sections/navbar";

export function MainLayout() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <Navbar />
      <Outlet />
    </div>
  )
};

export default MainLayout;
