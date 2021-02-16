import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientID=`?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`


function App() {
  const [loading,setloading] = useState(false);
  const [photos,setphotos] = useState([]);
  const [page,setpage] = useState(0);
  const [query,setquery] = useState('');

  const fetchPhotos = async() =>{
    setloading(true);
    let url;
    const queryurl = `&query=${query}`
    const pageurl = `&page=${page}`
    if(query){
      url=`${searchUrl}${clientID}${pageurl}${queryurl}`
    }else{
      url=`${mainUrl}${clientID}${pageurl}`
    }
    
    try {
      const resp = await fetch(url);
      const data = await resp.json();
     // console.log(data);
     setphotos((oldphotos)=>{
       if(query && page===1){
         return data.results
       }
        else if(query){
           return [...oldphotos,...data.results]
        }else{
          return [...oldphotos,...data]
        }
     });
     setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPhotos();
  }, [page])
  useEffect(()=>{
    const event=window.addEventListener('scroll',()=>{
         if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2){
           setpage((oldpage)=>{
              return (oldpage+1)
           })
         }
    })
    return ()=>window.removeEventListener('scroll',event)
  }, [])
  const handlesubmit = (e)=>{
       e.preventDefault();
       setpage(1);
       //fetchphotos();
  }
  return (
  <main>
    <section className='search'>
      <form className='search-form'>
        <input type='text' placeholder='search'
        className='form-input' value={query} onChange={(e)=>setquery(e.target.value)} />
        <button className='submit-btn' type='submit' onClick={handlesubmit}>
          <FaSearch />
        </button>
      </form>
    </section>
    <section className='photos'>
      <div className='photos-center'>
        {photos.map((image,index)=>{ 
          return <Photo key={index} {...image} />
        })}
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
  )
}

export default App
