import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import InputField from './InputField';

const MoreInfo = () => {
    const location = useLocation();
    const { cardsData } = location.state || {};

    const cardDataName = cardsData.name;
    let todoData = "";
    todoData += cardDataName.charAt(0).toUpperCase() + cardDataName.slice(1);
    // console.log(todoData)

    return (
        <>
            <Navbar />
            {/* <InputField /> */}
            <div>
                <p>
                    more info page
                </p>

                Todo is:<br />{todoData}

                <p>Do you want to make an update to it?</p>

                <input type='text' className='input inputMoreText' />


            </div>
        </>

    )
}

export default MoreInfo
