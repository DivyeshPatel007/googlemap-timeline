import React, { useState } from 'react'
import calenderLogo from "../../assets/icons/calendar-line.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Navigation.scss"



function Navigation() {
    const [showCalender, setShowCalender] = useState(false)
    const [value, onChange] = useState(new Date());

    function showCalendersHandler() {
        setShowCalender((prevState) => {
            return !prevState
        })
    }

    const year = value.getFullYear()
    const month = value.getMonth() + 1;
    const date = value.getDate();
    const dateFormat = `${year}-${month}-${date}`
    console.log(dateFormat);

    return (
        <div className='navigation'>
            <button className='navigation-button' onClick={showCalendersHandler}>Select Date  <img src={calenderLogo} alt="" /> </button>
            <Calendar className={showCalender ? "navigation-calender active" : "navigation-calender"} onChange={onChange} value={value} />
           
        </div>
    )
}

export default Navigation