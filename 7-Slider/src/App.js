import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people,setpeople] = useState(data);
  const [value,setvalue]= useState(0);
 
  useEffect(()=>{
    const li=people.length-1;
    if(value<0){
      setvalue(li);
    }
    if(value>li){
      setvalue(0);
    }
  },[value,people]);

  useEffect(()=>{
    let slider = setInterval(()=>{
      setvalue(value+1);
    },3000);
    return () => clearInterval(slider)
  },[value])
  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person,index)=>{
          const {id,image,name,title,quote} = person;
           let position = 'nextSlide';
           if(index===value){
             position='activeSlide';
           }if(index==value-1 || (value===0 && index === people.length-1)){
             position='lastSlide';
           }
          return (
          <article className={position} key={id}>
            <img src={image} alt={name} className='person-img'/>
            <h4>{name}</h4>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
          );
        })}
        <button className='prev' onClick={()=>setvalue(value-1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={()=>setvalue(value+1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
