import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLoginPage from "./Pages/user/userLogin"
import UserRegisterPage from "./Pages/user/userRegister"
import UserHomePage from "./Pages/user/userHome"
import AdminLoginPage from "./Pages/admin/adminLogin";
import AdminRegisterPage from "./Pages/admin/adminRegister";
import AdminPanelPage from "./Pages/admin/AdminPanel"
import ErrorPage from "./Pages/error/errorPage"
import "react-toastify/dist/ReactToastify.css"
import AddUserPage from "./Pages/user/addUser"
import EditUserPage from "./Pages/user/editUser"

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