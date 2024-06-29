import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TableData() {
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        navigate("/admin");
      } else {
        const { data } = await axios.post("http://localhost:4000/admin_verify", {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("token");

          navigate("/admin");
        } else {
          navigate("/admin-panel")
        }
      }
    };
    verifyUser();
    getUsers();
  }, [cookies, navigate, removeCookie]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:4000/admin_panel");
    if (response.status === 200) {
      setData(response.data)
      navigate("/admin-panel")
    }
  };

  const deleteUser = async (id) => {
    // if (window.confirm("Are you sure to delete user")) {
    const response = await axios.delete(`http://localhost:4000/delete_user/${id}`)
    toast.success(response.data);
    getUsers();
    //  }
  }

  const blockUser = async (id) => {
    // if (window.confirm("Are you sure to block user")) {
    const response = await axios.put(`http://localhost:4000/block_user/${id}`)
    toast.success(response.data);
    getUsers();
    //}
  }

  const unblockUser = async (id) => {
    // if (window.confirm("Are you sure to unblock user")) {
    const response = await axios.put(`http://localhost:4000/unblock_user/${id}`)
    toast.success(response.data);
    getUsers();
    // }
  }

  return (
    <>
      {/* <Container> */}
      <div className="dataBox pt-5">
        <div className='d-flex'>
          <div className='text-center  w-50'>
            <Link to="/add">
              <Button className='btn btn-success'>Add New </Button>
            </Link>
          </div>
          {/* <div className='text-center bg-dark w-50'>
          <Button className='btn btn-success text-lowercase' onClick={() => deleteUser()}><i class="fa fa-plus text-lowercase" aria-hidden="true"> a d d</i></Button>
        </div> */}
        </div>
        <Table striped bordered hover className='mt-5 w-75 mx-auto text-center '>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/delete/${item._id}`}>
                        <Button className='btn btn-danger' onClick={() => deleteUser(item._id)}><i className='fa fa-trash' aria-hidden="true"></i></Button>
                      </Link>
                      <Link to={`/edit/${item._id}`}>
                        <Button className='btn btn-primary ms-2' ><i className='fa fa-edit'></i></Button>
                      </Link>
                      {(!item.isBlocked) ?
                        //<Link to={`/block/${item._id}`}>
                        <Button className='btn btn-danger ms-2' onClick={() => blockUser(item._id)}>Block</Button>
                        //</Link> :
                        :
                        // <Link to={`/unblock/${item._id}`}>
                        <Button className='btn btn-success ms-2' onClick={() => unblockUser(item._id)}>Unblock</Button>
                        //</Link>
                      }
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
      {/* </Container> */}
      <ToastContainer />
    </>
  )
}

export default TableData;