import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import BASE_API_URL from '../../../config'

function AdminLogin() {

  const navigate = useNavigate();
  const [value, setValues] = useState({
    email: "",
    password: "",
  })

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_API_URL}/admin-login`, {
        ...value,
      }, {
        withCredentials: true,
      })

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password)
        } else {
          if (data.value) {
            navigate("/admin-panel");
          }
        }
      }
    } catch (error) {
      generateError('something went wrong')
    }
  }

  const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.token) {
        navigate("/admin-panel");
      } else {
        navigate("/admin")
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  return (
    <div className="page">
      <div className='container'>
        <h2>Admin Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              placeholder='Email'
              onChange={(e) =>
                setValues({ ...value, [e.target.name]: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              placeholder='Password'
              onChange={(e) =>
                setValues({ ...value, [e.target.name]: e.target.value })}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default AdminLogin;