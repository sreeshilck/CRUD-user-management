import React, { useEffect } from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios';
//import './NavBar.css'

function NavBar() {

const navigate = useNavigate();
const [cookies, setCookie, removeCookie] = useCookies([]);

    const logout = () => {
        removeCookie("token");
        navigate("/admin");
      }




    return (
        // <div>NavBar</div>
        <>

            <Navbar bg="light" expand="lg" className='p-3'>
                {/* <Container> */}
                    <Navbar.Brand  className='fs-2'>WebApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ms-auto  fs-5 ">
                            {/* <Nav.Link href="/admin_panel" >Home</Nav.Link> */}
                            {/* <Nav.Link href="#link">Add New</Nav.Link> */}
                            {/* <Nav.Link >Logout</Nav.Link> */}
                            <Nav.Link>
                                {/* <Button className='btn btn-primary me-2' >Home</Button> */}
                            </Nav.Link>
                            <Nav.Link className='d-flex '>
                                <Button className='btn btn-primary text-end' onClick={logout} >Logout</Button>
                            </Nav.Link>
                            {/* <Nav.Link href="#link">Link</Nav.Link> */}
                            
                        </Nav>
                    </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>

        </>
    )
}

export default NavBar