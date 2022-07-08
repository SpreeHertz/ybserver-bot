const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "mc-help",
	description: "Search for an issue and get tips/help for the Minecraft server",
	options: [
		{
			name: "issue",
			description: "What your issue is",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "Falling to the void",
					value: "voidFalling",
				},
				{
					name: "Connection throttled! Please wait before reconnecting.",
					value: "throttlingError",
				},
				{
					name: "Connection refused: No further information",
					value: "connectionRefused",
				},
                {
                    name: 'How to join',
                    value: 'howToJoin',
                },
				{
					name: "Forgotten password",
					value: "passwordForgotten",
				},
				{
					name: "Connection reset",
					value: "connectionReset",
				},

			],
		},
	],
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction) => {
		const issueChoices = interaction.options.get('issue').value;

		if (issueChoices == 'voidFalling') {
			const voidFallingEmbed = new MessageEmbed()
				.setTitle('Falling into the void')
				.setDescription('Falling to the void could be due to several reasons. They are:')
				.addField('Issue Reason #1', 'Chunks are not loaded for you yet')
				.addField('Issue Reason #2', 'Your internet is unstable/laggy')
				.addField('Issue reason #3', 'Server lag (**unlikely**)')
				.setColor('RANDOM')
				.setFooter('If you truly believe this is an issue because of server lag, please contact the developers.');
			interaction.followUp({ embeds: [voidFallingEmbed] });

		}
		else if (issueChoices == 'connectionRefused') {
			const connectionRefused = new MessageEmbed()
				.setTitle('Connection Refused')
				.setDescription('Here are a few fixes for `Connection refused` error')
				.addField('Tip #1', 'Click on the `Refresh` button multiple times')
				.addField('Tip #3', 'Restart your internet/contact your Internet Service Provider (ISP)')
				.setColor('RANDOM');
			interaction.followUp({ embeds: [connectionRefused] });
		}
		else if (issueChoices === 'Forgot password') {
			const passwordForgotten = new MessageEmbed()
				.setTitle('Password forgotten')
				.addField('Possible Fix', 'Make a new TLauncher account with a new Account and VPN and make sure not to forget your password next time.')
				.setColor('RANDOM')
				.addField('Other Fix', 'Contact the SMP Staff.');
			interaction.followUp({ embeds: [passwordForgotten] });
		}
		else if (issueChoices === 'connectionReset') {
			const connectionReset = new MessageEmbed()
				.setTitle('Connection Reset')
				.setDescription('Here are a few fixes for `Connection reset` error')
				.addField('Tip #1', 'Click on the `Refresh` button multiple times')
				.addField('Tip #2', 'Check your port')
				.addField('Tip #3', 'Restart your internet/contact your Internet Service Provider (ISP)')
				.setColor('RANDOM');
			interaction.followUp({ embeds: [connectionReset] });
		}
        else if (issueChoices === 'howToJoin') {
            const howToJoin = new MessageEmbed()
            .setTitle('How to join')
            .addField('Server IP', 'Use `ybserver.apexmc.co`. If that doesn\'t work, use `51.81.48.162`')
            .addField('Port', '`25962` or `19568`')
            .addField('If on Bedrock', 'See image below:')
            .setImage('https://cdn.discordapp.com/attachments/969331290346246254/993361719504162866/unknown.png')
            .setColor('RANDOM')
            interaction.followUp({ embeds: [howToJoin] });
        }

	},
};