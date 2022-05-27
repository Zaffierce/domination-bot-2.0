const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('patreon')
		.setDescription('Provides information about the different Patreon tiers we offer.')
		.setDefaultPermission(true),
	async execute(interaction, bot) {
		const embed = new MessageEmbed()
			.setTitle('DomiNATION Patreon Information')
			.setURL('https://www.patreon.com/kakoen')
			.setThumbnail('https://cdn.discordapp.com/attachments/480355364613783566/570192827699560458/pirate-dilo-2_1.png')
			.setColor('#8500FF')
			.setDescription(`We are DomiNATION, a beginner-friendly Ark: Survival Evolved community that also hosts a wide variety of other games.  Thanks to those that support us, we are able to provide every Vanilla Ark Map, various custom maps and Patreon only maps which have mods installed.\n\nWe have a large team of dedicated admins, who love this game as much as you do, and we try out very best to give everyone an enjoyable time while they are here.\n\nIf you wish to support us and join our family, click on this link here - https://www.patreon.com/kakoen`)
			.addFields(
        {name: `\u200b`, value: `\u200b`},
				{name: `**DomiNATION Supporter - $5 USD**`, value: `● Get access to the supporter-only Discord channel and Supporter rank\n● Get access to supporter-only modded Ark servers\n● Get access to our supporter-only Valheim server\n● **Ark: Survivor Evolved** - Get access to Patreon-only events with execlusive prizes`},
        {name: `\u200b`, value: `\u200b`},
				{name: `**DomiNATION Supporter+ - $10 USD**`, value: `● All benefits from the previous tier\n● 3-day headstart on all new Ark PvE servers\n● Get acknowledged with the Supporter+ rank\n● **Ark: Survival Evolved** - Every month, get a max-level creature of your choice (PvE only) and insurance if something were to happen to it\n● **Conan: Exiles** - Every month, get a tier 3 fighter`},
        {name: `\u200b`, value: `\u200b`},
				{name: `**DomiNATION Supporter++ - $15 USD**`, value: `● All benefits from the previous tier\n● Get acknowledged with the Supporter++ rank\n● **Ark: Survivor Evolved** - Every 3 months spent as a Patreon in this tier or higher, gain 7 days of "Vacation".  Use these days to have admins reset timers and feed tames while you are away.  This can stack up to 4 weeks`},
        {name: `\u200b`, value: `\u200b`},
				{name: `**DomiNATOR - $20 USD**`, value: `● All benefits from the previous tier\n● Get acknowledged with the DomiNATOR rank\n● **Conan: Exiles** - Instead of a tier 3 fighter ($10 reward), you can get a named (tier 4) thrall of choice`}
			);
    await bot.users.cache.get(interaction.user.id).send({ embeds: [embed] }).then((msg) => {
			return interaction.reply({ content: `Hiya Survivor, please check your DMs or click [this link here!](https://discord.com/channels/@me/${msg.channelId}/${msg.id})`, ephemeral: true });
		});
	},
};