// import { useEffect, useState } from 'react'
import '../css/Cards.css'
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
// import { HiDotsHorizontal } from "react-icons/hi";
import PropTypes from 'prop-types';
// import Edits from "./Edits"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



const Cards = ({ cardsData, handleCheck, handleDeleteDataEditComp, setIsPopUp_OutputComponent, handleEditData, setActiveCard }) => {


    // const [isEditOptions, setIsEditOptions] = useState(false);

    function capitalizerFunc(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    let capitalizedProjectName = capitalizerFunc(cardsData.projectName);
    let capitalizedTaskName = capitalizerFunc(cardsData.taskName);
    let captializedPriority = capitalizerFunc(cardsData.priority);



    return (
        <>
            <div className="cards-outerContainer" draggable onDragStart={() => setActiveCard(cardsData.id)} onDragEnd={() => setActiveCard(null)}>
                <div


                    className={`cards-innerContainer ${(cardsData.progressStatus === "completed") ? "blured" : ""}`}
                >
                    <div className='cards-subInner cSisub1'>
                        <div className='sub1cSisub1'>
                            <FaCalendarAlt className='cards-icon' />
                            <p className='output-para'>

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

                            <FaEdit
                                className='edit-icon-cards'
                                onClick={() => {

                                    setIsPopUp_OutputComponent((prev) => !prev);

                                    handleEditData(cardsData);

                                }}

                            />

                        </div>

                        <div className='sub2cSisub1'>
                            <MdAccessTime className='sub2cSisub1-timeIcon' />
                            <p className='sub2cSisub1-para'>
                                {(cardsData.endDate.length === 0) ?
                                    (!(cardsData.hoursTime == 0) ? cardsData.hoursTime + ` hours ` : '') +
                                    (!(cardsData.minutesTime == 0) ? cardsData.minutesTime + ` minutes ` : '') +
                                    (((cardsData.hoursTime == 0 && cardsData.minutesTime == 0 && cardsData.secondsTime != 0) ? (cardsData.secondsTime + ` seconds`) : '')) :
                                    cardsData.endDate}
                            </p>
                        </div>
                    </div>

                    <div className='cards-subInner cSisub2'>
                        <input
                            type="checkbox"
                            id={cardsData.id}
                            className='checkbox-check'
                            checked={cardsData.progressStatus === "completed"}

                            // function handle check is defined in the output component
                            onChange={() => (handleCheck(cardsData))}
                            name={cardsData.id}
                            value={cardsData.id}
                        />





                        <MdDeleteForever
                            className='delete-icon-cards'
                            onClick={() => {
                                handleDeleteDataEditComp(cardsData)
                            }}
                        />



                        {/* <HiDotsHorizontal onClick={() => {
                            setEdiTData(cardsData)
                            setPopUpVisible((prev) => !prev)
                        }} /> */}
                        {/* <HiDotsHorizontal
                            onMouseEnter={() => setIsEditOptions(true)}
                            onMouseLeave={() => setIsEditOptions(false)}
                            style={{ cursor: "pointer" }}

                        /> */}


                        {/* {(isEditOptions) && <Edits
                            cardsData={cardsData}
                            handleEditData={handleEditData}
                            setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                            handleDeleteDataEditComp={handleDeleteDataEditComp}
                            setIsEditOptions={setIsEditOptions}

                        />} */}

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
        progressStatus: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        hoursTime: PropTypes.string.isRequired,
        minutesTime: PropTypes.string.isRequired,
        secondsTime: PropTypes.string.isRequired,
    }).isRequired,
    handleCheck: PropTypes.func.isRequired,
    setIsPopUp_OutputComponent: PropTypes.func.isRequired,
    handleEditData: PropTypes.func.isRequired,
    setActiveCard: PropTypes.func.isRequired,
    handleDeleteDataEditComp: PropTypes.func.isRequired,
    // handleTodoToCompleteSection: PropTypes.func.isRequired,

};


export default Cards




