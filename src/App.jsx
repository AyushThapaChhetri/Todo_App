import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import InputField from './components/InputField'
import Output from './components/Output'

import './App.css'


function App() {
  //lifted State to manage local storage
  const [item, setItem] = useState([]);


  useEffect(() => {
    const rawData = localStorage.getItem("myObj1");
    const parsedData = JSON.parse(rawData) || [];
    setItem(parsedData)
    // console.log(item);
    // console.log(parsedData[0].projectName);
  }, []);
  return (
    <>
      <div className="appContainer">
        <div className="navbarContainer">
          <Navbar />
        </div>
        <div className='bodyContainer'>
          <div className="inputfield-container">
            <InputField item={item} setItem={setItem} />
          </div>

          <div className="outputContainer">
            <Output item={item} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

