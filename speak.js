const axios = require('axios');

const requestToken = async (model) => {
	const config = {
		'Content-Type': 'application/json',
	};

	try {
		const token = await axios.post(
			`https://maika.mk/api/v1/tts/token`,
			model,
			config
		);

		return new Promise((resolve, reject) => resolve(token.data));
	} catch (err) {
		return new Promise((resolve, reject) => reject(new Error(err)));
	}
};

module.exports.speak = async (text) => {
	const model = {
		Text: text,
	};

	const token = await requestToken(model);

	return `https://maika.mk/api/v1/tts/synthesize?token=${token}`;
};
