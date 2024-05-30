import Sidebar from "./sidebar";
import Tab from "./tab";
import React, { useState, useEffect } from "react";

const Inventory = ({ setAuth }) => {
  useEffect(() => {
    // Fetch user's name from the backend
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/inventory/product",
          {
            method: "GET",
            headers: {
              token: localStorage.token,
            },
          }
        );

        const userData = await response.json();
        // console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 p-5">
        <Tab></Tab>
      </div>
    </div>
  );
};

export default Inventory;
