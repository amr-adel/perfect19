const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.Promise = Promise

mongoose.connect("mongodb://localhost/perfect19", {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports.User = require('./user')