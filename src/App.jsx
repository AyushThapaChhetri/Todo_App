import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import InputField from './components/InputField'
import Output from './components/Output'


import './App.css'
import { useNavigate } from 'react-router-dom'


function App() {
  //lifted State to manage local storage
  const [item, setItem] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  // const [activeCard, setActiveCard] = useState(null);
  const [isFetch, setIsFetch] = useState(false);
  const [searchField, setSearchField] = useState('');


  // console.log(activeCard);


  // const onDrop = (status, position) => {
  //   console.log(
  //     `${activeCard} is going to place in ${status} at ${position}`
  //   );
  // }



  //When page reload set the local storage with all the changes made
  const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("authToken");
    if (!token || token.trim() === "") {
      navigate("/login");
    }
    const rawData = localStorage.getItem("myObj1");
    const parsedData = JSON.parse(rawData) || [];
    setItem(parsedData);
    setIsFetch(false);
  }, [isFetch, navigate]);

  // toast.error("Signup Successful");


  return (

    <>
      <div className="appContainer">
        <div className="navbarContainer">
          <Navbar />
        </div>
        {/* <h5 style={{ zIndex: 1000, paddingTop: "50px", position: 'fixed' }}>ActiveCard - {activeCard}</h5> */}
        <div className='bodyContainer'>
          <div className="inputfield-container">
            <InputField item={item} setItem={setItem} setIsFetch={setIsFetch} isPopUpVisible={isPopUpVisible} setPopUpVisible={setPopUpVisible} searchField={searchField} setSearchField={setSearchField} />
          </div>

          <div className="outputContainer">

            {/* <Output item={item} setItem={setItem} checkedList={checkedList} setCheckedList={setCheckedList} setActiveCard={setActiveCard} onDrop={onDrop} /> */}
            {/* <Output item={item} setItem={setItem} setIsFetch={setIsFetch} searchField={searchField} setActiveCard={setActiveCard} /> */}
            <Output item={item} setItem={setItem} setIsFetch={setIsFetch} searchField={searchField} />
          </div>
        </div>
      </div>
    </>
  )
}


export default App

