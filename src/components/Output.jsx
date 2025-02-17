import { useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
import Popup from "./Popup";
import PropTypes from 'prop-types';
import handleDelete from '../utils/delete';
// import DropArea from './DropArea';





// const Output = ({ item, setItem, setActiveCard, onDrop }) => {

const Output = ({ item, setItem, setIsFetch, setActiveCard }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);



    // When checkbox is clicked and unclicked in each card
    function handleCheck(value) {

        //Changing the data to completed when clicking the checkbox button
        const newState = {
            id: value.id ? value.id : '',
            projectName: value.projectName ? value.projectName : '',
            taskName: value.taskName ? value.taskName : '',
            priority: value.priority ? value.priority : 'medium',
            progressStatus: (value.progressStatus != "completed") ? 'completed' : 'todo',
            startDate: value.startDate ? value.startDate : '',
            endDate: value.endDate ? value.endDate : '',
            hoursTime: value.hoursTime ? value.hoursTime : '',
            minutesTime: value.minutesTime ? value.minutesTime : '',
            secondsTime: value.secondsTime ? value.secondsTime : ''
        };


        setItem((prevItem) => {
            let updatedItems;
            if (value.id) {
                updatedItems = prevItem.map((item) =>
                    (item.id === value.id) ? newState : item
                );
            }
            // Save the updated items to localStorage
            localStorage.setItem("myObj1", JSON.stringify(updatedItems));
            return updatedItems;
        });
    }


    // Handling edit data , card info retrieval when clicking edit button in each card fetches it info
    function handleEditData(data) {
        setEditData(data);
    }

    // Handling delete operation performed in each card (Clicking delete button exectues this function)
    function handleDeleteDataEditComp(deleteData) {

        handleDelete(deleteData, item);
        setIsFetch(true);
    }

    return (
        <>
            <div className='output-OuterContainer'>
                <div className='output-InnerContainer oIcOne'>
                    <div className='output-subContainer sub1'>
                        <div>
                            <SlCalender className='sub1Calender' />
                        </div>
                        <p>
                            Day Planning
                        </p>
                    </div>

                    <div className='output-subContainer sub2'>
                        <div className='output-sub2 List'>
                            <CiCircleList />
                            <p>
                                List
                            </p>

                        </div>
                        <div className='output-sub2 Board'>
                            <IoMdClipboard />
                            <p>
                                Board
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className='output-list'>Today</div> */}
                <div className="outputMultipleCards">
                    {/* todo */}
                    {(item ?? [])
                        .some((e) => e.progressStatus === 'todo') && (
                            <>
                                <div className='outputProgressCards todo_todoSections' >
                                    {(item ?? [])
                                        .some((e) => e.progressStatus === 'todo') && (
                                            <>
                                                <p className='outputTodoCardsPara'>TODO</p>

                                            </>
                                        )}

                                    {/* {(!isTodoChecked) && <DropArea />} */}
                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "todo")
                                        .map((e) => (
                                            <Cards
                                                key={e.id}
                                                cardsData={e}
                                                handleCheck={handleCheck}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
                                                handleDeleteDataEditComp={handleDeleteDataEditComp}
                                                setActiveCard={setActiveCard}
                                            />
                                        ))
                                    }
                                </div>
                            </>
                        )}
                    {/* progress */}
                    {(item ?? [])
                        .some((e) => e.progressStatus === 'progress') && (
                            <>
                                <div className='outputProgressCards todo_progressSections'>
                                    {(item ?? [])
                                        .some((e) => e.progressStatus === 'progress') && (
                                            <>
                                                <p className='outputTodoCardsPara'>IN PROGRESS</p>

                                            </>
                                        )}

                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "progress")
                                        .map((e) =>
                                        (
                                            <Cards
                                                key={e.id}
                                                cardsData={e}
                                                handleCheck={handleCheck}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
                                                handleDeleteDataEditComp={handleDeleteDataEditComp}
                                                setActiveCard={setActiveCard}
                                            />
                                        )
                                        )
                                    }

                                </div>
                            </>
                        )}
                    {/* completed todo  */}
                    {(item ?? [])
                        .some((e) => e.progressStatus === 'completed') && (
                            <>
                                <div className='outputProgressCards todo_CompletedSections'>
                                    {(item ?? [])
                                        .some((e) => e.progressStatus === 'completed') && (
                                            <>
                                                <p className='outputTodoCardsPara'>COMPLETED</p>

                                            </>
                                        )}

                                    {/* <DropArea /> */}

                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "completed")
                                        .map((e) => (
                                            <Cards
                                                key={e.id}
                                                cardsData={e}
                                                handleCheck={handleCheck}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
                                                handleDeleteDataEditComp={handleDeleteDataEditComp}
                                                setActiveCard={setActiveCard}
                                            />
                                        ))
                                    }
                                </div>
                            </>
                        )}

                    {/* isPopUp_OutputComponent when set to true runs popup form component */}
                    {isPopUp_OutputComponent &&
                        (<>

                            <div className='popupBox-Wrapper'>
                                <div className='popupBox'>
                                    <div className="popupBoxFormContainerImage">
                                    </div>
                                    <div className="popupFormDataContainerInputField">


                                        <button type='button' onClick={() => setIsPopUp_OutputComponent((prev) => !prev)} className='closePopup'>
                                            X
                                        </button>

                                        <Popup
                                            editData={editData}
                                            setItem={setItem}
                                            setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        />
                                    </div>

                                </div>
                            </div>

                        </>
                        )}


                </div>

            </div>


        </>
    );
}

Output.propTypes = {
    item: PropTypes.array.isRequired,   // Corrected PropTypes import
    setItem: PropTypes.func.isRequired,
    setActiveCard: PropTypes.func.isRequired,
    setIsFetch: PropTypes.func.isRequired,
    // onDrop: PropTypes.func.isRequired,

};

export default Output
