const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('breeders')
		.setDescription('Provides information about the DomiNATION Ark Breeding Community.')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setAuthor({ name: 'DomiNATION Ark Breeding Community' })
			.setColor("#F28500")
			.setDescription(`G'day Survivor!  Wanna find some stronger dinosaurs to help you survive the Ark?  Then why don't ya check this list out.`)
			.addField('Ark Breeders Sheet:','https://docs.google.com/spreadsheets/d/1yZXfdWVhpcpcwBQXirjLl-0mzFMCQsLeuhRg3M9ox2k/edit?usp=sharing', true)
			.setThumbnail("https://www.dododex.com/media/creature/featherlight.png");
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};