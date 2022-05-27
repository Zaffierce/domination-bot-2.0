const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yardsale')
		.setDescription('Provides information about the YardSale Event.')
		.setDefaultPermission(true),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setTitle('Community Center [CC] YardSale Information')
			.setColor('#ff8a52')
      .setDescription(`The [CC] YardSale is a community based event, ran by the community for the community, in where players can buy, sell and trade almost anything within the game.  From raw materials, crafted items, dinosaurs, robots - you name it, it's probably being sold at this event!  In addition to the YardSale, there's also an "Egg Toss" event at the end!`)
      .addFields(
        { name: "**When**", value: "Every **1st and 3rd Saturday** of the every month, between **1PM-4PM CST**." },
        { name: "**Where**", value: "[DomiNATION #12 - Event Map](https://ark.spectrumdominus.com/server/12) - [Event Map Download Link](https://steamcommunity.com/sharedfiles/filedetails/?id=788341599)" },
        { name: "**How do I buy something?**", value: "The [CC] has a 'bank' setup, and the most commonly accepted currency is either **hard polymer** or **metal ingots**, speak to a member from the [CC] to setup your bank then transfer your currency to the Event Map!" },
        { name: "**How do I sell something?**", value: "All you have to do is contact any member you find here in Discord that has the [CC] in their name and they will assist you in getting set up!" },
        { name: "**What's this 'Egg Toss' event?**", value: "In the final hour of the YardSale, the [CC] hosts an Egg Toss event in which numerous eggs are hatched and it's a free for all allowing you to claim the babies!  Cryopods are provided during this event for easy transfer back to your home server afterwards." },
        { name: "**Can I host something that doesn't involve selling/trading?**", value: "Yes!  In the past, we have had mini-games setup during the YardSale which were super fun and unique!  Doing this should be approved by the [CC] and the Admin's, but we really encourage it as they are so much fun!" },
        { name: "**Something not covered here but you're curious about?**", value: "Contact Cowdog#1764 or anyone with the [CC] in their nickname for additional questions or queries." }
      )
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};