import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index,setindex]= useState(0);
  const {name,job,image,text} = people[index];

  const checknumber= (number)=>{
    if(number===people.length){
      return 0;
    }
    if(number<0){
      return people.length-1;
    }
    return number;
  }
  const nextperson = ()=>{
    let number=checknumber(index+1);
    setindex(number);
  }
  const prevperson = ()=>{
    let number=checknumber(index-1);
    setindex(number);;
  }
  const randomperson = ()=>{
    let rn = Math.floor(Math.random()*people.length);
    if(rn===index){
      rn+=1;
    }
    setindex(checknumber(rn));
  }
  return (
    <article className='review'>
      <div className='img-container'>
        <img src={image} alt={name} className='person-img' />
        <span className='quote-icon'>
          <FaQuoteRight />
        </span>
      </div>
      <h4 className='author'>{name}</h4>
      <p className='job'>{job}</p>
      <p className='info'>{text}</p>
      <div className='button-container'>
        <button className='prev-btn' onClick={()=>{prevperson()}}>
          <FaChevronLeft />
        </button>
        <button className='next-btn' onClick={()=>{nextperson()}}>
          <FaChevronRight />
        </button>
        <button className='random-btn' onClick={randomperson}>
          Suprize me
        </button>
      </div>
    </article>
  );
};

export default Review;
