const commands = [
	{ cmd: 'join', func: require('./join') },
	{ cmd: 'speak', func: require('./speak') },
];

module.exports.runCommand = (command, message, args = '') => {
	const foundCommand = commands.find((cmd) => cmd.cmd === command);

	if (!foundCommand)
		return message.channel.send(`Command "${command}" doesn't exist`);

	foundCommand.func(message, args);
};
