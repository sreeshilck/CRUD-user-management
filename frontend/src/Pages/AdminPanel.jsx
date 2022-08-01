import React, { useEffect } from 'react'

import NavBar from '../Components/Admin/NavBar'
import Table from '../Components/Admin/Table/TableData'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function AdminPanel() {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!cookies.token) {
  //       navigate("/admin");
  //     } else {
  //       const { data } = await axios.post("http://localhost:4000/admin_verify", {},
  //         { withCredentials: true }
  //       );
  //       if (!data.status) {
  //         removeCookie("token");
  //         navigate("/admin");
  //       } else {
  //         console.log("to /adminpanell in adminpanel.jsx")
  //         navigate("/admin_panel")
  //       }
  //     }
  //   };
  //   verifyUser();
  // },[]);



  return (
    <>
    <NavBar />
    <Table />
    {/* <ViewUsers /> */}
    </>
  )
}

export default AdminPanel;