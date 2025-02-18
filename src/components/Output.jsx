import { useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
import Popup from "./Popup";
import PropTypes from 'prop-types';
import handleDelete from '../utils/delete';
import handleCheckbox from '../utils/handleCheckbox'
// import DropArea from './DropArea';





// const Output = ({ item, setItem, setActiveCard, onDrop }) => {

const Output = ({ item, setItem, searchField, setIsFetch, setActiveCard }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);


    // let searchedItem = item.filter(e => e.taskName.toLowerCase().includes(searchField));
    // console.log(searchedItem);

    // filtering the output if it matches the search result and status
    const filteredTodoItems = (item ?? [])
        .filter((e) => e.progressStatus === "todo")
        .filter((e) => e.taskName.toLowerCase().includes(searchField));
    const filteredProgressItems = (item ?? [])
        .filter((e) => e.progressStatus === "progress")
        .filter((e) => e.taskName.toLowerCase().includes(searchField));
    const filteredCompletedItems = (item ?? [])
        .filter((e) => e.progressStatus === "completed")
        .filter((e) => e.taskName.toLowerCase().includes(searchField));

    // When checkbox is clicked and unclicked in each card
    function handleCheck(value) {

        //utils Handle Chekbox function
        handleCheckbox(value, item);
        setIsFetch(true);
    }


    // Handling edit data , card info retrieval when clicking edit button in each card fetches it info
    function handleEditData(data) {
        setEditData(data);
    }

    // Handling delete operation performed in each card (Clicking delete button exectues this function)
    function handleDeleteDataEditComp(deleteData) {
        //utils delete function
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
                    {filteredTodoItems.length > 0 && (
                        <>
                            <div className='outputProgressCards todo_todoSections' >
                                {(item ?? [])
                                    .some((e) => e.progressStatus === 'todo') && (
                                        <>
                                            <p className='outputTodoCardsPara'>TODO</p>

                                        </>
                                    )}

                                {/* {(!isTodoChecked) && <DropArea />} */}
                                {filteredTodoItems
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
                    {filteredProgressItems.length > 0 && (
                        <>
                            <div className='outputProgressCards todo_progressSections'>
                                {(item ?? [])
                                    .some((e) => e.progressStatus === 'progress') && (
                                        <>
                                            <p className='outputTodoCardsPara'>IN PROGRESS</p>

                                        </>
                                    )}

                                {filteredProgressItems
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
                    {filteredCompletedItems.length > 0 && (
                        <>
                            <div className='outputProgressCards todo_CompletedSections'>
                                {(item ?? [])
                                    .some((e) => e.progressStatus === 'completed') && (
                                        <>
                                            <p className='outputTodoCardsPara'>COMPLETED</p>

                                        </>
                                    )}

                                {/* <DropArea /> */}

                                {filteredCompletedItems
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
    searchField: PropTypes.string.isRequired,

};

export default Output
