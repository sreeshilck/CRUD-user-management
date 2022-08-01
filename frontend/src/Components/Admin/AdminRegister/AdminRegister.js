import React, { useState } from 'react'

//import './AdminRegister.css'


function AdminRegister() {

const [values, setValues] = useState({
    email:"",
    password:""
});





const handleSubmit = (e) =>{
    e.preventDefault();
    try {
        
        

    } catch (error) {
        
    }
}




  return (
    <div className="page">
    <div className='container'>
      <h2>Admin Register</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name='email'
            placeholder='Email'
            onChange={(e) => 
                setValues({ ...values, [e.target.name]: e.target.value})} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password" 
            name='password' 
            placeholder='Password'  
            onChange={(e) => 
            setValues({...values, [e.target.name]: e.target.value})} />
        </div>
        <button type='submit'>Login</button>
      </form>
      {/* <ToastContainer /> */}
    </div>
    </div>
  )
}

export default AdminRegister;