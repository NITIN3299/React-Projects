import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {

  const [isloading,setisloading] = useState(true);
  const [jobs,setjobs] = useState([]);
  const [value,setvalue] = useState(0);

  const fetchjobs = async ()=>{
      const resp = await fetch(url);
      const result = await resp.json();
      setjobs(result);
      setisloading(false);
  }
  useEffect(()=>{
    fetchjobs();
  },[]);
  if(isloading){
    return (
      <main>
        <section className='section laoding'>Loading...</section>
      </main>
    );
  }
  const {company,dates,duties,title} = jobs[value];
  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
         <div className='btn-container'>
           {jobs.map((item,index)=>{
             return <button className={`job-btn ${index===value && 'active-btn'}`}
              key={item.id} onClick={()=>setvalue(index)}>{item.company}</button>
           })}
         </div>
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty,index)=>{
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App
