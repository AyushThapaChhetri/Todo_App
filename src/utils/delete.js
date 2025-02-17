// Handling the cards delete functionality


const handleDelete = (cardData, item) => {

    // Deleting the data , filtering the element which doesn't belong to below condition
    let item2 = item.filter((e) => e.id != cardData.id);
    localStorage.setItem('myObj1', JSON.stringify(item2));
    // return item2;

}

export default handleDelete