// Handling the cards delete functionality


const handleDelete = (cardData, item) => {


    let item2 = item.filter((e) => e.id != cardData.id);
    localStorage.setItem('myObj1', JSON.stringify(item2));
    // return item2;

}

export default handleDelete