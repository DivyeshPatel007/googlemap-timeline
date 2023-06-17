import React, { useState } from 'react'
import logo from "../../assets/img/logo/dreamer.png"
import userLogo from "../../assets/icons/user-line.svg"
import "./Sidebar.scss"
import Timeline from '../Timeline/Timeline'
import Navigation from '../Navigation/Navigation'

function Sidebar() {
  const [showUsers, setShowUsers] = useState(false)


  function showUsersHandler() {

    setShowUsers((prevState) => {
      return !prevState
    })
  }

  console.log(showUsers);
  return (
    <div className='sidebar' >

      <div className="sidebar-header">
        <div className="img-container">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="sidebar-user__data" onClick={showUsersHandler}>
          <img src={userLogo} alt="" />
        </div>
        {showUsers &&
          <ul className='sidebar-users'>
            <li onClick={showUsersHandler}>Patel Devanshu</li>  
          </ul>}
      </div>


      <Navigation />



      <ul className='timeline'>
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />
        <Timeline />

      </ul>
    </div>
  )
}

export default Sidebar