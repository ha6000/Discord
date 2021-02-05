const { SlashCommand, CommandOptionType } = require('slash-create');

class Ping extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: 'ping',
			description: 'Get ping',
			guildID: '677485372988456970'
		});

		this.filePath = __filename;
	}
	async run(ctx) {
		return 'Pong 🏓';
	}
}
module.exports = Ping;