// Handling the checkbox functionality

import api from "./api";

const handleCheckbox = async (card, setIsFetch) => {
    // const handleCheckbox = async (card, item) => {

    if (!card?.id) {
        console.error("Invalid card ID");
        return;
    }

    // Toggle progress status
    const updatedStatus = card.progressStatus !== "completed" ? "completed" : "todo";

    // Updated state
    const newState = {
        ...card,
        progressStatus: updatedStatus
    };

    try {
        await api.patch(`/client/todos/${newState.id}`, newState);

        // const checkedTodo = response.data;

        // console.log("Checked Successfully completed", checkedTodo);


        setIsFetch(true);

    } catch (error) {
        console.error("Error checking task:", error);
        alert("❌ Error checking task! ❌");
    }
    //maps throught each item array and if id matches changes the checkbox items i.e if checked is sent to completed else to todo
    // let ids = item.map(e => (e.id == card.id) ? newState : e);

    // localStorage.setItem('myObj1', JSON.stringify(ids));


}

export default handleCheckbox