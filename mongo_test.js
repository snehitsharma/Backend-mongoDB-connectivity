const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/testDB';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });