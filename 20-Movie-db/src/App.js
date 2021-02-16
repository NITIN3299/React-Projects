import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return (
    <main>
      <Switch>
         <Route path="/" exact>
           < Home />
         </Route>
         <Route path="/movies/:id" children={<Movie/>} ></Route>
      </Switch>
    </main>
  )
}

export default App
