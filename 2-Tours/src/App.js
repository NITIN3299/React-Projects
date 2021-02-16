import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tour from './Tour'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isloading,setloading]=useState(true);
  const [tours,settours] = useState([]);
  const removeTour =(id)=>{
       const newTours = tours.filter((tour)=> tour.id!==id);
       settours(newTours);
  }
  const fetchtours = async()=>{
    setloading(true);
    try {
       const resp = await fetch(url);
       const tours = await resp.json();
       setloading(false);
       settours(tours);
    } catch(error){
        setloading(false);
        console.log(error);
    }
  };
  
  useEffect(()=>{
      fetchtours();
  },[]);
  if(isloading){
    return <h2><Loading></Loading></h2>
  }
  if(tours.length===0){
    return (
      <main>
         <div className='title'>
           <h2>No Tours Left</h2>
           <button className="btn" onClick={fetchtours}>Refresh</button>
         </div>
      </main>
    );
  }
  return (
    <main>
      <Tour tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App
