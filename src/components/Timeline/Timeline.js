import React from 'react'
import durationLogo from "../../assets/icons/time-line.svg"
import motoLogo from "../../assets/icons/motorbike-line.svg"
import "./Timeline.scss"


function Timeline() {
    return (
        <li className='timeline-item'>

            <div className='timeline-item__heading'>
                <h1>Dreamer Technologies</h1>
                <p>10:30AM - 6:30PM</p>
            </div>
            <div className="timeline-item__address">
                <p>302, Business point GIDC Cross Road, Vapi, Gujarat 396195</p>
            </div>
            <div className="timeline-item__data">

                <div className="timeline-item__innerdata">
                    <div className="data-img">
                        <img src={durationLogo} alt="" />
                    </div>
                    <h2>25min</h2>
                </div>


                <div className="timeline-item__innerdata">
                    <div className="data-img">
                        <img src={motoLogo} alt="" />
                    </div>
                    <h2>25km</h2>
                </div>


            </div>


        </li>
    )
}

export default Timeline