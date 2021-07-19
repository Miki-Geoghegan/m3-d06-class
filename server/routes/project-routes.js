// routes/project.routes.js
 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/Project.model')

router.post('/', (req, res)=>{
    const {title, description} = req.body // only take from the body what you need for creation

    Project.create({
        title, 
        description,
        tasks: [] // this is double protection with a default (see Project.model.js)
    })
    .then(createdProject => res.json(createdProject))  /* the json takes whatever object you pass and puts it into a view that can be rendered on the HTTP form - transforms to a type of string... here we are sending the new object BACK to the user - the user asks something of our created API and json returns a view with an object of data - often the browser will display this */
    // with a .then we get back the object that we just created
    .catch(err=> res.json(err)) // we are no longer rendering anything, now we are just sending a json
})

router.get('/', (req, res)=>{
    Project.find()
    .populate('tasks')
    .then(allTheProjects => res.json(allTheProjects)) // this is an array that we are sending to the user
    .catch(err => res.json)
    
})

router.get('/:projectId', (req, res) => {
    const { projectId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' }); // the status(400) number can be changed, this is to specify a status code for the request. This is just an internal validation - you have to create a fake error object with only a message inside (the catch - real error, comes later)
      return;
    }
   
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Project.findById(projectId)
      .populate('tasks')
      .then(project => res.json(project))
      .catch(err => res.json(err));
  });


  /* ***this is a route to modify the project - find using id*** */
  router.put('/:projectId', (req, res, next) => {
    const { projectId } = req.params;
    const {title, description, tasks}= req.body
   
    // very simple check is useful for the lesson but would be good to make more complex in extended application
    // normally let mongoose do this in the validation step - we have done validation in project
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Project.findByIdAndUpdate(projectId, {title, description, tasks}, {new: true}) // by default mongoose will give you the old project, if you want the one after the updates you need to say new: true
    // get an id (projectId) and then get a body (req.body) - see const above {title, description, tasks}
      .then((newProject) => res.json(newProject))
      .catch(error => res.json(error));
  });


  router.delete('/:projectId', (req, res) => {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Project.findByIdAndRemove(projectId)
      .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
      .catch(error => res.json(error));
});
   

module.exports = router

// you can .json an object, an array of objects, anything that is not a function... if you json a function it will send you the code of a json definition

// we creating our own API

// to modify the error message, see Beer API lesson