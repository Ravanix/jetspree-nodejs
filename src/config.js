module.exports = {
	'secret': 'qcOPpjBuPfFCvHf8dD0O',
	'connection_string': process.env.DATABASE_URL || 'postgres://postgres:P%40ssword@localhost:5432/jetspree',
	'token_duration': 60 * 60 * 24, // expires in 24 hours
	'facebook_app_id': (process.env.NODE_ENV == 'production' ? '' : '650580988428443'),
	'facebook_app_secret': (process.env.NODE_ENV == 'production' ? '' : '88574244ad4e8a659a213ca3b18f98c3'),
	'facebook_callback_url': "/login/facebook/callback"
};