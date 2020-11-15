import React, { useState, useContext }  from 'react';
import '../css/Signin.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {useHistory,Link} from 'react-router-dom';
import { UserContext } from '../App';

function Signin() {

  const {state,dispatch} = useContext(UserContext)
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const history = useHistory();

  const signInButton = ()=>{
      fetch('/s-signin',{
          method:"post",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              username,password
          })
      })
      .then(res=>res.json())
      .then(res2=>{
          if(!res2.error)
          {
            localStorage.setItem("jwt",res2.token)
            localStorage.setItem("user",JSON.stringify(res2.user))
            dispatch({type:"USER",payload:res2.user})
            history.push('/s-home');
          }
      })
      .catch(err=>{
          console.log(err)
      })
  }

  return (
    <div>
      <div className="signin__container">
        <TextField id="username" label="username" variant="outlined" className="signin__inputFields" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <TextField id="password" label="password" variant="outlined" type="password" className="signin__inputFields" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button variant="outlined" className="signinButton" fullWidth onClick={()=>signInButton()}>Signin</Button>
      </div>
      <div>
        <Link to='/s-signup'> Don't have an Account? Register here.. </Link>
      </div>
    </div>    
  );
}

export default Signin;
