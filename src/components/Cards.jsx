// import { useEffect, useState } from 'react'
import '../css/Cards.css'
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import PropTypes from 'prop-types';

{/* <CiCalendar className='cards-icon' /> */ }

// const Cards = ({ cardsData, handleCheck, checkedList, setPopUpVisible }) => {
const Cards = ({ cardsData, handleCheck, checkedList, setIsPopUp_OutputComponent, handleEditData, setActiveCard }) => {





    function capitalizerFunc(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    let capitalizedProjectName = capitalizerFunc(cardsData.projectName);
    let capitalizedTaskName = capitalizerFunc(cardsData.taskName);
    let captializedPriority = capitalizerFunc(cardsData.priority);
    // let capitalizedProgressStatus = capitalizerFunc(cardsData.progressStatus);




    return (
        <>
            <div className="cards-outerContainer" draggable onDragStart={() => setActiveCard(cardsData.id)} onDragEnd={() => setActiveCard(null)}>
                <div

                    // className="cards-innerContainer"
                    className={`cards-innerContainer ${checkedList.has(cardsData.id) ? "blured" : ""}`}
                >
                    <div className='cards-subInner cSisub1'>
                        <div className='sub1cSisub1'>
                            <FaCalendarAlt className='cards-icon' />
                            <p className='output-para'>
                                {/* {capitalizedProjectName} */}
                                {capitalizedTaskName}

                            </p>
                            <div className={`cards-Priority ${cardsData.priority}`}>
                                <p>
                                    {captializedPriority} Priority
                                </p>
                            </div>
                            <div className='cards-Task'>
                                <p>
                                    Project Name: {capitalizedProjectName}
                                </p>
                            </div>
                            {/* <div
                                // className='cards-ProgressStatus'
                                className={`cards-progressStatus ${cardsData.progressStatus}`}
                            >
                                <p>
                                    Status: {capitalizedProgressStatus}
                                </p>
                            </div> */}
                        </div>

                        <div className='sub2cSisub1'>
                            <MdAccessTime className='sub2cSisub1-time Icon' />
                            <p className='sub2cSisub1-para'>
                                {(cardsData.endDate.length === 0) ?
                                    (!(cardsData.hoursTime == 0) ? cardsData.hoursTime + ` hours ` : '') +
                                    (!(cardsData.minutesTime == 0) ? cardsData.minutesTime + ` minutes ` : '') :
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
                            value={cardsData.id}
                        />
                        {/* <HiDotsHorizontal onClick={() => {
                            setEdiTData(cardsData)
                            setPopUpVisible((prev) => !prev)
                        }} /> */}
                        <HiDotsHorizontal
                            onClick={() => {
                                // console.log("clicked");
                                setIsPopUp_OutputComponent((prev) => !prev);
                                handleEditData(cardsData);
                            }
                            }

                        />

                    </div>
                </div>

            </div>
        </>
    )

}

// Define PropTypes for the Cards component
Cards.propTypes = {
    cardsData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        projectName: PropTypes.string.isRequired,
        taskName: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        hoursTime: PropTypes.string.isRequired,
        minutesTime: PropTypes.string.isRequired,
    }).isRequired,
    handleCheck: PropTypes.func.isRequired,
    checkedList: PropTypes.instanceOf(Set).isRequired,
    setIsPopUp_OutputComponent: PropTypes.func.isRequired,
    handleEditData: PropTypes.func.isRequired,
    setActiveCard: PropTypes.func.isRequired,
};


export default Cards




