import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading,setloading] = useState(true);
  const [person,setperson] = useState(null);
  const [title,settitle] = useState('name');
  const [value,setvalue] = useState('random person');

  const handlevalue = (e) =>{
    if(e.target.classList.contains('icon')){
      const newvalue = e.target.dataset.label;
      settitle(newvalue)
      setvalue(person[newvalue])
    }
  }

  const getPerson=async () =>{
    setloading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const person = data.results[0];
      const {phone,email} = person
      const {large: image} = person.picture
      const {first,last} = person.name
      const {
        login:{password}
      } = person
      const {dob:{age}}=person
      const {street:{number,name}} = person.location;
      const newperson = {
        image,phone,email,password,age,
        street : `${number} ${name}`,
        name: `${first} ${last}`,
      }
      setperson(newperson);
      //console.log('hello');
      setloading(false);
      settitle('name');
      setvalue(newperson.name);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    getPerson();
  },[])
  return (
    <main>
      <div className='block bcg-black'></div>
        <div className='block'>
          <div className='container'>
            <img 
            src={(person && person.image) || defaultImage}
            alt='randon user'
            className='user-img' 
            />
            <p className='user-title'>my {title} is</p>
            <p className='user-value'>{value}</p>
            <div className='values-list'>
                 <button className='icon' data-label='name' onMouseOver={handlevalue}>
                   <FaUser />
                 </button>
                 <button className='icon' data-label='email' onMouseOver={handlevalue}>
                   <FaEnvelopeOpen />
                 </button>
                 <button className='icon' data-label='age' onMouseOver={handlevalue}>
                   <FaCalendarTimes />
                 </button>
                 <button className='icon' data-label='street' onMouseOver={handlevalue}>
                   <FaMap />
                 </button>
                 <button className='icon' data-label='phone' onMouseOver={handlevalue}>
                   <FaPhone />
                 </button>
                 <button className='icon' data-label='password' onMouseOver={handlevalue}>
                   <FaLock />
                 </button>
            </div>
            <button className='btn' type='button' onClick={getPerson}>
              {loading?'loading...':'random user'}
            </button>
          </div>
        </div>
    </main>
  )
}

export default App
