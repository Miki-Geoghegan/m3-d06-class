import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AddProject from './components/projects/AddProject'
import ProjectList from './components/projects/ProjectList'
import ProjectDetails from './components/ProjectDetails';
import Signup from './components/auth/Signup';
import Login from './components/Login'


function App() {

  const initialLoginState = null

  const [loggedInUser, setLoggedInUser] = useState(initialLoginState)
  return (
    <div className="App">
      <AddProject />
      <BrowserRouter>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:projectId" component={ProjectDetails} />
{/* here is where we define the name of the variable that will be stored in the router in server */ }
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" render={ props => <Link {...props} setLoggedInUser={setLoggedInUser}/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


