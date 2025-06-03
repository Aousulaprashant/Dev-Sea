// components/MainLayout.js
// import Sidebar from "./sideBar";
import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <SideBar />
      <div style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
