const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('element')
		.setDescription('Provides information about how to transfer Element across the cluster.')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setAuthor({ name: 'Element Transfer Information' })
			.setColor("#3E82F7")
			.setDescription("Element can't be transferred between servers, Wildcard doesn't allow it.  However, we have provided a work around for this by following these simple steps.")
			.addFields(
				{name: "Step 1", value: "Put your Element into a Fabricator/Tek Replicator and turn it into Transponder Nodes."},
				{name: "Step 2", value: "Transfer these Transponder Nodes to the new server by either having them in your inventory when you transfer your character, or by uploading them using an Obelisk."},
				{name: "Step 3", value: "On your desired server, put the Transponder Nodes inside of a Fabricator/Tek Replicator and then turn them back to Element!"},
				{name: "Note:", value: "You will need at least 1 element to turn on your Tek Replicator so be prepared!"}
			)
			.setThumbnail("https://cdn.discordapp.com/attachments/566853064967847946/986763377764352070/unknown.png");
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};