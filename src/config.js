module.exports = {
	'secret': 'qcOPpjBuPfFCvHf8dD0O',
	'connection_string': process.env.DATABASE_URL || 'postgres://postgres:P%40ssword@localhost:5432/jetspree',
	'token_duration': 60 * 60 * 24, // expires in 24 hours
	'facebook_app_id': (process.env.NODE_ENV == 'production' ? '858613437609830' : '650580988428443'),
	'facebook_app_secret': (process.env.NODE_ENV == 'production' ? 'd537be86d8d96b6ff56fcd2095873787' : '88574244ad4e8a659a213ca3b18f98c3'),
	'facebook_callback_url': (process.env.NODE_ENV == 'production' ? 'https://jetspree-node-test.herokuapp.com/login/facebook/callback' : "/login/facebook/callback")
};