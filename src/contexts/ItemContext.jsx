import React, { createContext, useState } from 'react';

// Create a context
export const ItemContext = createContext();

// Create a provider component
export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    // Function to add an item to the list
    const addItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };
    return (
        <ItemContext.Provider value={{ items, addItem }}>
            {children}
        </ItemContext.Provider>
    );
};