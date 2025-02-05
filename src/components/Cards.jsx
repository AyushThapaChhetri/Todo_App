import React, { useEffect, useState } from 'react'
import '../css/Cards.css'
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
{/* <CiCalendar className='cards-icon' /> */ }

const Cards = ({ cardsData, handleCheck, checkedList }) => {

    function capitalizerFunc(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    let capitalizedProjectName = capitalizerFunc(cardsData.projectName);
    let capitalizedTaskName = capitalizerFunc(cardsData.taskName);
    let captializedPriority = capitalizerFunc(cardsData.priority);




    return (
        <>
            <div className="cards-outerContainer">
                <div
                    // className="cards-innerContainer"
                    className={`cards-innerContainer ${checkedList.has(cardsData.id) ? "blured" : ""}`}
                >
                    <div className='cards-subInner cSisub1'>
                        <div className='sub1cSisub1'>
                            <FaCalendarAlt className='cards-icon' />
                            <p className='output-para'>
                                {capitalizedProjectName}
                            </p>
                            <div className={`cards-Priority ${cardsData.priority}`}>
                                <p>
                                    {captializedPriority} Priority
                                </p>
                            </div>
                            <div className='cards-Task'>
                                <p>
                                    Task Name: {capitalizedTaskName}
                                </p>
                            </div>
                        </div>

                        <div className='sub2cSisub1'>
                            <MdAccessTime className='sub2cSisub1-time Icon' />
                            <p className='sub2cSisub1-para'>
                                {(cardsData.endDate.length === 0) ?
                                    (!(cardsData.hoursTime == 0) ? cardsData.hoursTime + ` hours ` : '') +
                                    (!(cardsData.minutesTime == 0) ? cardsData.minutesTime + ` minutes ` : '') +
                                    (!(cardsData.secondsTime == 0) ? cardsData.secondsTime + ` seconds ` : '') :
                                    cardsData.endDate}
                            </p>
                        </div>
                    </div>

                    <div className='cards-subInner cSisub2'>
                        <input
                            type="checkbox"
                            id={cardsData.id}
                            className='checkbox-check'
                            // checked={isChecked}
                            checked={checkedList.has(cardsData.id)}

                            // checked={(isChecked) && (classId == cardsData.id) ? true : false}
                            // checked={(.isChecked) && (classId == cardsData.id) ? true : false}
                            onChange={() => handleCheck(cardsData.id)}
                            name={cardsData.id}
                            value={cardsData.id} />


                    </div>
                </div>

            </div>
        </>
    )

}


export default Cards




