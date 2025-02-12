// import { useEffect, useState } from 'react'
import "../Css/InputField.css"
import PropTypes from 'prop-types';
// import Output from './Output';
import Popup from './Popup'
// import { CiKeyboard } from "react-icons/ci";



const InputField = ({ item, setItem, checkedList, setCheckedList, isPopUpVisible, setPopUpVisible }) => {


    // useEffect(() => {

    //     const rawData = localStorage.getItem("myObj1");
    //     const dataReceived = JSON.parse(rawData) || [];
    //     console.log("Parsed data:", dataReceived);
    // },[]);


    const handleButtonClick = () => {
        // console.log("Buttonclicked");
        setPopUpVisible(!isPopUpVisible);
        // console.log(isPopUpVisible);
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
                                    {/* <Popup item={item} setItem={setItem} isSameDate={isSameDate} setIsSameDate={setIsSameDate} /> */}
                                    <Popup item={item} checkedList={checkedList} setCheckedList={setCheckedList} setItem={setItem} />
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
    checkedList: PropTypes.instanceOf(Set), // Corrected to expect a Set
    setCheckedList: PropTypes.func,
};

export default InputField
