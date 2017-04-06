module.exports = function(app, passport) {

	app.post('/login', passport.authenticate('local-login', function (err, account) {
            /*successRedirect : '/',
            failureRedirect : '/login',
            failureFlash : true // allow flash messages*/
            req.logIn(account, function() {
                res.status(err ? 500 : 200).send(err ? err : account);
            });
		})(this.req, this.res, this.next),
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
	app.post('/register', passport.authenticate('local-signup', function (err, account) {
        /*successRedirect : '/',
        failureRedirect : '/register',
        failureFlash : true // allow flash messages*/
        req.logIn(account, function() {
            res.status(err ? 500 : 200).send(err ? err : account);
        });
	})(this.req, this.res, this.next));

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
