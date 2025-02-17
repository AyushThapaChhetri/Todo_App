// Handling the cards delete functionality


const handleDelete = (cardData, item) => {

    let item2 = item.filter((e) => e.id != cardData.id);
    return item2;

}

export default handleDelete