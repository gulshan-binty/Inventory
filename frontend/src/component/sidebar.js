import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LineChart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-300 text-white flex flex-col fixed">
      <div className="p-4 bg-gray-500">
        <h1 className="text-2xl font-bold text-gray-200">Logo</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-4 text-stone-50">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-500 text-white"
              : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          }
        >
          <Home className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-500 text-white"
              : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          }
        >
          <LineChart className="h-4 w-4" />
          Inventory
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
