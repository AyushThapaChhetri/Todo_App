import { useEffect, useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';

import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
// import { IoTimerOutline } from "react-icons/io5";
import Popup from "./Popup";
import PropTypes from 'prop-types';
// import DropArea from './DropArea';





// const Output = ({ item, setItem, setActiveCard, onDrop }) => {
const Output = ({ item, setItem, checkedList, setCheckedList, setActiveCard }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);


    //State managing the Checklist
    // const [checkedList, setCheckedList] = useState(new Set());
    // const [isTodoChecked, setIsTodoChecked] = useState(false);
    // const [isTodoInProgressChecked, setIsTodoInProgressChecked] = useState(false);

    // const [completedTodo, setCompletedTodo] = useState([]);


    // checkedList data when refreshed is able to restore the checked box 
    useEffect(() => {
        const storedData = localStorage.getItem("checkboxInformation");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setCheckedList(new Set(parsedData)); // Ensure it's a valid Set
                }
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
            }
        }
    }, []);



    // every checkedList is updation renders dom
    useEffect(() => {
        if (checkedList.size > 0) {
            localStorage.setItem("checkboxInformation", JSON.stringify([...checkedList]));
        } else {
            localStorage.removeItem("checkboxInformation");  // Only remove when explicitly empty
        }
    }, [checkedList]);


    function handleCheck(value) {


        //Changing the data to completed when clicking the checkbox button
        const newState = {
            id: value.id ? value.id : '',
            projectName: value.projectName ? value.projectName : '',
            taskName: value.taskName ? value.taskName : '',
            priority: value.priority ? value.priority : 'medium',
            progressStatus: (value.progressStatus) && !(checkedList.has(value.id)) ? 'completed' : 'todo',
            startDate: value.startDate ? value.startDate : '',
            endDate: value.endDate ? value.endDate : '',
            hoursTime: value.hoursTime ? value.hoursTime : '',
            minutesTime: value.minutesTime ? value.minutesTime : '',
            secondsTime: value.secondsTime ? value.secondsTime : ''
        };
        // console.log(newState);

        setItem((prevItem) => {
            let updatedItems;
            if (value.id) {
                updatedItems = prevItem.map((item) =>
                    (item.id === value.id) ? newState : item
                );
            }
            // console.log(updatedItems);
            // Save the updated items to localStorage
            localStorage.setItem("myObj1", JSON.stringify(updatedItems));
            return updatedItems;
        });

        // setcompletedTodo((prev) =>{

        // })

        // setting checked list data
        setCheckedList((prev) => {

            const newCheckedState = new Set([...prev]);

            // console.log(value.id);
            //if already value in the set then remove from it else populate it
            (newCheckedState.has(value.id)) ? newCheckedState.delete(value.id) : newCheckedState.add(value.id);
            return newCheckedState;
        });
    }
    // function handleTodoToCompleteSection(checkboxData) {
    //     console.log(checkboxData);
    // }

    // Handling edit data
    function handleEditData(data) {
        // console.log(data);
        // console.log(editData);
        setEditData(data);
        // console.log(editData);
    }
    // const isChecked = checkedList.has(e.id);

    // item.forEach(e => console.log(e));
    // (item ?? []).filter((e) => e.progressStatus === "progress").forEach(e => console.log(e));

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
                        {/* <div className='output-sub2 Timeline'>
                            <IoTimerOutline />
                            <p>
                                Timeline
                            </p>
                        </div> */}
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
                                                checkedList={checkedList}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
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
                                                checkedList={checkedList}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
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
                                                checkedList={checkedList}
                                                setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                                handleEditData={handleEditData}
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



                                    <button type='button' onClick={() => setIsPopUp_OutputComponent((prev) => !prev)} className='closePopup'>
                                        X
                                    </button>
                                    <Popup
                                        editData={editData}
                                        setItem={setItem}
                                        setIsPopUp_OutputComponent={setIsPopUp_OutputComponent}
                                        checkedList={checkedList}
                                        setCheckedList={setCheckedList} />

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
    checkedList: PropTypes.instanceOf(Set), // Corrected to expect a Set
    setCheckedList: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
};

export default Output
