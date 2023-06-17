import React from 'react'
import logo from "../../assets/img/logo/dreamer.png"
import userLogo from "../../assets/icons/user-line.svg"
import "./Sidebar.scss"
import Timeline from '../Timeline/Timeline'
import Navigation from '../Navigation/Navigation'

function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="sidebar-header">
        <div className="img-container">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="sidebar-user__data">
          <img src={userLogo} alt="" />
        </div>
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