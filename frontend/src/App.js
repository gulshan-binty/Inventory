import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./component/sidebar";
import Dashboard from "./component/Dashboard";
import Inventory from "./component/inventory";
import Login from "./component/Login";
import Register from "./component/Register";
import PurchaseProduct from "./component/puchaseProduct";
import PurchaseItem from "./component/purchaseItem";
import "./App.css";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/verify", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await res.json();
        setAuthenticated(parseRes === true);
      } catch (err) {
        console.error(err.message);
      }
    };
    checkAuth();
  }, []);

  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };

  const ProtectedRoute = ({
    element: Component,
    isAuthenticated,
    setAuth,
    ...rest
  }) => {
    return isAuthenticated ? (
      <Component setAuth={setAuth} {...rest} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={Dashboard}
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute
                element={Inventory}
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
              />
            }
          />
          <Route
            path="/purchaseProduct"
            element={
              <ProtectedRoute
                element={PurchaseProduct}
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
              />
            }
          />
          <Route
            path="/purchaseItem"
            element={
              <ProtectedRoute
                element={PurchaseItem}
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
              />
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/register"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideSidebar && <Sidebar />}
      <div className={shouldHideSidebar ? "w-full" : "flex-1 ml-64 p-4"}>
        {children}
      </div>
    </div>
  );
};

export default App;
