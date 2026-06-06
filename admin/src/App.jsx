import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleAuthError } from "./utils/auth";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const validateAdminSession = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) return;

      try {
        const response = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token: savedToken } }
        );

        if (!response.data.success) {
          if (handleAuthError(response.data.message, setToken)) {
            toast.error("Session expired. Please login again.");
          }
        }
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        if (handleAuthError(message, setToken)) {
          toast.error("Session expired. Please login again.");
        }
      }
    };

    validateAdminSession();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/list" />} />
                <Route path="/add" element={<Add token={token} setToken={setToken} />} />
                <Route path="/list" element={<List token={token} setToken={setToken} />} />
                <Route path="/orders" element={<Orders token={token} setToken={setToken} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
