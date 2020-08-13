//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({    
    userName:{ type: String, default: '' },
    createdAt: { type: Date, default: Date.now() },
});

// Compile model from schema
module.exports = mongoose.model('gameusers', UserModelSchema);
// let UserModel = mongoose.model('gameusers', UserModelSchema);