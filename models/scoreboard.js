//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ScorboardModelSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'gameuser', },
    userScore:{ type: String, default: '0'},
    createdAt: { type: Date, default: Date.now() },
});

// Compile model from schema
module.exports = mongoose.model('usersscoreboard', ScorboardModelSchema);