import React, { Fragment } from 'react'
import Home from '../../Components/Home/Home'
import Nav from '../../Components/Navbar/Unav';


function userHome() {
  return (
    <Fragment>
      <Nav />
      <Home />
    </Fragment>
  )
}

export default userHome;