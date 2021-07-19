// models/Task.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }

  // there is no point of project having a default because you don't know the id that it will have - you can make it required but not default
});

module.exports = model('Task', taskSchema);

/* this references the project inside the task, it is also double referenced in Project, so it is not 100% necessary here */