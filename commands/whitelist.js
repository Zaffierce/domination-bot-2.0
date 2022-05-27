const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Provides information on how to whitelist your account.')
		.setDefaultPermission(true),
	async execute(interaction, bot) {
		const embed = new MessageEmbed()
			.setTitle('DomiNATION Patreon Whitelisting Steps')
			.setColor('#8500FF')
			.setDescription(`Thank you for supporting our community.  Please follow the steps provided below to link and whitelist your accounts.`)
			.addFields(
				{ name: `**Step 1:  Link your Patreon to your Discord Account**`, value: `Follow the ["How do I get my Discord Rewards"](https://support.patreon.com/hc/en-us/articles/212052266-How-do-I-get-my-Discord-Rewards/) guide and link your Patreon Account to your Discord Account.` },
				{ name: `**Step 2:  Link your Steam account to DomiNATION**`, value: `Click [this link here](https://ark.domination-gaming.com/rest/auth/steam/login/ 'DomiNATION Steam Log in link')` },
				{ name: `**Step 3:  Link your Discord account to DomiNATION**`, value: `Click [this link here](https://ark.domination-gaming.com/rest/discord 'DomiNATION Discord Log in link')` },
				{ name: `**Step 4:  Please wait**`, value: `If your Discord account now reflects one of the Patreon roles, and you've followed Steps 1 - 3, please allow up to 60 minutes for internal processes to complete and sync across the servers.  If you are still not whitelisted after waiting, please repeat the steps again before reaching out to the Admins for further assistance.` },
        { name: `Extra Tips:`, value: `● You may check the progress of this by viewing your [DomiNATION profile](https://ark.domination-gaming.com/user).\n● Ensure that you're signed into the correct accounts.\n● Remove any emojis from your name, as this can cause issues.` }
			);
		await bot.users.cache.get(interaction.user.id).send({ embeds: [embed] }).then((msg) => {
			return interaction.reply({ content: `Hiya Survivor, please check your DMs or click [this link here!](https://discord.com/channels/@me/${msg.channelId}/${msg.id})`, ephemeral: true });
		});
	},
};