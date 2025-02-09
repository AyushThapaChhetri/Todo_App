import { useEffect, useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
// import { IoTimerOutline } from "react-icons/io5";
import Popup from "./Popup";
import PropTypes from 'prop-types';




const Output = ({ item, setItem }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);


    //State managing the Checklist
    const [checkedList, setCheckedList] = useState(new Set());





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


    useEffect(() => {
        if (checkedList.size > 0) {
            localStorage.setItem("checkboxInformation", JSON.stringify([...checkedList]));
        } else {
            localStorage.removeItem("checkboxInformation");  // Only remove when explicitly empty
        }
    }, [checkedList]);

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

Output.propTypes = {
    item: PropTypes.array.isRequired,   // Corrected PropTypes import
    setItem: PropTypes.func.isRequired,
};

export default Output
