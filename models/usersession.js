//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UsersessionModelSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'gameuser', },     
    createdAt: { type: Date, default: Date.now() },

});

// Compile model from schema
module.exports = mongoose.model('userssession', UsersessionModelSchema);
