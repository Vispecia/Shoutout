import React, { useState } from 'react';
import '../css/Signin.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {useHistory,Link} from 'react-router-dom';



function Signup() {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const history = useHistory();

    const signUpButton = ()=>{
        fetch('/s-signup',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,email,password
            })
        })
        .then(res=>res.json())
        .then(res2=>{
            if(!res2.error)
            {
                history.push('/s-signin');
            }
            else
            {
                setUsername("")
                setEmail("")
                setPassword("")
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
            <TextField id="email" label="E-mail" variant="outlined" className="signin__inputFields" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField id="password" label="password" variant="outlined" className="signin__inputFields" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button variant="outlined" className="signinButton" fullWidth onClick={()=>signUpButton()}>Register</Button>
        </div>
        <div>
            <Link to='/s-signin'> Already have an Account? Signin here.. </Link>
        </div> 
      </div>
    
  );
}

export default Signup;
