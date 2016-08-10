module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index')
	});

	app.get('/login', function(req, res) {
		res.render('login')
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',

		failureRedirect: '/login'
	}));

	app.get('/signup', function(req, res){
		res.render('signup');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', function(req, res){
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'email'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

};