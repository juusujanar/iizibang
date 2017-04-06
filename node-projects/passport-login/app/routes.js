module.exports = function(app, passport) {

	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/login',
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// process the signup form
	app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/register',
        failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
