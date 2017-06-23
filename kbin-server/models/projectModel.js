var mongoose = require('mongoose');
var ProjectSchema = mongoose.Schema({
  id: String,
  name: String,
  desc: String,
  host: String,
  contributors: [String],
  todo: [Object],
  in_progress: [Object],
  finished: [Object],
  notes: [String]
});

var ProjectModel = mongoose.model('ProjectModel', ProjectSchema);

module.exports = ProjectModel;
