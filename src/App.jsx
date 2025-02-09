import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import InputField from './components/InputField'
import Output from './components/Output'

import './App.css'


function App() {
  //lifted State to manage local storage
  const [item, setItem] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);


  useEffect(() => {
    const rawData = localStorage.getItem("myObj1");
    const parsedData = JSON.parse(rawData) || [];
    setItem(parsedData)
  }, []);

  return (
    <>
      <div className="appContainer">
        <div className="navbarContainer">
          <Navbar />
        </div>
        <div className='bodyContainer'>
          <div className="inputfield-container">
            <InputField item={item} setItem={setItem} isPopUpVisible={isPopUpVisible} setPopUpVisible={setPopUpVisible} />
          </div>

          <div className="outputContainer">
            {/* <Output item={item} isPopUpVisible={isPopUpVisible} setPopUpVisible={setPopUpVisible} /> */}
            <Output item={item} setItem={setItem} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

