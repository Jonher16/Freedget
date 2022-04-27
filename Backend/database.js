const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(db => console.log('Connected to database'))
