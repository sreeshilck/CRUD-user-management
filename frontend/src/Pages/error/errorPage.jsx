import React from 'react'
import { Link } from 'react-router-dom'


function errorPage() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1>404</h1>
      <h5>Page Not Found</h5>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default errorPage