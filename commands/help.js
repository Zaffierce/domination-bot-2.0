const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Need to submit a help ticket to the Admins?')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setTitle('DomiNATION Ark Support')
			.setURL('https://support.domination-gaming.com/')
			.setThumbnail('https://cdn.discordapp.com/attachments/483968919804313600/778014605410697246/20201116164643_1.png')
			.setColor('RED')
			.setDescription("Ello Survivor!  Need a bit of help?  Don't you worry, HLN-A is here to help take care of you!")
			.addFields(
				{name: "**Step 1**", value: "Click this link right [here!](https://support.domination-gaming.com/ 'DomiNATION Support Website')"},
				{name: "**Step 2**", value: "Once that opens up, click on '**Open a Ticket**'"},
				{name: "**Step 3**", value: "Fill out the form completely and then submit the ticket!"},
				{name: "**Step 4**", value: "Sit back and relax, the Admin's will reach out to you.  I'll even send you a DM when your ticket updates!"}
			)
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};