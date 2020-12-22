import React, { Children, createContext, useReducer } from "react";
import AppReducer from './AppReducer';
import axios from 'axios'

//initial state
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
  error: null,
  loading: true
};

//create context
export const GlobalContext = createContext(initialState);

//Provider Component
export const Globalprovider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Action to get from back-end
  async function getTransaction(){
    try {
      const res = await axios.get('/api/v1/transactions')

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload:res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  // Actions that will make calls to the reducer
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    }) 
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    }) 
  }

  return (
    <GlobalContext.Provider value={{ 
          transactions: state.transactions,
          error: state.error,
          loading: state.loading,
          getTransaction, 
          deleteTransaction, 
          addTransaction 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
