// routes/project.routes.js
 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/Task.model')

router.post('/', (req, res)=>{
    const { title, description, project } = req.body

    Task.create({
        project,
       
   /*     // one project can have many tasks, therefore, can always fill the project later because it will just collect all the tasks that refer to it. From the task point of view, there is only one project for each task - this means it is important to have it filled out upon creation otherwise you risk not being able to retreive the task... most important to set relationship in stone at the start when you have a one to one relationship (one project for every task) */
        title,
        description
    })
    .then( createdTask => res.json(createdTask))
    .catch(err=>res.json(err))
})

router.get('/', (req, res)=>{
    Task.find()
    .populate('project')
    .then(allTheTasks => res.json(allTheTasks)) // this is an array that we are sending to the user
    .catch(err => res.json)
    
})

router.get('/:taskId', (req, res) => {
    const { taskId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).status.json({ message: 'Specified id is not valid' }); 
      return;
    }
   
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Task.findById(taskId)
      .populate('projects')
      .then(task => res.json(task))
      .catch(err => res.json(err));
  });

  /* ***this is a route to modify the project - find using id*** */
  router.put('/:taskId', (req, res) => {
    const { taskId } = req.params;
    const {title, description, project}= req.body

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Task.findByIdAndUpdate(taskId, {title, description, project}, {new: true}) // by default mongoose will give you the old project, if you want the one after the updates you need to say new: true
    // get an id (projectId) and then get a body (req.body) - see const above {title, description, tasks}
      .then((newTask) => res.json(newTask))
      .catch(error => res.json(error));
  });

  router.delete('/:taskId', (req, res) => {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Task.findByIdAndRemove(taskId)
      .then(() => res.json({ message: `Task with ${taskId} is removed successfully.` }))
      .catch(error => res.json(error));
});

module.exports = router