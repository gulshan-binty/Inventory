import React, { useState, useEffect } from "react";
const Dashboard = ({ setAuth }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user's name from the backend
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard/", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });

        const userData = await response.json();
        setUserName(userData.user_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Welcome, {userName}</h1>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary btn-block mt-5"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
