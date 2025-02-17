// Handling the cards delete functionality

const handleDelete = (cardData, item, setItem, checkedList, setCheckedList) => {
    console.log("Delete your Property");
    console.log(cardData, "cards data");
    console.log(item, 'all item details');
    console.log(checkedList, "all checkedList Details");

    // maintaining the checked list to remove the checked items saved in localStorage
    setCheckedList((prev) => {
        let newCheckedList = new Set([...prev]);

        if (newCheckedList.has(cardData.id)) {

            newCheckedList.delete(cardData.id);
            localStorage.setItem('checkboxInformation', [...newCheckedList]);

        }
        return newCheckedList;
    });


    // Items i.e all the card information where a specific card is delete from the item
    setItem(() => {
        let item2 = item.filter((e) => e.id != cardData.id);
        localStorage.setItem('myObj1', JSON.stringify(item2));
        return item2;
    })
}

export default handleDelete