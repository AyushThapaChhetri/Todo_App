import { useState } from 'react'
import "../Css/Output.css"
// import Cards from './Cards';
import { SlCalender } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { IoMdClipboard } from "react-icons/io";
// import Popup from "./Popup";
import PropTypes from 'prop-types';

import BoardView from './BoardView';
// import DropArea from './DropArea';





// const Output = ({ item, setItem, setActiveCard, onDrop }) => {

const Output = ({ item, setItem, setIsFetch, searchField, setActiveCard }) => {
    const [editData, setEditData] = useState(null);
    const [isPopUp_OutputComponent, setIsPopUp_OutputComponent] = useState(false);


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
                <BoardView item={item} setItem={setItem} searchField={searchField} setIsFetch={setIsFetch} setActiveCard={setActiveCard} editData={editData} setEditData={setEditData} isPopUp_OutputComponent={isPopUp_OutputComponent} setIsPopUp_OutputComponent={setIsPopUp_OutputComponent} />


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
