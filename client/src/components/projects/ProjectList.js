import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectList(){
    const [listState, setListState]= useState([])
    // react renders the function component with whatever first state we pass it (without state, will render whatever is in the return)

    /* // useEffect, on the second render, we want to load the state with a list of projects. We don't want to initially add to useState here because we will create a continual loop. The first value of useState should be a static value */

    useEffect(()=>{
        axios.get('http://localhost:5000/api/projects')
        .then((res => {
            console.log('axios full response object', res)
            const listOfAllProjects = res.data
            setListState(listOfAllProjects)
            }))
        // axios wraps the response (listOfAllProjects) into an object and we need to map an array. It has a data property, which is the array needed - see the object
        // this is external API, it's a promise - once data is received from all projects (as stated in the backend router), we need to set the state
        .catch(err => console.log(err))
    }, [listState]) // [listState] means it will run whenever listState changes, if [] it will always run once after the first render
    // useEffect runs after the first render
    // have to call axios to connect to the backend - in project router we can see we are matching projects to our root ('/)

    return(
    <div>
        <div style={{width: '60%', float:"left"}}>
          { listState.map( project => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            )})
          }
        </div>
      </div>
    )
}

export default ProjectList;

// in any React component, we want HTML from a return