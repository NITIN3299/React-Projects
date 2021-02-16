import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const {loading,data} = useFetch();
  const [page,setpage]=useState(0);
  const [followers,setfollowers]=useState([]);
  
  useEffect(()=>{
    if(loading) return
    setfollowers(data[page]);
  },[loading,page])
  const handleclick = (index) =>{
    setpage(index);
  }
  const prevpage = ()=>{
     let oldpage=page
     let newpage=oldpage-1
     if(newpage<0){
       newpage=data.length-1;
     }
     setpage(newpage);
  }
  const nextpage = () =>{
      let oldpage=page
      let newpage=oldpage+1
     if(newpage>data.length-1){
       newpage=0;
     }
     setpage(newpage);
  }
  return (
    <main>
      <div className='section-title'>
        <h1>{loading?'loading...':'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower)=>{
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && 
        <div className='btn-container'>
          <button className='prev-btn' onClick={prevpage}>
            prev
          </button>
          {data.map((item,index)=>{
               return (<button key={index} 
               className={`page-btn ${index===page?'active-btn':null}`}
               onClick={()=>handleclick(index)}>
                {index+1}
               </button> )
          })}
          <button className='next-btn' onClick={nextpage}>
            next
          </button>
          </div>}
      </section>
    </main>
  )
}

export default App
