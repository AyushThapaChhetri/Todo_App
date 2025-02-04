import React, { useEffect, useState } from 'react'
import "../Css/InputField.css"
// import Output from './Output';
import Popup from './Popup'
// import { CiKeyboard } from "react-icons/ci";



const InputField = ({ item, setItem }) => {
    // const [input, setInput] = useState();
    // const [item, setItem] = useState([]);
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    // const [item, setItem] = useState([]);

    // useEffect(() => {
    //     const rawData = localStorage.getItem("myObj1");
    //     const dataReceived = JSON.parse(rawData) || [];
    //     console.log("Parsed data:", dataReceived);
    // }, []);


    /*
        function changesInput(e) {
            // console.log(e.target.value);
            setInput(e.target.value);
        }
    
        // On component load, get the data from localStorage (if any)
        useEffect(() => {
            // Get existing data from localStorage (or empty array if no data)
            const storedItems = JSON.parse(localStorage.getItem('myObj1')) || [];
            setItem(storedItems); // Set it to state
        }, []);  // Empty dependency array to run this only once when the component mounts
    
        //Function to handle the submition of the form
        function handleSubmit(event) {
            event.preventDefault();
            // console.log(input);
    
            // let joinedInput = "";
            // joinedInput += input;
            // console.log(joinedInput);
            // helloo        how        are     you?
    
            // Trim the whitespaces
            if (input.trim() === "") {
                alert("Vai khali thau narakh");
                setInput("");
                return false;
            } else {
                const newItem = { name: input, id: Date.now() };
    
                // Update state and localStorage
                setItem((prevItem) => {
                    const updatedItems = [...prevItem, newItem];
                    localStorage.setItem("myObj1", JSON.stringify(updatedItems)); // Sync localStorage
                    return updatedItems;
                });
    
                setInput(""); // Clear input field
    
    
            }
            // console.log(JSON.parse(localStorage.getItem("myObj1")));
    
    
        }
        */

    // console.log(isPopUpVisible);
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
                                <Popup item={item} setItem={setItem} />
                            </div>
                        </div>

                    </>
                    )}
            </div>

            {/* <Output item={item} /> */}
            {/* <Output /> */}
            {/* <Output item={item} joinedInput={joinedInput} /> */}

        </>
    )
}

export default InputField
