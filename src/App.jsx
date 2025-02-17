import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import InputField from './components/InputField'
import Output from './components/Output'

import './App.css'


function App() {
  //lifted State to manage local storage
  const [item, setItem] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isFetch, setIsFetch] = useState(false);


  // console.log(activeCard);


  // const onDrop = (status, position) => {
  //   console.log(
  //     `${activeCard} is going to place in ${status} at ${position}`
  //   );
  // }



  //When page reload set the local storage with all the changes made
  useEffect(() => {
    const rawData = localStorage.getItem("myObj1");
    const parsedData = JSON.parse(rawData) || [];
    setItem(parsedData);
    setIsFetch(false);
  }, [isFetch]);



  return (
    <>
      <div className="appContainer">
        <div className="navbarContainer">
          <Navbar />
        </div>
        <h5 style={{ zIndex: 1000, paddingTop: "50px", position: 'fixed' }}>ActiveCard - {activeCard}</h5>
        <div className='bodyContainer'>
          <div className="inputfield-container">
            <InputField item={item} setItem={setItem} isPopUpVisible={isPopUpVisible} setPopUpVisible={setPopUpVisible} />
          </div>

          <div className="outputContainer">

            {/* <Output item={item} setItem={setItem} checkedList={checkedList} setCheckedList={setCheckedList} setActiveCard={setActiveCard} onDrop={onDrop} /> */}
            <Output item={item} setItem={setItem} setIsFetch={setIsFetch} setActiveCard={setActiveCard} />
          </div>
        </div>
      </div>
    </>
  )
}


export default App

