import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { menuItems } from "@/constants/menu";


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Menu</h2>

      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}