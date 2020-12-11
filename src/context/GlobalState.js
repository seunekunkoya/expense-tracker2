import React, { Children, createContext, useReducer } from "react";
import AppReducer from './AppReducer';

//initial state
const initialState = {
  transactions: [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ],
};

//create context
export const GlobalContext = createContext(initialState);

//Provider Component
export const Globalprovider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions that will make calls to the reducer
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    }) 
  }

  return (
    <GlobalContext.Provider value={{ transactions: state.transactions, deleteTransaction }}>
      {children}
    </GlobalContext.Provider>
  );
};
