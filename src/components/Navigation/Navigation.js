import React, { useContext, useEffect, useState } from 'react'
import calenderLogo from "../../assets/icons/calendar-line.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Navigation.scss"
import axios from 'axios';
import { MapContext } from '../../Context';


const Navigation = ({ props1 }) => {
    const [showCalender, setShowCalender] = useState(false)
    const [cal, setCal] = useState(new Date());
    const { updatedData } = useContext(MapContext);

    useEffect(() => {
        console.log("date changes", cal);
    }, [cal]);


    let dateFormat;
    const handleDateformat = (event) => {
        const year = event.getFullYear();
        const month = String(event.getMonth() + 1).padStart(2, 0);
        const date = String(event.getDate()).padStart(2, 0);
        dateFormat = `${year}-${month}-${date}`;
        console.log("datefromat", dateFormat);
    };
    const fetchAxiosdata = async (fetchid, fetchdate) => {
        if (fetchid === '') {
            console.log("no selected id");
        }
        else {
            await axios
                .post("http://localhost:4001/users/userData", { fetchid, fetchdate })
                .then((res) => {
                    // console.log(res.data);
                    console.log("USERDATA after post", res.data);
                    updatedData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }

    }

    const showCalendersHandler = async () => {
        setShowCalender((prevState) => {
            return !prevState
        });
        handleDateformat(cal);
        fetchAxiosdata(props1, dateFormat);
    }
    const handleCalendar = async (event) => {
        setCal(event);
        handleDateformat(event);
        fetchAxiosdata(props1, dateFormat);
    };






    return (
        <div className='navigation'>

            <button className='navigation-button' onClick={showCalendersHandler}>Select Date  <img src={calenderLogo} alt="" /> </button>
            <Calendar className={showCalender ? "navigation-calender active" : "navigation-calender"} onChange={handleCalendar} value={cal} />

        </div>

    )
}

export default Navigation