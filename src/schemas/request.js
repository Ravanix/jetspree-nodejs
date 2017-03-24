const schema = {
	'name': {
		notEmpty: true,
		errorMessage: 'Item name is required.'
	},
	'price': {
		notEmpty: true,
		errorMessage: 'Price is required.',
		isFloat: {
			errorMessage: 'Invalid price.'
		}
	},
    'description': {
		notEmpty: true,
		errorMessage: 'Description is required.'
    }
};

module.exports = schema;