import React, { useEffect, useState } from 'react'
import '../css/Popup.css'

const Popup = ({ item, setItem }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        taskName: '',
        priority: 'medium',
        startDate: '',
        endDate: '',
    });
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
            alert("❌❌❌Khali thau vayo hai vara timi!❌❌❌")

        } else if (new Date(formData.startDate).getTime() > new Date(formData.endDate).getTime()) {

            alert("❌❌❌Start Date Can't be later than End Date! ❌❌❌")
        } else {
            // console.log("Not empty field");

            // createHashe


            //local Storage variable definition 
            const newData = {
                // id: item.length + 1,
                id: Date.now(),
                projectName: formData.projectName,
                taskName: formData.taskName,
                priority: formData.priority,
                startDate: formData.startDate,
                endDate: formData.endDate
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
                startDate: '',
                endDate: '',
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

                    <label htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" name="startDate" value={formData.startDate} onChange={handleInputChange} required /><br /><br />

                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" name="endDate" value={formData.endDate} onChange={handleInputChange} required /><br /><br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Popup
