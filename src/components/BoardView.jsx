// import React from 'react'
import handleDelete from '../utils/delete';
import handleCheckbox from '../utils/handleCheckbox'
import Cards from './Cards';
import Popup from "./Popup";
import PropTypes from 'prop-types';
import '../css/BoardView.css';

const BoardView = ({ item, setItem, searchField, setIsFetch, setActiveCard, editData, setEditData, isPopUp_OutputComponent, setIsPopUp_OutputComponent }) => {

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



    // Handling edit data , card info retrieval when clicking edit button in each card fetches it info
    function handleEditData(data) {
        setEditData(data);
    }


    // When checkbox is clicked and unclicked in each card
    function handleCheck(value) {

        //utils Handle Chekbox function
        handleCheckbox(value, item);
        setIsFetch(true);
    }


    // Handling delete operation performed in each card (Clicking delete button exectues this function)
    function handleDeleteDataEditComp(deleteData) {
        //utils delete function
        handleDelete(deleteData, item);
        setIsFetch(true);
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
    setActiveCard: PropTypes.func.isRequired,
    setEditData: PropTypes.func.isRequired,
    setIsPopUp_OutputComponent: PropTypes.func.isRequired,
    isPopUp_OutputComponent: PropTypes.bool.isRequired,
}