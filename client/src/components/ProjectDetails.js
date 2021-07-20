import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProjectDetails(props){
    const [projectState, setProjectState]= useState({title: null, description: null}) // want to not render anything so use the null 'falsy' value so as to start empty with the first state

    const {projectId} = props.match.params // project Id is capaccino

    useEffect(()=>{
        axios.get(`http://localhost:5000//api/projects/${projectId}`)
        .then(res =>{
            const project = res.data
            setProjectState(project)
        })
    }, [projectId])

    return(
    <div>
        <h1>{projectState.title}</h1>
        <p>{projectState.description}</p>
        <Link to={'/projects'}>Back to projects</Link>
    </div>
    )
}


export default ProjectDetails;