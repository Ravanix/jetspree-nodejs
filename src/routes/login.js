import express from 'express';
import config from './../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const router = express.Router();

router

	.post('/signup', function (req, res) {

		if (req.body.email == undefined || req.body.password == undefined
			|| req.body.email == '' || req.body.password == '') {
			return res.json({ success: false, message: "Email and Password are required." });
		} else {

			// check password mininum length
			if (req.body.password.length < 6)
				return res.json({ success: false, message: "Password too short." });

			req.pool.connect().then(client => {

				// check if email already exists
				client.query('SELECT email FROM users WHERE email=$1', [req.body.email])
					.then(result => {
						if (result.rowCount >= 1)
							return res.json({ success: false, message: "This email has already been taken." });
					})
					.catch(e => {
						client.release();
						throw e;
					});

				// encrypt password
				bcrypt.hash(req.body.password, saltRounds)
					.then(function (hash) {

						// create new user record
						client.query('INSERT INTO users(email, password) VALUES($1, $2)', [req.body.email, hash])
							.then(result => {
								client.release();
								if (result.rowCount == 1)
									return res.json({ success: true });
								else
									return res.json({ success: false });
								console.log("already res.json");
							})
							.catch(e => {
								client.release();
								throw e;
							});
					})
					.catch(function (err) {
						throw err;
					});
			});
		}
	})

	.post('/authenticate', function (req, res) {
		req.pool.connect().then(client => {

			// find the user
			client.query('SELECT id,email FROM users WHERE email=$1 LIMIT 1', [req.body.email])
				.then(result => {
					client.release();

					// user not found
					if (result.rows.length < 1) {
						return res.json({ success: false, message: 'Authentication failed.' });
					} else {
						var user = result.rows[0];

						bcrypt.compare(req.body.password, user.password)
							.then(function (match) {

								// wrong password
								if (!match) {
									return res.json({ success: false, message: 'Authentication failed.' });
								} else {

									// create a token
									var token = jwt.sign(user, config.secret, {
										expiresIn: config.token_duration
									});

									// return the token information
									return res.json({
										success: true,
										token: token,
										expiresIn: config.token_duration
									});
								}

							});
					}
				})
				.catch(e => {
					client.release();
					throw e;
				});
		});

	})

	//authenticated by passport
	.get('/authenticated', function (req, res) {
		if (req.isAuthenticated()) {
			// create a token
			var token = jwt.sign(req.user, config.secret, {
				expiresIn: config.token_duration
			});

			// return the token information
			return res.json({
				success: true,
				token: token,
				expiresIn: config.token_duration
			});
		} else {
			return res.json({ success: false, message: "Authentication failed." });
		}
	});

/*
.post('/token', function (req, res) {
	
	var originalDecoded = jwt.decode(req.body.token, {complete: true});
	var refreshed = jwt.refresh(originalDecoded, config.token_duration, config.secret);
	
	// return the new token information
	res.json({
		success: true,
		token: refreshed,
		expiresIn: config.token_duration
	});
})
*/

;

module.exports = router;