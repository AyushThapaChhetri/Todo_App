// Handling the cards add functionality

const handleAdd = (data, item) => {

    // updating item array based on new todo  or does already exists 
    let updatedItem = item.some((e) => (e.id == data.id)) ? item.map((e) => (e.id == data.id) ? data : e) : [...item, data];

    localStorage.setItem('myObj1', JSON.stringify(updatedItem));

}

export default handleAdd

