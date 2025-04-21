// import React from 'react'
import handleDelete from '../utils/delete';
import handleCheckbox from '../utils/handleCheckbox'
import Cards from './Cards';
import Popup from "./Popup";
import PropTypes from 'prop-types';
import '../css/BoardView.css';

// const BoardView = ({ item, setItem, searchField, setIsFetch, setActiveCard, editData, setEditData, isPopUp_OutputComponent, setIsPopUp_OutputComponent }) => {
const BoardView = ({ item, setItem, searchField, setIsFetch, editData, setEditData, isPopUp_OutputComponent, setIsPopUp_OutputComponent }) => {

    // filtering the output if it matches the search result and status
    const filteredTodoItems = (item ?? [])
        .filter((e) => e.progressStatus === "todo")
        .filter((e) => e.taskName.toLowerCase().includes(searchField.toLowerCase()));
    const filteredProgressItems = (item ?? [])
        .filter((e) => e.progressStatus === "progress")
        .filter((e) => e.taskName.toLowerCase().includes(searchField.toLowerCase()));
    const filteredCompletedItems = (item ?? [])
        .filter((e) => e.progressStatus === "completed")
        .filter((e) => e.taskName.toLowerCase().includes(searchField.toLowerCase()));

    // console.log(typeof isPopUp_OutputComponent);

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    const parseDateOrTime = (task) => {
        // Check if it's stored as a full date
        if (task.endDate?.trim()) {
            return new Date(task.endDate.trim());
        }

        // Otherwise use hours/minutes/seconds
        const hours = parseInt(task.hoursTime || "0", 10);
        const minutes = parseInt(task.minutesTime || "0", 10);
        const seconds = parseInt(task.secondsTime || "0", 10);

        const now = new Date(); // today
        now.setHours(hours, minutes, seconds, 0);
        return now;
    };

    const sortByPriorityThenDate = (a, b) => {
        const priorityDiff =
            priorityOrder[a.priority.trim()] - priorityOrder[b.priority.trim()];
        if (priorityDiff !== 0) return priorityDiff;

        const dateA = parseDateOrTime(a);
        const dateB = parseDateOrTime(b);
        return dateA - dateB;
    };


    // Handling edit data , card info retrieval when clicking edit button in each card fetches it info
    function handleEditData(data) {
        setEditData(data);
    }


    // When checkbox is clicked and unclicked in each card
    function handleCheck(value) {

        //utils Handle Chekbox function
        handleCheckbox(value, setIsFetch);
        // setIsFetch(true);
    }


    // Handling delete operation performed in each card (Clicking delete button exectues this function)
    function handleDeleteDataEditComp(deleteData) {
        //utils delete function
        handleDelete(deleteData, setIsFetch);
    }

    return (
        <>
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
                            {/* initial */}
                            {/* {filteredTodoItems
                                
                                .map((e) => (
                                    <Cards
                                        key={e.id}
                                        cardsData={e}
                                        handleCheck={handleCheck}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        handleEditData={handleEditData}
                                        handleDeleteDataEditComp={handleDeleteDataEditComp}
                                    // setActiveCard={setActiveCard}
                                    />
                                ))
                            } */}
                            {filteredTodoItems
                                .slice()
                                .sort(sortByPriorityThenDate)
                                .map((e) => (
                                    <Cards
                                        key={e.id}
                                        cardsData={e}
                                        handleCheck={handleCheck}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        handleEditData={handleEditData}
                                        handleDeleteDataEditComp={handleDeleteDataEditComp}
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
                                .slice()
                                .sort(sortByPriorityThenDate)
                                .map((e) => (
                                    <Cards
                                        key={e.id}
                                        cardsData={e}
                                        handleCheck={handleCheck}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        handleEditData={handleEditData}
                                        handleDeleteDataEditComp={handleDeleteDataEditComp}
                                    />
                                ))
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
                                .slice()
                                .sort(sortByPriorityThenDate)
                                .map((e) => (
                                    <Cards
                                        key={e.id}
                                        cardsData={e}
                                        handleCheck={handleCheck}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        handleEditData={handleEditData}
                                        handleDeleteDataEditComp={handleDeleteDataEditComp}
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
                                        item={item}
                                        editData={editData}
                                        setItem={setItem}
                                        setIsFetch={setIsFetch}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                    />
                                </div>

                            </div>
                        </div>

                    </>
                    )}


            </div>
        </>
    )
}

export default BoardView

BoardView.propTypes = {
    item: PropTypes.array.isRequired,
    setItem: PropTypes.func.isRequired,
    searchField: PropTypes.string.isRequired,
    setSearchField: PropTypes.func,
    setIsFetch: PropTypes.func.isRequired,
    editData: PropTypes.object,
    // setActiveCard: PropTypes.func.isRequired,
    setEditData: PropTypes.func.isRequired,
    setIsPopUp_OutputComponent: PropTypes.func.isRequired,
    isPopUp_OutputComponent: PropTypes.bool.isRequired,
}