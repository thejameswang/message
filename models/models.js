var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
var Schema = mongoose.Schema;
// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
if (! process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}

var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

mongoose.connection.on('error', function() {
  console.log('error connecting to database')
})
mongoose.connection.on('connected', function() {
  console.log('succesfully connected to database')
})
// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!
var userSchema = new Schema({
  username: String,
  password: String,
  phone: String
})

// Step 2: Create all of your models here, as properties.
var User = mongoose.model('User', userSchema)
// Step 3: Export your models object
module.exports = {
  User: User
}
