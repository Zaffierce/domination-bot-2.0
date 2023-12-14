const { MessageEmbed } = require('discord.js');
const { fetchExistingRule, fetchNewRules } = require('./adminInteractionHandler.js');
// const config = require('../../config.json');

const embedBuilder = async (opt, components) => {
	const selection = opt.split("_"); //add_discord -> "add", "discord"
	let ruleNum, ruleText
	let embed = new MessageEmbed()
	embed.setFooter({ text: "~•~ Exit at any time by clicking 'Dismiss message' below ~•~" });
	
	switch(selection[0]) {
		case 'main': 
			embed.setTitle('Admin Main Menu')
			embed.setDescription("Welcome to the Admin Menu where you can create, edit and delete your rules on the fly by utilizing the associated drop down menu's and buttons.  Any issues, reach out to Zaff.")
			embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/957385183009599498/red_gun.png')
			embed.setColor('#eb1200')
			break;
		
		case 'enter': //Main detailed menu of each rule
			embed.setDescription("Please select your option from the menu below.")
			switch(selection[1]) {
				case 'discord':
					embed.setTitle('Discord Rules Menu')
					embed.setThumbnail('https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w256')
					embed.setColor('#0099ff')
					break;

				case 'ark':
					embed.setTitle('Ark Rules Menu')
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/957394614975881346/d9fw57a-9a18dcd6-60b0-4ca4-bfcf-062f226f037d.png')
					embed.setColor('#76FF33')
					break;

				case 'patreon':
					embed.setTitle('Patreon Rules Menu')
					embed.setThumbnail('https://cdn.discordapp.com/attachments/480355364613783566/570192827699560458/pirate-dilo-2_1.png')
					embed.setColor('#8500FF')
					break;
				
				case 'ban':
					embed.setTitle('Ban Rules Menu')
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/572723585840447499/ban-hammer-ol-512.png')
					embed.setColor('#f44242')
					break;

				case 'serveradmin':
					embed.setTitle('Server Admin Listing')
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/570453800129658892/e4d52f4d69d7bba67e5fd70ffe26b70d.png')
					embed.setColor('#F6DD0F')
					break;

				case 'postrules':
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/968302704013238312/send.png')
					embed.setColor('RED')
					const newRules = await fetchNewRules();
					if (newRules.length > 0) {
						embed.setTitle('Would you like to post new rules?')
						embed.setDescription('When posting rules, all data inside of the #rules channel will be deleted out.\n\nThe following items are new and will not appear until this action has completed.')
						newRules.forEach((rule) => {
							embed.addFields(
								{ name: `Rule #${rule.ruleNum}`, value: rule.ruleText }
							)
						})
					} else {
						embed.setTitle('Nothing new found')
						embed.setDescription('When posting rules, all data inside of the #rules channel will be deleted out.\n\nNo new data was found however you may still choose to post if you wish to do so.')
					}
					break;

				// case 'config':
				// 	switch(selection[1]) {
				// 		case 'main':
				// 			break;
				// 	}
				// 	embed.setTitle('Config Data')
				// 	Object.entries(config).forEach(([k, v]) => {
				// 		embed.addFields(
				// 			{ name: `${k}`, value: `${v ? v : '-'}` }
				// 		)
				// 	});
				// 	break;

			}
			break;

		case 'edit': //opt = edit_discord_2  			//edit_discord_3, 3
		let fetchedRule;
		if (components) {
			fetchedRule = {
				ruleNum: components[0].components[0].value,
				ruleText: components[1].components[0].value
			}
		} else {
			fetchedRule = await fetchExistingRule(`${selection[1]}_${selection[2]}`);
		}
		embed.setDescription(fetchedRule.ruleText)
		switch(selection[1]) {
			case 'discord':
				embed.setTitle(`Discord Rule #${fetchedRule.ruleNum}`)
				embed.setThumbnail('https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w256')
				embed.setColor('#0099ff')
				break;

			case 'ark':
				embed.setTitle(`Ark Rule #${fetchedRule.ruleNum}`)
				embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/957394614975881346/d9fw57a-9a18dcd6-60b0-4ca4-bfcf-062f226f037d.png')
				embed.setColor('#76FF33')
				break;

			case 'patreon':
				embed.setTitle(`Patreon Rule #${fetchedRule.ruleNum}`)
				embed.setThumbnail('https://cdn.discordapp.com/attachments/480355364613783566/570192827699560458/pirate-dilo-2_1.png')
				embed.setColor('#8500FF')
				break;
			
			case 'ban':
				embed.setTitle(`Ban Message #${fetchedRule.ruleNum}`)
				embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/572723585840447499/ban-hammer-ol-512.png')
				embed.setColor('#f44242')
				break;

			case 'serveradmin':
				embed.setTitle(`Server Admin Listing for #${fetchedRule.ruleNum}`)
				embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/570453800129658892/e4d52f4d69d7bba67e5fd70ffe26b70d.png')
				embed.setColor('#F6DD0F')
				break;
		}
		break;

		case 'add':
			ruleNum = components[0].components[0].value;
			ruleText = components[1].components[0].value;
			switch(selection[1]){
				case 'discord':
					embed.setTitle(`Discord Rule #${ruleNum}`)
					embed.setDescription(ruleText)
					embed.setThumbnail('https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w256')
					embed.setColor('#0099ff')
					break;
		
				case 'ark':
					embed.setTitle(`Ark Rule #${ruleNum}`)
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/957394614975881346/d9fw57a-9a18dcd6-60b0-4ca4-bfcf-062f226f037d.png')
					embed.setDescription(ruleText)
					embed.setColor('#76FF33')
					break;
	
				case 'patreon':
					embed.setTitle(`Patreon Rule #${ruleNum}`)
					embed.setThumbnail('https://cdn.discordapp.com/attachments/480355364613783566/570192827699560458/pirate-dilo-2_1.png')
					embed.setDescription(ruleText)
					embed.setColor('#8500FF')
					break;
				
				case 'ban':
					embed.setTitle(`Ban Message #${ruleNum}`)
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/572723585840447499/ban-hammer-ol-512.png')
					embed.setDescription(ruleText)
					embed.setColor('#f44242')
					break;

				case 'serveradmin':
					embed.setTitle(`Server Admin Listing for #${ruleNum}`)
					embed.setDescription(ruleText)
					embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/570453800129658892/e4d52f4d69d7bba67e5fd70ffe26b70d.png')
					embed.setColor('#F6DD0F')
					break;
			}
			break;

		case 'duplicate':
			ruleNum = components[0].components[0].value;
			ruleText = components[1].components[0].value;
			embed.setColor('RED')
			embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/970060421002326107/close.png')
			switch(selection[1]){
				case 'discord':
					embed.setTitle(`Duplicate rule found.`)
					embed.setDescription(`The rule number **${ruleNum}** already exists, please return and try again.`)
					break;
			}
			break;

		case 'delete':
			embed.setColor('RED')
			embed.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/971185906985889812/unknown.png')
			embed.setTitle('Confirm Deletion')
			embed.addFields(
				{ name: "Rule #:", value: components.title },
				{ name: "Rule Text:", value: components.description }
				)
			break;

		case 'postrulessuccess':
			embed.setColor('GREEN')
			embed.setTitle('Post Rules')
			embed.setDescription('The rules are now being posted.')
			break;

		default: 
			embed.setTitle('No Embed Exists for this option');
	}
	return embed;
};

module.exports = {
  embedBuilder
}