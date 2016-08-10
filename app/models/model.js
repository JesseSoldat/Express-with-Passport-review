var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	local : {
		email: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		name : String
	}
});

userSchema.methods.generateHash = function(pass){

}


module.exports = mongoose.model('User', userSchema);