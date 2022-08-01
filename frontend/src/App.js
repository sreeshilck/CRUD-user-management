import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLoginPage from "./Pages/userLogin"
import UserRegisterPage from "./Pages/userRegister"
import UserHomePage from "./Pages/userHome"
import AdminLoginPage  from "./Pages/adminLogin";
import AdminRegisterPage  from "./Pages/adminRegister";
import AdminPanelPage from "./Pages/AdminPanel"
import ErrorPage from "./Pages/errorPage"
import "react-toastify/dist/ReactToastify.css"
import AddUserPage from "./Pages/addUser"
import EditUserPage from "./Pages/editUser"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserLoginPage/>} />
        <Route exact path="/register" element={<UserRegisterPage/>} />
        <Route exact path="/home" element={<UserHomePage/>} />
        <Route exact path="/admin" element={<AdminLoginPage/>} />
        <Route exact path="/admin_register" element={<AdminRegisterPage/>} />
        <Route exact path="/admin_panel" element={<AdminPanelPage/>} />
        
        <Route exact path="/delete/:id" element={<AdminPanelPage/>} />
        <Route exact path="/edit/:id" element={<EditUserPage/>} />
        <Route exact path="/block/:id" element={<AdminPanelPage/>} />
        <Route exact path="/unblock/:id" element={<AdminPanelPage/>} />


        <Route exact path="/add" element={<AddUserPage/>} />

        <Route exact path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
