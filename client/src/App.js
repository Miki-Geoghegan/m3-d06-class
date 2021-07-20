import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AddProject from './components/projects/AddProject'
import ProjectList from './components/projects/ProjectList'
import ProjectDetails from './components/ProjectDetails';


function App() {
  return (
    <div className="App">
      <AddProject />
      <BrowserRouter>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:projectId" component={ProjectDetails} />
{/* here is where we define the name of the variable that will be stored in the router in server */ }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


