import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <nav>
        <ul className='Navbar'>
          <li>
            <Link to="/" className='link-style'>Home</Link>
          </li>
          <li>
            <Link to="/post" className='link-style'>NewPost</Link>
          </li>
          <li>
            <Link to="/About" className='link-style'>About</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Nav
