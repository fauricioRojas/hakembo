// Require libraries for the model function successfully.
var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

// Define the model's structure.
var playerSchema = new Schema({  
    user: { type: String },
    score: { type: Number }
});

// Export the model for then be used.
module.exports = mongoose.model('Player', playerSchema);  