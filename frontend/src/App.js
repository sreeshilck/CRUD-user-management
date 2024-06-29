import React from "react";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLoginPage from "./pages/user/userLogin"
import UserRegisterPage from "./pages/user/userRegister"
import UserHomePage from "./pages/user/userHome"
import AdminLoginPage from "./pages/admin/adminLogin";
import AdminRegisterPage from "./pages/admin/adminRegister";
import AdminPanelPage from "./pages/admin/AdminPanel"
import ErrorPage from "./pages/error/errorPage"
import AddUserPage from "./pages/user/addUser"
import EditUserPage from "./pages/user/editUser"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserLoginPage />} />
        <Route exact path="/register" element={<UserRegisterPage />} />
        <Route exact path="/home" element={<UserHomePage />} />
        <Route exact path="/admin" element={<AdminLoginPage />} />
        <Route exact path="/admin-register" element={<AdminRegisterPage />} />
        <Route exact path="/admin-panel" element={<AdminPanelPage />} />

        <Route exact path="/delete/:id" element={<AdminPanelPage />} />
        <Route exact path="/edit/:id" element={<EditUserPage />} />
        <Route exact path="/block/:id" element={<AdminPanelPage />} />
        <Route exact path="/unblock/:id" element={<AdminPanelPage />} />
        <Route exact path="/add" element={<AddUserPage />} />

        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;