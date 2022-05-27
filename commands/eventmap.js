const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eventmap')
		.setDescription('Provides information about the Event Map.')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setTitle('Event Map Information')
      .setDescription("We frequently host events on a custom map which we call the 'Event Map', this requires you to subscribe to the mod on the Steam store but it's an easy download.  Just follow the information below!")
      .addFields(
        { name: "**Event Map Download Link**", value: "[Steam WorkShop Event Map Download Link](https://steamcommunity.com/sharedfiles/filedetails/?id=788341599)" },
        { name: "Subscribe to the Mod", value: "Click the + Subscribe button on this page - you may be prompted to sign in via Steam but this should automatically trigger Steam to download this file."},
        { name: "Relaunch Ark", value: "If Ark's open when you did this, restart the game.  When you're at the welcome screen on Ark, in the bottom right you may see a 'Downloading Event Map' text."},
        { name: "Join the Event Map", value: "To verify that this has successfully installed, try joining [DomiNATION #12 - Event Map](https://ark.spectrumdominus.com/server/12).  This map is also available to transfer from every server in our cluster, so you could also do this in game."}
      )
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};