// import React from 'react'
import '../css/Edit.css'
import PropTypes from 'prop-types'
// import '../css/Popup.css'

const Edits = ({ setIsEditOptions, handleDeleteDataEditComp, cardsData, handleEditData, setIsPopUp_OutputComponent }) => {
    return (
        <div
            className="editsOuterContainer"
            onMouseOver={() => setIsEditOptions(true)}
            onMouseOut={() => setIsEditOptions(false)} style={{ cursor: 'pointer' }}>
            <div className="editsInnerContainer" >
                <div className='pointerEditsInnerContainer'></div>
                <div
                    className="editsInnerSubContainer"
                    onClick={() => {
                        setIsPopUp_OutputComponent((prev) => !prev);
                        //edit function is defined in the output Component
                        handleEditData(cardsData);
                    }
                    }
                >

                    <p
                        className='editsInnerContainer-para1'
                    >
                        Edit
                    </p>


                </div>
                <div
                    className='deleteInnerSubContainer'
                    onClick={() => handleDeleteDataEditComp(cardsData)}
                >
                    <p

                    >
                        Delete

                    </p>
                    {/* <button
                        onClick={() => handleDeleteDataEditComp(cardsData)}

                    >
                        Delete
                    </button> */}
                </div>
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
    handleDeleteDataEditComp: PropTypes.func.isRequired,
}