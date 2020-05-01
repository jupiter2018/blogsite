import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import  Profile  from './components/Profile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/register' exact component={Register} />
          <Route path='/profile/:username' exact component={Profile} />
          <Route path='*' render={()=><h1>Page not found</h1>}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
