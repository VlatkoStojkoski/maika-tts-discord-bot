const Discord = require('discord.js');
const client = new Discord.Client();
const { runCommand } = require('./commands/commands');
const server = require('./server');
require('dotenv').config();

client.login(process.env.TOKEN);

client.on('ready', () => console.log('Logged in'));

const prefix = 'maika ';

client.on('message', async (message) => {
	const { guild, content } = message;

	if (!guild || !content.startsWith(prefix)) return;

	const tokens = content.replace(prefix, '').split(' ');
	const command = tokens[0];
	const args = tokens.splice(1).join(' ');

	runCommand(command, message, args);
});

server();
