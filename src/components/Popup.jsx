import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
import '../css/Popup.css'
// import { GiChecklist } from 'react-icons/gi';

const Popup = ({ setItem, checkedList, setCheckedList, editData, setIsPopUp_OutputComponent }) => {




    //only the form datas current or the already setForm data are loaded of the particular card
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





    // Handle any of the changes occuring in the form

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value   //dynamic way of handling form data where input change occurs, it triggers the respective handles with name of it and values
        }));
        // console.log(formData);
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.projectName.trim() === "" || formData.taskName.trim() === "") {

            alert("❌❌❌Khali thau vayo hai vara timi!❌❌❌");

        } else if (timeFormat === 'calendar' && new Date(formData.startDate).getTime() > new Date(formData.endDate).getTime()) { // ADD: Check timeFormat before validating dates

            alert("❌❌❌Start Date Can't be later than End Date! ❌❌❌");

        } else if (timeFormat === 'calendar' && new Date(formData.startDate).getTime() === new Date(formData.endDate).getTime()) { // ADD: Check timeFormat before validating dates
            alert("❌❌❌Start Date Can't be Same as End Date! ❌❌❌\n ⬇️ Assign Hours:Minutes to be finished ⬇️");
            setFormData(prev => ({ ...prev, startDate: "", endDate: "" }));// ADD: Reset dates

        } else if (timeFormat === 'hours' && formData.hoursTime == 0 && formData.minutesTime == 0 && formData.secondsTime == 0) {
            alert("all value set to 0");
        }
        else {

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

            //checking editData ProgressStatus only works when form submited after edit popup closes
            if (newData.progressStatus === "completed") {
                console.log(newData.progressStatus, ' : etai bata ho');
                console.log("Progress is completed. checkedList type:", checkedList instanceof Set, "Value:", checkedList); // Debugging line
                setCheckedList((prev) => {

                    const newCheckedState = new Set([...prev]);
                    newCheckedState.add(newData.id);
                    localStorage.setItem("checkboxInformation", JSON.stringify([...newCheckedState]));
                    return newCheckedState;
                });

                // if (editData?.progressStatus) {
                //     checkedList.add(newData.id);
                //     localStorage.setItem("checkboxInformation", JSON.stringify([...checkedList]));

                // }
            }


            if (editData && newData?.progressStatus !== "completed") {

                checkedList.delete(newData.id);
                localStorage.setItem('checkboxInformation', JSON.stringify([...checkedList]));
                ;
            }



            // Item value which is in local storage and the app component is changed
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
                        <option value="completed">Completed</option>
                    </select>
                    <br /><br />

                    <label htmlFor='chooseTime'>Time Format</label>
                    <div className='chooseTime'>
                        <input type="radio" id="calendarFormat" name="timeFormat"
                            onChange={() => {

                                setTimeFormat('calendar');
                                setFormData((prev) => ({
                                    ...prev,
                                    hoursTime: "",  // Reset hours
                                    minutesTime: "", // Reset minutes
                                    secondsTime: ""  // Reset seconds
                                }));
                            }}

                            checked={timeFormat === 'calendar'}
                            value='calendarFormat' />
                        <label htmlFor='calendarFormat'>Calendar Format</label>

                        <input type="radio" id="hoursFormat" name="timeFormat"
                            onChange={() => {

                                setTimeFormat('hours');
                                setFormData((prev) => ({
                                    ...prev,
                                    startDate: "",  // Clear start date
                                    endDate: "",    // Clear end date
                                }));

                            }}

                            checked={timeFormat === 'hours'}
                            value="hoursFormat" />
                        <label htmlFor='hoursFormat'>Hours Format</label>
                    </div>


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

// Define PropTypes for your component
Popup.propTypes = {
    setItem: PropTypes.func.isRequired, // setItem should be a function
    editData: PropTypes.object, // editData should be an object (it could be undefined, so no isRequired)
    // checkedList: PropTypes.object.isRequired, // Corrected to expect a Set
    // setCheckedList: PropTypes.func.isRequired,
    checkedList: PropTypes.instanceOf(Set), // Corrected to expect a Set
    setCheckedList: PropTypes.func, // Corrected to expect a function
    setIsPopUp_OutputComponent: PropTypes.func, // setIsPopUp_OutputComponent should be a function
};


export default Popup
