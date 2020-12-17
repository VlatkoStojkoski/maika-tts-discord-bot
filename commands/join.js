module.exports = ({ member: { voice }, channel }) => {
	if (voice.channel) {
		voice.channel.join();
	} else {
		channel.send('You need to join a voice channel first!');
	}
};
