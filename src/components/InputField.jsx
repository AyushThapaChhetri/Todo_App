import React, { useEffect, useState } from 'react'
import "../Css/InputField.css"
// import Output from './Output';
import Popup from './Popup'
// import { CiKeyboard } from "react-icons/ci";



const InputField = ({ item, setItem, isPopUpVisible, setPopUpVisible }) => {


    // useEffect(() => {
    //     const rawData = localStorage.getItem("myObj1");
    //     const dataReceived = JSON.parse(rawData) || [];
    //     console.log("Parsed data:", dataReceived);
    // }, []);


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
                                <button type='button' onClick={handleButtonClick} className='closePopup'>
                                    X
                                </button>
                                {/* <Popup item={item} setItem={setItem} isSameDate={isSameDate} setIsSameDate={setIsSameDate} /> */}
                                <Popup item={item} setItem={setItem} />
                            </div>
                        </div>

                    </>
                    )}
            </div>
        </>
    )
}

export default InputField
