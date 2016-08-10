var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/model');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id)
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy({

	},function(email, pass, done){
		User.findOne({'local.email': email}, function(err, user){
			if(err) return done(err);
			if(!user) return done(null, false);
			return done(null, user);
		});
	}));

}