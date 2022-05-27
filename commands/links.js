const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Provides various links for DomiNATION related websites')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setTitle('DomiNATION Websites')
			.setURL('https://domination-gaming.com/')
			.addFields(
				{ name: "Main Website", value: "[DomiNATION Gaming Website](https://domination-gaming.com/) - Our main website." },
				{ name: "Ark Website", value: "[DomiNATION Ark Website](https://ark.domination-gaming.com/) - Custom website built just for Ark." },
				{ name: "Ark Support Website", value: "[DomiNATION Ark Support Website](https://support.domination-gaming.com/) - Use this if you need assistance." },
				{ name: "Suggestion Website", value: "[DomiNATION Suggestions Website](https://domination-gaming.com/suggestions/) - Use this if you want to suggest something." },
				{ name: "Patreon Link", value: "[DomiNATION Patreon Link](https://domination-gaming.com/patreon) - Use this if you want to support our community" },
				{ name: "Patreon Rewards Link", value: "[DomiNATION Patreon Rewards Website](https://rewards.domination-gaming.com/) - Use this to view and claim Patreon rewards." },
			)
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};