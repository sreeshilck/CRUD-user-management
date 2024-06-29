import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
  name: "",
  email: ""
}

function EditUser() {

  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const { name, email } = state
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id])

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:4000/edit/${id}`);
    if (response.status === 200) {

      setState({ ...response.data })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateUser(state, id)
    }
  }

  const updateUser = async (data, id) => {
    try {
      const response = await axios.post(`http://localhost:4000/update/${id}`, data)

      if (response) {
        if (response.data.errors) {
          const { name, email } = response.data.errors;
          if (name) generateError(name)
          else if (email) generateError(email)
        } else {
          navigate("/admin-panel")
        }
      }
    } catch (error) {
      generateError('something went wrong')
    }
  }

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <div className="page">
      <div className='container'>
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name='name'
              placeholder='Name'
              onChange={handleInputChange}
              value={name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              placeholder='Email'
              onChange={handleInputChange}
              value={email}
            />
          </div>
          <button type='submit' >Update</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditUser