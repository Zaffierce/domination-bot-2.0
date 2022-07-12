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
			.setURL('https://docs.google.com/spreadsheets/d/1G60kchCLZtvi6oRyQnDnH5EoEwuvVWc5G-33zGc0x-4/edit?usp=sharing')
			.setColor('#3E82F7')
			.setDescription("G'day Survivor!  Here's a list of Post Offices and Public Workshops here on Domi!  https://docs.google.com/spreadsheets/d/1G60kchCLZtvi6oRyQnDnH5EoEwuvVWc5G-33zGc0x-4/edit?usp=sharing")
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};