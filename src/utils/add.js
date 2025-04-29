// Handling the cards add functionality


import api from "./api";

const handleAdd = async (data) => {
    // const handleAdd = async (data, item) => {
    //1.local storage option
    // updating item array based on new todo  or does already exists 
    // let updatedItem = item.some((e) => (e.id == data.id)) ? item.map((e) => (e.id == data.id) ? data : e) : [...item, data];

    // localStorage.setItem('myObj1', JSON.stringify(updatedItem));


    try {
        // Determine if it’s an update or a new todo based on presence of id (1 if data.id is present)
        const isUpdate = data.id !== undefined;
        const response = isUpdate
            ? await api.put(`/client/todos/${data.id}`, data)
            : await api.post("/client/todos", data);

        const createdTodo = response.data;

        // console.log("Task saved successfully:", response.data);
        console.log("Task saved successfully:", response.data);
        console.log("Task saved successfully serialized:", createdTodo);

        return createdTodo;
    } catch (error) {
        console.error("Error saving task:", error);
        alert("❌ Error saving task! ❌");
    }

}

export default handleAdd

