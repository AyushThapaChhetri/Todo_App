import React, { useEffect, useState } from 'react'
import '../css/Popup.css'

const Popup = ({ item, setItem }) => {
    // const [formData, setFormData] = useState({
    //     projectName: '',
    //     taskName: '',
    //     priority: 'medium',
    //     startDate: '',
    //     endDate: '',

    // });
    const [formData, setFormData] = useState({
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
    const [isSameDate, setIsSameDate] = useState(false);
    // const [item, setItem] = useState([]);

    // On component load, get the data from localStorage (if any)
    // Getting item form the localStorage for updation
    useEffect(() => {
        const rawData = localStorage.getItem("myObj1");
        const parsedData = JSON.parse(rawData) || [];
        setItem(parsedData)        //setting item as per the the data received from the local storage
        // console.log(item);
    }, []);

    // console.log(formData);
    // Handle any of the changes occuring in the form

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value                  //dynamic way of handling form data where input change occurs, it triggers the respective handles with name of it and values
        }));
        // console.log(formData);
    }



    // console.log(inputProject);
    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.projectName.trim() === "" || formData.taskName.trim() === "") {
            // console.log("Empty field");
            alert("❌❌❌Khali thau vayo hai vara timi!❌❌❌");

        } else if (new Date(formData.startDate).getTime() > new Date(formData.endDate).getTime()) {

            alert("❌❌❌Start Date Can't be later than End Date! ❌❌❌");

        } else if (new Date(formData.startDate).getTime() == new Date(formData.endDate).getTime()) {
            setIsSameDate(true);
            alert(`❌❌❌Start Date Can't be Same as End Date! ❌❌❌\n⬇️ Assign Hours:Minutes to be finished ⬇️`);
            formData.startDate = "";
            formData.endDate = "";

        } else {

            // console.log("Not empty field");

            //local Storage variable definition 
            const newData = {
                // id: item.length + 1,
                id: Date.now(),
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



            // console.log("Before Saving to localStorage: ", newData); // Check here
            // console.log('New Data ko : ', newData);
            // setItem(formData);
            setItem((prev) => {
                const updatedArray = [...prev, newData];
                localStorage.setItem("myObj1", JSON.stringify(updatedArray));
                return updatedArray;
            });

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

            // item.forEach((entry) => {
            //     console.log(entry.projectName);
            // });



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
                        <input type="radio" id="calendarFormat" name="timeFormat" onChange={() => setIsSameDate(false)}
                            checked={!isSameDate}
                            value='calendarFormat' />
                        <label htmlFor='calendarFormat'>Calendar Format</label>

                        <input type="radio" id="hoursFormat" name="timeFormat" onChange={() => setIsSameDate(true)}
                            checked={isSameDate}
                            value="hourseFormat" />
                        <label htmlFor='hoursFormat'>Hours Format</label>
                    </div>

                    {!isSameDate && (
                        <>
                            <label htmlFor="start-date">Start Date:</label>
                            <input type="date" id="start-date" name="startDate" value={formData.startDate} onChange={handleInputChange} required /><br /><br />

                            <label htmlFor="end-date">End Date:</label>
                            <input type="date" id="end-date" name="endDate" value={formData.endDate} onChange={handleInputChange} required /><br /><br />
                        </>
                    )}

                    {isSameDate && (
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
