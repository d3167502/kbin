var ProjectModel = require('../models/ProjectModel');
var email = require('../node_modules/emailjs');
const uuidv1 = require('uuid/v1');


var emailServer = email.server.connect({
  user: 'dev4harper@gmail.com',
  password: '1625devworld',
  host: 'smtp.gmail.com',
  ssl: true
});

var emailMessage = {
  from: 'dev4h@gmail.com',
  to: '',
  subject: 'Your New Project is Ready!',
  text: ''
}

var getProject = function(newId) {
  return new Promise((resolve, reject) => {
    ProjectModel.findOne({id: newId}, function(err, project) {
      if (err) {
        reject(err);
      } else {
        resolve(project);
      }
    });
  });
}

var addProject = function(newProject) {
  return new Promise((resolve, reject) => {
    ProjectModel.findOne({name: newProject.name}, function(err, data) {
      if (data) {
        reject('Project already exists');
      } else {
        newProject.id = uuidv1();
        console.log('id generated: '+ newProject.id);
        var mongoProject = new ProjectModel(newProject);
        emailMessage.to = newProject.host;
        emailMessage.text = 'http://localhost:8000/project/' + newProject.id;
        mongoProject.save(function(err, mongoProject) {
          if (err) {
            console.error();
          } else {
            emailServer.send(emailMessage, function(err, message) {
              if (err) {
                console.error();
              } else {
                console.log('email sent');
              }
            });
          }
        });
        resolve(mongoProject);
      }
    })
  });
}

var update = function(idToChange, data) {
  return new Promise((resolve, reject) => {
    ProjectModel.findOne({id: idToChange}, function(err, project) {
      if (err) {
        reject('Project not found');
      } else {
        var category = data.category;
        var content = data.content;
        project[category] = content;
        console.log('updated');
        resolve(project[category]);
      }
    })
  })
}

module.exports = {
  getProject: getProject,
  addProject: addProject,
  update: update
}
