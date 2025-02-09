import React, { useEffect, useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";
import Popup from "./Popup";




const Output = ({ item, setItem }) => {
    // const Output = ({ item }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);
    const [isEditHoursFormat, setIsEditHoursFormat] = useState(false);

    // console.log('before');
    // console.log(isEditHoursFormat);
    // console.log('after');

    //State managing the Checklist
    const [checkedList, setCheckedList] = useState(new Set());
    // const [isPopup, setPopUpVisible] = useState(false);

    // console.log(isPopUpVisible);

    useEffect(() => {
        let deserializedData = JSON.parse(localStorage.getItem("checkboxInformation")) || [];
        let restoreListValues = new Set(deserializedData);
        setCheckedList(restoreListValues);
    }, []);

    //updating local storage with clickedCards
    let checkedListData = [...checkedList];
    (checkedListData.length > 0) ? localStorage.setItem("checkboxInformation", JSON.stringify(checkedListData)) : [];

    //looping through the keys checking type
    // for (const x of checkedList.keys()) {
    //     console.log(typeof (x));
    // };

    function handleCheck(value) {

        setCheckedList((prev) => {

            const newCheckedState = new Set([...prev]);


            //if already value in the set then remove from it else populate it
            (newCheckedState.has(value)) ? newCheckedState.delete(value) : newCheckedState.add(value);
            return newCheckedState;
        }
        );
    }

    function handleEditData(data) {
        // console.log(data);
        // console.log(editData);
        setEditData(data);
        // console.log(editData);
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
                        <div className='output-sub2 Timeline'>
                            <IoTimerOutline />
                            <p>
                                Timeline
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className='output-list'>Today</div> */}
                <div className="outputMultipleCards">
                    {(item ?? [])
                        .some((e) => e.progressStatus === 'todo') && (
                            <>
                                <div className='outputTodoCards todo_progressSections'>

                                    <p className='outputTodoCardsPara'>TODO</p>

                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "todo")
                                        .map((e) => {
                                            const isChecked = checkedList.has(e.id);
                                            {/* console.log(isChecked); */ }
                                            return (
                                                <div key={e.id} className={(!isChecked) ? `cardsShow` : `cardsHide`}>

                                                    {(!isChecked) && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} handleEditData={handleEditData} />}
                                                </div>
                                            );
                                        })
                                    }
                                    {/* Check if any item is completed (checked) */}
                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "todo")
                                        .some((e) => checkedList.has(e.id)) && (
                                            <p className='outputTodoCardsPara'>COMPLETED</p>
                                        )}
                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "todo")
                                        .map((e) => {
                                            const isChecked = checkedList.has(e.id);
                                            {/* console.log(isChecked); */ }
                                            return (
                                                <div key={e.id} className={(isChecked) ? `cardsShow` : `cardsHide`}>

                                                    {(isChecked) && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} handleEditData={handleEditData} />}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )}

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
                                        .map((e) => {
                                            const isChecked = checkedList.has(e.id);
                                            {/* console.log(isChecked); */ }
                                            return (
                                                <div key={e.id} className={(!isChecked) ? `cardsShow` : `cardsHide`}>

                                                    {(!isChecked) && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} handleEditData={handleEditData} />}
                                                </div>
                                            );
                                        })
                                    }
                                    {/* Check if any item is completed (checked) */}
                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "progress")
                                        .some((e) => checkedList.has(e.id)) && (
                                            <p className='outputTodoCardsPara'>COMPLETED</p>
                                        )}

                                    {(item ?? [])
                                        .filter((e) => e.progressStatus === "progress")
                                        .map((e) => {
                                            const isChecked = checkedList.has(e.id);
                                            {/* console.log(isChecked); */ }
                                            return (
                                                <div key={e.id} className={(isChecked) ? `cardsShow` : `cardsHide`}>

                                                    {(isChecked) && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} handleEditData={handleEditData} />}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )}


                    {isPopUp_OutputComponent &&
                        (<>

                            <div className='popupBox-Wrapper'>
                                <div className='popupBox'>
                                    <button type='button' onClick={() => setIsPopUp_OutputComponent((prev) => !prev)} className='closePopup'>
                                        X
                                    </button>
                                    <Popup editData={editData} setItem={setItem} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} />

                                </div>
                            </div>

                        </>
                        )}


                </div>

            </div>


        </>
    );
}

export default Output
