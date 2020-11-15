import React, {useEffect,useContext, useReducer, createContext} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import Signin from './components/Signin';
import Signup from './components/Signup';
import {iState,reducer} from './reducers/userReducer';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import Profile from './components/Profile';

export const UserContext = createContext()

const Routing= ()=>{

  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
      history.push('/s-home');
    }
    else
    {
      history.push('/s-signin');
    }

  },[])

  return(
    <Switch>
      <Route path='/s-signin' component={Signin}/>
      <Route path='/s-signup' component={Signup}/>
      <Route path='/s-profile' component={Profile}/>
      <Route path='/s-home'>
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </Route>
    </Switch>
  )
}


function App() {

  const [state,dispatch] = useReducer(reducer,iState)

  return (
    <div className="app">
      <UserContext.Provider value={{state,dispatch}}>
        <Router>
        <Routing/>
      </Router>
      </UserContext.Provider>
                
    </div>
  );
}

export default App;
