import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import axios from 'axios'
//import './Register.css'


function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });


  const onSubmit = async (values) => {


    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        ...values,
      }, {
        withCredentials: true,
      })

     

      if (data) {
        if (data.errors) {
          const { name, email, password } = data.errors;
          if (name) generateError(name)
          else if (email) generateError(email)
          else if (password) generateError(password)
        } else {
          navigate("/home");
        }
      }

    } catch (error) {
      console.log(error);
    }

  }

  const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        navigate("/home");
      } else {
        navigate("/register")
      }
    };
    verifyUser();
  }, [cookies, navigate]);




  return (
    <div className="page">
      <div className='container'>
        <h2>Register Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name='name'
              placeholder='Name'
              {...register("name", {
                required: "Name is required", maxLength: {
                  value: 10,
                  message: "Name cannot exceed more than 10 characters"
                }
              })}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              placeholder='Email'
              {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter valid email" } })}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              placeholder='Password'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters"

                },
                maxLength: {
                  value: 8,
                  message: "Password cannot exceed more than 8 characters"
                },
              })}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>


          <button type='submit'>Submit</button>
          <span>
            Already have an account ? <Link to="/">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )

}

export default Register



