import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {

  const {waiting,loading,questions,index,correct,nextquestion,checkanswer}=useGlobalContext()

  if(waiting){
    return <SetupForm/>
  }
  if(loading){
    return <Loading/>
  }
  //console.log(questions)
  const {question,incorrect_answers,correct_answer}=questions[index]
  // const answers = [...incorrect_answers,correct_answer]
  let answers=[...incorrect_answers]
  const tempindex=Math.floor(Math.random()*4)
  if(tempindex===3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[tempindex])
    answers[tempindex]=correct_answer
  }
  return (
    <main>
      <Modal/>
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers:{correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html:question}} />
          <div className='btn-container'>
            {answers.map((answer,index)=>{
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={()=>checkanswer(answer===correct_answer)}
                  dangerouslySetInnerHTML={{__html:answer}} ></button>
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextquestion}>next question</button>
      </section>
    </main>
  )
}

export default App
