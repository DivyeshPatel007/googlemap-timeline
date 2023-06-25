import React, { useEffect, useState } from 'react'
import logo from "../../assets/img/logo/dreamer.png"
import userLogo from "../../assets/icons/user-line.svg"
import "./Sidebar.scss"
import Timeline from '../Timeline/Timeline'
import Navigation from '../Navigation/Navigation'


function Sidebar() {
  const [showUsers, setShowUsers] = useState(false)
  const [iddata, setIddata] = useState([""]);
  const [selectedid, setSelectedid] = useState("");



  useEffect(() => {

    fetch("http://localhost:4001/users/useriddata")
      .then((res) => res.json())
      .then((data) => setIddata(data))
      .catch((err) => console.log(err));
  }, []);



  let arrUser = [{ id: "", uname: "" }];
  let uiddata = iddata.map((d) => {
    // console.log("in iddata", d);
    return { id: d.id, uname: d.user_name };
  });
  arrUser = [].concat(uiddata);
  const handleUserid = async (event) => {
    console.log("in handleid");
    setShowUsers((prevState) => {
      return !prevState
    })

    setSelectedid(event);

  };

  function showUsersHandler() {
    setShowUsers((prevState) => {
      return !prevState
    })
  }


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
          <ul
            name="usercredentials"
            className="sidebar-users"
            id="usercrd"
            value={selectedid}
          >
            <li value="">Select</li>
            {arrUser.map((d) => {
              return (
                <li key={d.id} onClick={() => handleUserid(d.id)}>
                  {d.uname}
                </li>
              );
            })}
          </ul>
        }

      </div>


      <Navigation props1={selectedid} />



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