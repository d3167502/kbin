var express= require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var projectService = require('../services/projectService');


router.get('/project/:id', function(req, res) {
  var id = req.params.id;
  projectService.getProject(id)
    .then(project => {
      console.log('project found: ' + project.name);
      res.json(project)
    },
    error => {
      res.send('Something was wrong...');
    });
});

router.post('/project', jsonParser, function(req, res) {
  projectService.addProject(req.body)
    .then(project => {
      console.log(project.name + ' id: ' + project.id + ' IS added by ' + project.host);
      res.json(project);
    },
    error => {
      res.status(400).send('Project name aleady exists.');
    });
});

router.put('/project/:id', jsonParser, function(req, res) {
  var id = req.params.id;
  console.log("rest: " + JSON.stringify(req.body));
  projectService.update(id, req.body)
  .then(updated => {
    console.log('info updated'+ updated);
    res.json(updated);
  },
  error => {
    res.status(400).send('oops');
  });
});

module.exports = router;
