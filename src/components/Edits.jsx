// import React from 'react'
import '../css/Edit.css'
import PropTypes from 'prop-types'
// import '../css/Popup.css'

const Edits = ({ setIsEditOptions, cardsData, handleEditData, setIsPopUp_OutputComponent }) => {
    return (
        <div
            className="editsOuterContainer"
            onMouseEnter={() => setIsEditOptions(true)}
            onMouseLeave={() => setIsEditOptions(false)} style={{ cursor: 'pointer' }}>
            <div className="editsInnerContainer" >
                <div className='pointerEditsInnerContainer'></div>
                <div
                    className="editsInnerSubContainer"
                    onClick={() => {
                        // console.log("clicked");
                        setIsPopUp_OutputComponent((prev) => !prev);

                        //Edit Div open
                        // setIsEditOptions((prev) => !prev);

                        //edit function is defined in the output Component
                        handleEditData(cardsData);
                    }
                    }
                >
                    <p className='editsInnerContainer-para1'>
                        Edit
                    </p>
                </div>
                <p>Delete</p>
            </div>
        </div>
    )
}

export default Edits

Edits.propTypes = {
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
    handleEditData: PropTypes.func.isRequired,
    setIsEditOptions: PropTypes.func.isRequired,
    setIsPopUp_OutputComponent: PropTypes.func.isRequired,
}