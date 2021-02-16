import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function App() {
  const [markdown,setmarkdown] = useState('## markdown preview');
  return (
    <main>
      <section className='markdown'>
        <textarea className='input' value={markdown} onChange={(e)=>{setmarkdown(e.target.value)}} />
        <article className='result'>
          <ReactMarkdown>
            {markdown}
          </ReactMarkdown>
          </article>
      </section>
    </main>
  )
}

export default App
