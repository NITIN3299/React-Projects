import React,{ useState, useEffect } from 'react'
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const useFetch=(urlparams)=>{
  const [loading,setloading]=useState('true');
  const [error,seterror]=useState({show:false,msg:""})
  const [Data,setdata]=useState(null);

  const fetchmovies = async(url)=>{
    setloading(true)
    try {
      const resp=await fetch(url)
      const data=await resp.json();
      if(data.Response==='True'){
        setdata(data.Search || data);
        seterror({show:false,msg:''})
      }else{
        seterror({show:true,msg:data.Error})

      }
       setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchmovies(`${API_ENDPOINT}${urlparams}`);
  },[urlparams])

  return {loading,error,Data}
}

export default useFetch