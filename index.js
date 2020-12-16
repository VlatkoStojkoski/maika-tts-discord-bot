const Discord = require('discord.js');
const client = new Discord.Client();
const { speak } = require('./speak');
require('dotenv').config();

let prefix = 'maika ';

client.login(process.env.TOKEN);

console.log('Logged in');

client.on('message', async (message) => {
	const {
		guild,
		content,
		member: {
			nickname,
			voice,
			user: { username, discriminator },
		},
		channel,
	} = message;

	if (!guild || !content.startsWith(prefix)) return;

	const tokens = content.replace(prefix, '').split(' ');
	const command = tokens[0];
	const arg = tokens.splice(1).join(' ');
	console.log(
		`${username}#${discriminator} (${nickname}): "${prefix}" + "${command}" + "${arg}"`
	);

	switch (command) {
		case 'join':
			if (voice.channel) {
				await voice.channel.join();
			} else {
				channel.send('You need to join a voice channel first!');
			}

			break;

		case 'speak':
			const connection = await voice.channel.join();

			const url = await speak(arg);
			console.log(url);

			const dispatcher = await connection.play(url);

			break;

		case 'prefix':
			prefix = arg.replace(/(^['"`])|(['"`]$)/g, '');

			channel.send(`Changed prefix to "${prefix}"`);

			break;
	}
});
