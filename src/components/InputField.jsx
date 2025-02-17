// import { useEffect, useState } from 'react'
import "../Css/InputField.css"
import PropTypes from 'prop-types';
// import Output from './Output';
import Popup from './Popup'





const InputField = ({ item, setItem, isPopUpVisible, setPopUpVisible }) => {


    const handleButtonClick = () => {
        setPopUpVisible(!isPopUpVisible);
    }

    return (
        <>
            <div className='div-outerInput'>
                <div className='div-innerInput'>
                    <div className='searchbarContainer'>
                        <input type='text' id='userSearchInput' className='searchField' placeholder="Search Todos Please" required />
                    </div>
                    <button type='button' className='button-input' onClick={handleButtonClick}><span><b>+</b>&nbsp;&nbsp;New Project</span></button>
                </div>
                {isPopUpVisible &&
                    (<>

                        <div className='popupBox-Wrapper'>
                            <div className='popupBox'>
                                <div className="popupBoxFormContainerImage">
                                </div>
                                <div className="popupFormDataContainerInputField">

                                    <button type='button' onClick={handleButtonClick} className='closePopup'>
                                        X
                                    </button>
                                    <Popup item={item} setItem={setItem} />
                                </div>
                            </div>
                        </div>

                    </>
                    )}
            </div>
        </>
    )
}

// Prop validation
InputField.propTypes = {
    item: PropTypes.array.isRequired,        // Assuming 'item' is an array
    setItem: PropTypes.func.isRequired,      // Assuming 'setItem' is a function
    isPopUpVisible: PropTypes.bool.isRequired,   // Assuming 'isPopUpVisible' is a boolean
    setPopUpVisible: PropTypes.func.isRequired,  // Assuming 'setPopUpVisible' is a function
};

export default InputField
