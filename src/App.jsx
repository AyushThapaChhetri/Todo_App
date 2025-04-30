import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import InputField from './components/InputField'
import Output from './components/Output'
import './App.css'
import { useNavigate } from 'react-router-dom'
import api from './utils/api'


function App() {
  //lifted State to manage local storage
  const [item, setItem] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  // const [activeCard, setActiveCard] = useState(null);
  // const [isFetch, setIsFetch] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
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

    const token = localStorage.getItem("refreshToken");
    if (!token || token.trim() === "") {
      navigate("/login");
      return;
    }

    // console.log("Updated item : ", item);
    // const rawData = localStorage.getItem("myObj1");
    // const parsedData = JSON.parse(rawData) || [];
    // setItem(parsedData);
    const fetchTodos = async () => {
      try {
        const response = await api.get("client/todos");
        // console.log(response.data.serializedTodos);
        // setItem(response.data || []); // Update state with fetched todos
        // setItem(response.data);
        // Convert `id` from string to number
        // console.log("Response data", response);
        // console.log("Response .data", response.data);

        const todosWithNumericId = response.data.data.map(todo => ({
          ...todo,
          id: Number(todo.id) // Convert ID to a number
        }));

        console.log("all todos", todosWithNumericId);
        setItem(todosWithNumericId);
      } catch (error) {
        console.error("Error fetching todos: ", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      } finally {
        setIsFetch(false);
      }
    }

    if (isFetch) {
      fetchTodos();
    }

    // setIsFetch(false);
  }, [isFetch, navigate, item]);

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

