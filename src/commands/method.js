const { createMethodEmbed, methodsIndex } = require('../lib/doc-utils');
const { SlashCommand, CommandOptionType } = require('slash-create');
const { MessageEmbed } = require('discord.js');

function UsageEmbed(user) {
    return new MessageEmbed()
        .setTitle('Usage:')
        .setDescription('```css\n.method <method_name> [usage_id]\n```')
        .setFooter(`@${user.tag}`);
}

class Method extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: 'method',
			description: 'Looks up method',
			guildID: '677485372988456970',
			options: [{
				name: 'name',
				description: 'Name of the method',
				type: CommandOptionType.STRING,
				required: true
			}, {
				name: 'usage',
				description: 'UsageID',
				type: CommandOptionType.INTEGER
			}]
		});

		this.filePath = __filename;
	}
	async run(ctx) {
		// return 'test';

		const methodName = ctx.options.name;
		const usageId = ctx.options.usage;

		console.log(ctx);

		let selectedMatch = undefined;
		const shorterMatches = [],
			longerMatches = [];
		for (const index in methodsIndex) {
			//Found an exact match
			if (index === methodName) {
				selectedMatch = methodsIndex[index];
				break;
			}

			//Longer match
			if (index.includes(methodName)) longerMatches.push(methodsIndex[index]);

			//Shorter match
			if (methodName.includes(index)) shorterMatches.push(methodsIndex[index]);
		}

		//Found an exact match
		if (selectedMatch) return {  embeds: [createMethodEmbed(selectedMatch.peripheral, selectedMatch.object, selectedMatch.name, selectedMatch.method, usageId).toJSON()] };

		//Found a single longer match
		if (longerMatches.length === 1) {
			selectedMatch = longerMatches[0];
			const embed = createMethodEmbed(selectedMatch.peripheral, selectedMatch.object, selectedMatch.name, selectedMatch.method, usageId);
			const extendFooter = `Didn't find an exact match for '${args[0]}' but instead found a longer match.`
			embed.setFooter(embed.footer ? `${embed.footer}\n${extendFooter}` : extendFooter);
			return { embeds: [embed.toJSON()] };
		}

		//No longer matches, and a single shorter match
		if (longerMatches.length === 0 && shorterMatches.length === 1) {
			selectedMatch = shorterMatches[0];
			const embed = createMethodEmbed(selectedMatch.peripheral, selectedMatch.object, selectedMatch.name, selectedMatch.method, usageId);
			const extendFooter = `Didn't find an exact match for '${args[0]}' but instead found a shorter match.`
			embed.setFooter(embed.footer ? `${embed.footer}\n${extendFooter}` : extendFooter);
			return { embeds: [embed.toJSON()] };
		}

		const embed = new MessageEmbed();

		if (shorterMatches.length === 0 && longerMatches.length === 0) {
			embed.title = 'No results found ⚠';
		} else {
			embed.title = 'No exact match';
			embed.description = 'But found those shorter/longer matches:';

			if (longerMatches.length > 0) embed.addField('Longer matches', longerMatches.map(match => `- \`${match.formatted}\``).join('\n'));
			if (shorterMatches.length > 0) embed.addField('Shorter matches', shorterMatches.map(match => `- \`${match.formatted}\``).join('\n'));
		}

		return { embeds: [embed.toJSON()] }
	}
}
module.exports = Method;
// const { SlashCommand } = require('slash-create');

// class Ping extends SlashCommand {
// 	constructor(creator) {
// 		super(creator, {
// 			name: 'testing',
// 			description: 'Get ping',
// 			guildID: '677485372988456970'
// 		});

// 		this.filePath = __filename;
// 	}
// 	async run(ctx) {
// 		return 'Pong 🏓';
// 	}
// }
// module.exports = Ping;