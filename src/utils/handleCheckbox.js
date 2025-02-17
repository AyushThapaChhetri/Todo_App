// Handling the checkbox functionality
// const handleEdit = (cardData, item) => {
const handleCheckbox = (card, item) => {


    //Changing the data to completed when clicking the checkbox button
    const newState = {
        id: card.id ? card.id : '',
        projectName: card.projectName ? card.projectName : '',
        taskName: card.taskName ? card.taskName : '',
        priority: card.priority ? card.priority : 'medium',
        progressStatus: (card.progressStatus != "completed") ? 'completed' : 'todo',
        startDate: card.startDate ? card.startDate : '',
        endDate: card.endDate ? card.endDate : '',
        hoursTime: card.hoursTime ? card.hoursTime : '',
        minutesTime: card.minutesTime ? card.minutesTime : '',
        secondsTime: card.secondsTime ? card.secondsTime : ''
    };

    //maps throught each item array and if id matches changes the checkbox items i.e if checked is sent to completed else to todo
    let ids = item.map(e => (e.id == card.id) ? newState : e);

    localStorage.setItem('myObj1', JSON.stringify(ids));


}

export default handleCheckbox