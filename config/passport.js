var LocalStrategy = require('passport-local').Strategy;

var FacebookStategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

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

//LOCAL LOGIN
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // 
	},function(req, email, pass, done){
		
		User.findOne({'local.email': email}, function(err, user){
			if(err) return done(err);
			if(!user) return done(null, false);
			
			return done(null, user);
		});
	}));
//LOCAL SIGNUP
	passport.use('local-signup', new LocalStrategy({

		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // 

	}, function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.email' : email}, function(err, user){
				if(err) return done(err);
				if(user) return done(null, false);
				else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = password;

					newUser.save(function(err){
						if(err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));


//FACEBOOK
	passport.use(new FacebookStategy({
		clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

	}, 
	function(token, refreshToken, profile, done){
		console.log(profile);
		process.nextTick(function(){
			User.findOne({
				'facebook.id' : profile.id
			}, function(err, user){
				if(err) return done(err);
				if(user) return done(null, user);
				else {
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.token = token;
					newUser.facebook.name = profile.displayName;
					newUser.save(function(err){
						if(err) throw err;
						return done(null, newUser);
					});

				}
			});
		});
	}));

} //EXPORT