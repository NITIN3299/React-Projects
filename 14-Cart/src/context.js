import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialstate = {
  loading:false,
  cart:cartItems,
  total:0,
  amount:0
}
const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialstate);

  const clearCart = ()=>{
    dispatch({type:'Clear_cart'})
  }
  const Remove = (id) =>{
    dispatch({type:'Remove',payload:id})
  }
  const Increase = (id) =>{
    dispatch({type:'Increase',payload:id})
  }
  const Decrease = (id) =>{
    dispatch({type:'Decrease',payload:id})
  }
  const Toggleamount = (id,type)=>{
    dispatch({type:'Toggle',payload:{id,type}})
  }
  const fetchdata = async () =>{
    dispatch({type:'Loading'})
    const resp = await fetch(url)
    const cart = await resp.json()
    dispatch({type:'Display',payload:cart})
  }
  useEffect(()=>{
     fetchdata();
  },[])
  useEffect(()=>{
    dispatch({type:'Get_totals'})
  },[state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,Remove,Increase,Decrease,Toggleamount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
