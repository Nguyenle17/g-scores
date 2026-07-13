import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}