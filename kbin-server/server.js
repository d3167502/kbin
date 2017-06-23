var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://harper:admin4kbin@ds063536.mlab.com:63536/kbin')

var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');

var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', restRouter);
app.use('/', indexRouter);

app.use(function(req,res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public')});
})

app.listen(8000, function() {
  console.log('listening on port 8000');
});
