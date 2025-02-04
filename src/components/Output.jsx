import React, { useEffect, useState } from 'react'
import "../Css/Output.css"
import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";




const Output = ({ item }) => {

    // console.log(item);
    // console.log((item ?? []).map((e) => ({
    //     id: e.id,
    //     projectName: e.projectName,
    //     taskName: e.taskName,
    //     priority: e.priority,
    //     startDate: e.startDate,
    //     endDate: e.endDate
    // })));

    // console.log(item);
    // const yellow = item.map((e) => ({
    //     id: e.id,
    //     projectName: e.projectName,
    //     taskName: e.taskName,
    //     priority: e.priority,
    //     startDate: e.startDate,
    //     endDate: e.endDate
    // }));


    //State managing the Checklist
    const [checkedList, setCheckedList] = useState(new Set());

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

                    {(item ?? []).map((e) => {
                        const isChecked = checkedList.has(e.id);
                        {/* console.log(isChecked); */ }
                        return (
                            <div key={e.id}>

                                {(!isChecked) && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} />}
                            </div>
                        );
                    })
                    }
                    {(item ?? []).map((e) => {
                        const isChecked = checkedList.has(e.id);
                        {/* console.log(isChecked); */ }
                        return (
                            <div key={e.id}>
                                {isChecked && <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} />}
                            </div>
                        );
                    })
                    }


                    {/* {(item ?? [])

                        .filter((e) => !(checkedList).has(e.id))
                        .map((e) => {
                            return (
                                <div key={e.id}>
                                    <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} />
                                </div>
                            );
                        })

                    }
                    {(item ?? [])

                        .filter((e) => (checkedList).has(e.id))
                        .map((e) => {
                            return (
                                <div key={e.id}>
                                    <Cards cardsData={e} handleCheck={handleCheck} checkedList={checkedList} />
                                </div>
                            );
                        })

                    } */}

                </div>

            </div>


        </>
    );
}

export default Output
