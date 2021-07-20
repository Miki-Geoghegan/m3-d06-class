import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as auth from './auth/auth-service'

function Login(props){

    const initialFormState = {username: '', password: ''}

    const [formState, setFormState] =useState({username: '', password: ''})

    function handleChange (event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value});
      }

      function handleFormSubmit(event){
        event.preventDefault();
        const {username, password} = formState;
       
        return auth.login(username, password)
        .then(loggedInUser => {
            setFormState(initialFormState);
            props.setLoggedInUser(loggedInUser)
            /* once login has been sucessful, we get the logged in user - we need to share this state so other components know when they can share access - the only way to share state between more than one component is to lift up state and pass to the children the set state function through the props. Here we are looking at logged in user so we setLoggedInUser - this is a typical pattern or passing down the callback to the children to set the state - here we are passing it to LoggedInUser */
        })
        .catch(error => console.log(error))
      }

    return(
    <div>
        <form onSubmit={handleFormSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formState.username} onChange={handleChange} />
          </label>
 
          <label>
            Password:
            <input type="password" name="password" value={formState.password} onChange={handleChange} />
          </label>
 
          <button type="submit"> Login </button>
        </form>
 
        <p>
          Don't have account?
          <Link to={'/signup'}> Signup</Link>
        </p>
    </div>

    )
}

export default Login