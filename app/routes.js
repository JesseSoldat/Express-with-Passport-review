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

	app.get('/profile', function(req, res){
		res.render('profile');
	});
};