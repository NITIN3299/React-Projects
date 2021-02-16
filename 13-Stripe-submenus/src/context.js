import React, { useState, useContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
    const [issidebar,setsidebar]=useState(false);
    const [issubmenu,setsubmenu]=useState(false);
    const [location,setlocation] = useState({});
    const [page,setpage] = useState({page:'',links:[]})

    const openSidebar =()=>{
        setsidebar(true);
    }
    const closeSidebar = ()=>{
        setsidebar(false);
    }
    const openSubmenu =(text,coordinates)=>{
        const page = sublinks.find((link)=>link.page===text);
        setpage(page);
        setlocation(coordinates);
        setsubmenu(true);
    }
    const closeSubmenu = ()=>{
        setsubmenu(false);
    }

    return (
    <AppContext.Provider
          value={{
             issidebar,
             issubmenu,
             openSidebar,
             closeSidebar,
             openSubmenu,
             closeSubmenu,
             location,
             page
          }}>
        {children}
    </AppContext.Provider>
    );
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}