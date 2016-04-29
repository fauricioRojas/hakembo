var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var playerSchema = new Schema({  
    user: { type: String },
    score: { type: Number }
});

module.exports = mongoose.model('Player', playerSchema);  