// Handling the cards delete functionality

import api from "./api";


const handleDelete = async (cardData, setIsFetch) => {

    // Deleting the data , filtering the element which doesn't belong to below condition
    // let item2 = item.filter((e) => e.id != cardData.id);
    // localStorage.setItem('myObj1', JSON.stringify(item2));
    // return item2;

    if (!cardData?.id) {
        console.error("Invalid card ID");
        return;
    }

    try {
        await api.delete(`/client/todos/${cardData.id}`, cardData);

        // const checkedTodo = response.data;

        // console.log("Checked Successfully completed", checkedTodo);


        setIsFetch(true);

    } catch (error) {
        console.error("Error deleting task:", error);
        alert("❌ Error deleting task! ❌");
    }

}

export default handleDelete