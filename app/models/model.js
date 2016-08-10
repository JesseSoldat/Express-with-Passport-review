var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	local : {
		email: String,
		password: String
	}
});

userSchema.methods.generateHash = function(pass){
	
}


module.exports = mongoose.model('User', userSchema);