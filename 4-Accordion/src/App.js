import React, { useState , useEffect } from 'react';
import questions from './data';
import data from './data';
import SingleQuestion from './Question';
function App() {
  const [questions,setquestions] = useState(data);
  return (
    <main>
      <div className='container'>
        <h3>Info About Login</h3>
        <section className='info'>
        {questions.map((question)=>{
          return <SingleQuestion key={question} {...question}></SingleQuestion>
        })}
      </section>
      </div>
    </main>
  );
}

export default App;
