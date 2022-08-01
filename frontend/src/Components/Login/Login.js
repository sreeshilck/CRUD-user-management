import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import axios from 'axios'

 
function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
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
      const { data } = await axios.post("http://localhost:4000/", {
        ...values,
      }, {
        withCredentials: true,
      })

      if (data) {

        if (data.errors) {

          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password)

        } else {

          if (!data.value) {
           
            navigate("/home");
          }

        }

      }

    } catch (error) {
      console.log(error);
    }
  };

  // jwt validation

  const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        navigate("/home");
      } else {
        navigate("/")
      }
    };
    verifyUser();
  }, [cookies, navigate]);


  return (
    <div className="page">
      <div className='container'>
        <h2>Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              placeholder='Email'
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password" name='password' 
              placeholder='Password' 
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Register