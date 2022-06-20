const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postoffice')
		.setDescription('Provides information about the various Post Offices and Public Workshops here on Domi!')
		.setDefaultPermission(true),
	async execute(interaction, bot) {
		const embed = new MessageEmbed()
			.setTitle('DomiNATION Post Office & Public Workshops')
			.setURL('https://docs.google.com/spreadsheets/d/1JBpMMLBX8QABlMcF3VC-nCnsERQIcCyHy8E3QFb2NM0/edit#gid=0')
			.setColor('#3E82F7')
			.setDescription("G'day Survivor!  Here's a list of Post Offices and Public Workshops here on Domi!  https://docs.google.com/spreadsheets/d/1JBpMMLBX8QABlMcF3VC-nCnsERQIcCyHy8E3QFb2NM0/edit#gid=0")
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};