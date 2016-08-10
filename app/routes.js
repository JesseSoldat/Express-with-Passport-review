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

	app.get('/profile', function(req, res){
		res.render('profile');
	});
};