import React, { useEffect, useState } from 'react'
import '../css/Popup.css'

// const Popup = ({ editData }) => {
const Popup = ({ setItem, editData, setIsPopUp_OutputComponent }) => {

    // const [isSameDate, setIsSameDate] = useState(false); 


    // console.log(editData);
    // const [formData, setFormData] = useState({

    //     // projectName: editData.projectName  ?editData.projecteName : '',
    //     projectName: '',
    //     taskName: '',
    //     priority: 'medium',
    //     progressStatus: 'todo',
    //     startDate: '',
    //     endDate: '',
    //     hoursTime: '',
    //     minutesTime: '',
    //     secondsTime: ''
    // });
    // console.log(isSameDate);

    // useEffect(() => {
    //     if (editData?.endDate === "") {
    //         setIsSameDate(true);
    //     }
    // });




    const [formData, setFormData] = useState({

        // projectName: editData.projectName  ?editData.projecteName : '',
        projectName: editData?.projectName ? editData.projectName : '',
        taskName: editData?.taskName ? editData.taskName : '',
        priority: editData?.priority ? editData.priority : 'medium',
        progressStatus: editData?.progressStatus ? editData.progressStatus : 'todo',
        startDate: editData?.startDate ? editData.startDate : '',
        endDate: editData?.endDate ? editData.endDate : '',
        hoursTime: editData?.hoursTime ? editData.hoursTime : '',
        minutesTime: editData?.minutesTime ? editData.minutesTime : '',
        secondsTime: editData?.secondsTime ? editData.secondsTime : ''
    });

    // NEW STATE VARIABLE: To control time format (calendar or hours)
    const [timeFormat, setTimeFormat] = useState('calendar'); // Default to calendar

    useEffect(() => {
        // Initialize timeFormat based on editData when the component mounts or editData changes
        if (editData?.endDate === "" || editData?.endDate === null || editData?.endDate === undefined) {
            setTimeFormat('hours'); // If endDate is empty, use hours format
        } else {
            setTimeFormat('calendar'); // Otherwise, use calendar format
        }
    }, [editData]);  //Run this effect whenever editData changes



    // On component load, get the data from localStorage (if any)
    // Getting item form the localStorage for updation

    // Handle any of the changes occuring in the form

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value                  //dynamic way of handling form data where input change occurs, it triggers the respective handles with name of it and values
        }));
        // console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();




        if (formData.projectName.trim() === "" || formData.taskName.trim() === "") {
            // console.log("Empty field");
            alert("❌❌❌Khali thau vayo hai vara timi!❌❌❌");

        } else if (timeFormat === 'calendar' && new Date(formData.startDate).getTime() > new Date(formData.endDate).getTime()) { // ADD: Check timeFormat before validating dates

            alert("❌❌❌Start Date Can't be later than End Date! ❌❌❌");

        } else if (timeFormat === 'calendar' && new Date(formData.startDate).getTime() === new Date(formData.endDate).getTime()) { // ADD: Check timeFormat before validating dates
            alert("❌❌❌Start Date Can't be Same as End Date! ❌❌❌\n ⬇️ Assign Hours:Minutes to be finished ⬇️");
            setFormData(prev => ({ ...prev, startDate: "", endDate: "" }));// ADD: Reset dates

        } else {

            //local Storage variable definition 
            const newData = {
                // id: item./length + 1,
                id: editData?.id ? editData.id : Date.now(),
                // id: Date.now(),
                projectName: formData.projectName,
                taskName: formData.taskName,
                priority: formData.priority,
                progressStatus: formData.progressStatus,
                startDate: formData.startDate,
                endDate: formData.endDate,
                hoursTime: formData.hoursTime,
                minutesTime: formData.minutesTime,
                secondsTime: formData.secondsTime
            };



            // if (editData?.endDate === "") {
            //     console.log(isEditHoursFormat);
            //     // console.log(editData?.endDate);
            // }
            // console.log("Before Saving to localStorage: ", newData); // Check here

            setItem((prevItems) => {
                let updatedItems;
                if (editData?.id) {
                    // If editing, update the existing item
                    updatedItems = prevItems.map((item) =>
                        item.id === editData.id ? newData : item
                    );
                } else {
                    // If adding new, just append to the list
                    updatedItems = [...prevItems, newData];
                }

                // Save the updated items to localStorage
                localStorage.setItem("myObj1", JSON.stringify(updatedItems));
                return updatedItems;
            });


            // setItem((prev) => {

            //     const updatedArray = [...prev, newData];
            //     localStorage.setItem("myObj1", JSON.stringify(updatedArray));
            //     return updatedArray;

            // }
            // );

            setFormData({
                projectName: '',
                taskName: '',
                priority: 'medium',
                progressStatus: 'todo',
                startDate: '',
                endDate: '',
                hoursTime: '',
                minutesTime: '',
                secondsTime: ''
            });

            if (editData?.id) {
                setIsPopUp_OutputComponent(false); // This will close the popup after editing
            }
            // if (editData?.endDate === "") {
            //     setIsSameDate(false);
            // }
            // console.log('Form Data:', item);
        }



    }



    return (
        <>
            <div className='outerPopupForm'>
                <form onSubmit={handleSubmit} className='popUpForm'>
                    <label htmlFor="projectName">Project Name:</label>
                    <input type="text" id="project-name" name="projectName" value={formData.projectName} onChange={handleInputChange} required />
                    <br /><br />
                    <label htmlFor="taskName">Task Name:</label>
                    <input type="text" id="task-name" name="taskName" value={formData.taskName} onChange={handleInputChange} required /><br /><br />

                    <label htmlFor="priority" >Priority:</label>
                    <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <br /><br />

                    <label htmlFor="progressStatus" >Progress Status:</label>
                    <select id="progressStatus" name="progressStatus" value={formData.progressStatus} onChange={handleInputChange} required>
                        <option value="todo">Todo</option>
                        <option value="progress">Progress</option>
                    </select>
                    <br /><br />

                    <label htmlFor='chooseTime'>Time Format</label>
                    <div className='chooseTime'>
                        <input type="radio" id="calendarFormat" name="timeFormat"
                            onChange={() => {
                                // if (editData?.endDate === "") {
                                //     setIsSameDate((prev) => !prev);
                                // }
                                // setIsSameDate(false);
                                setTimeFormat('calendar');
                                setFormData((prev) => ({
                                    ...prev,
                                    hoursTime: "",  // Reset hours
                                    minutesTime: "", // Reset minutes
                                    secondsTime: ""  // Reset seconds
                                }));
                            }}
                            // checked={!isSameDate || !(editData?.endDate === "")}
                            // checked={!isSameDate}
                            checked={timeFormat === 'calendar'}
                            value='calendarFormat' />
                        <label htmlFor='calendarFormat'>Calendar Format</label>

                        <input type="radio" id="hoursFormat" name="timeFormat"
                            onChange={() => {
                                // if (editData?.endDate === "") {
                                //     setIsSameDate((prev) => !prev);
                                // }
                                // setIsSameDate(true);
                                setTimeFormat('hours');
                                setFormData((prev) => ({
                                    ...prev,
                                    startDate: "",  // Clear start date
                                    endDate: "",    // Clear end date
                                }));

                            }}
                            // checked={isSameDate || (editData?.endDate === "")}
                            // checked={isSameDate}
                            checked={timeFormat === 'hours'}
                            value="hoursFormat" />
                        <label htmlFor='hoursFormat'>Hours Format</label>
                    </div>

                    {/* {!isSameDate || !(editData?.endDate === "") */}
                    {/* {!isSameDate */}
                    {timeFormat === 'calendar'
                        && (
                            <>
                                <label htmlFor="start-date">Start Date:</label>
                                <input type="date" id="start-date" name="startDate" value={formData.startDate} onChange={handleInputChange} required /><br /><br />

                                <label htmlFor="end-date">End Date:</label>
                                <input type="date" id="end-date" name="endDate" value={formData.endDate} onChange={handleInputChange} required /><br /><br />
                            </>
                        )}

                    {/* {isSameDate || editData?.endDate === "" */}
                    {/* {isSameDate */}
                    {timeFormat === 'hours'
                        && (
                            <>
                                <div id="time_wrapper">
                                    <div id="time_input">
                                        <label htmlFor="hours">
                                            <input type="number" id="hours" name='hoursTime' value={formData.hoursTime} onChange={handleInputChange} placeholder='0' max="24" min="0" required />
                                            <span className="label lbl-hrs">hours</span>
                                        </label>
                                        <span>:</span>
                                        <label htmlFor="minutes">
                                            <input type="number" id="minutes" name='minutesTime' max="60" min="0" value={formData.minutesTime} onChange={handleInputChange} placeholder='00' required />
                                            <span className="label lbl-min">minutes</span>
                                        </label>
                                        <span>:</span>
                                        <label htmlFor="seconds">
                                            <input type="number" id="seconds" name='secondsTime' max="60" min="0" value={formData.secondsTime} onChange={handleInputChange} placeholder='00' required />
                                            <span className="label lbl-sec">seconds</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Popup
