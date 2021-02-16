import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempurl='https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting,setwaiting]=useState(true);
  const [loading,setloading]=useState(false);
  const [index,setindex]=useState(0);
  const [questions,setquestions]=useState([]);
  const [correct,setcorrect]=useState(0);
  const [error,seterror]=useState(false);
  const [ismodal,setismodal]=useState(false);
  const [quiz,setquiz] = useState({
    amount:10,
    category:'sports',
    difficulty:'easy',
  })

  const fetchques = async(url)=>{
    setloading(true);
    setwaiting(false); 
    const response = await axios(url).catch((err)=>console.log(err));
    //console.log(response)
    if(response){
        const data=response.data.results
        if(data.length>0){
          setquestions(data);
          setloading(false);
          setwaiting(false);
          seterror(false);
        }else{
          setwaiting(true);
          seterror(true); 
        }
    }else{
      setwaiting(true);
    }
  }
  const nextquestion = ()=>{
    setindex((oldindex)=>{
      const index=oldindex+1
      if(index>questions.length-1){
        openModal()
        return 0;
      }else{
        return index
      }
    })
  }
  const checkanswer = (value)=>{
    if(value){
      setcorrect((oldstate)=>oldstate + 1)
    }
    nextquestion()
  }
  const openModal=()=>{
    setismodal(true);
  }
  const closemodal=()=>{
    setwaiting(true);
    setcorrect(0);
    setismodal(false);
  }
  const handlechange = (e)=>{
      const name = e.target.name
      const value = e.target.value
      setquiz({...quiz,[name]:value})
  }
  const handlesubmit = (e)=>{
       e.preventDefault() 
       const {amount,category,difficulty}=quiz

       const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`

       fetchques(url);
  }
  return <AppContext.Provider value={{
    waiting,loading,questions,index,correct,
    error,ismodal,nextquestion,checkanswer,closemodal,
    quiz,handlechange,handlesubmit
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
