const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('website')
		.setDescription('DomiNATION Ark Website Link')
		.setDefaultPermission(true),
	async execute(interaction) {
		await interaction.reply({ content: 'https://ark.domination-gaming.com/', ephemeral: false });
	},
};