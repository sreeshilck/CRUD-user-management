import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';


function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/");
      } else {
        const { data } = await axios.post("http://localhost:4000/home", {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/");
        } else toast(`welcome ${data.user}`, { theme: "dark" });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);



  return (
    <>
      <div className='private'>
        <h4>User Home Page</h4>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
      <ToastContainer />
    </>
  )
}

export default Home