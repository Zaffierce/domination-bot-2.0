const { SlashCommandBuilder } = require('@discordjs/builders');
const { saveDataToFile, checkIfExisting, deleteRule, postRulesHandler, saveRulesHandler } = require('../utils/admin/adminInteractionHandler.js');
const { embedBuilder } = require('../utils/admin/adminEmbedBuilder.js');
const { buttonBuilder } = require('../utils/admin/adminButtonBuilder.js');
const { selectMenuOptionBuilder } = require('../utils/admin/adminSelectMenuOptionBuilder.js');
const { modalBuilder, modalBuilderAdd, modalBuilderEdit } = require('../utils/admin/adminModalBuilder.js');
const { components } = require('../utils/admin/adminComponentBuilder.js');


const execute = async (interaction, bot) => {
	// console.log(interaction)
	if (interaction.type === "APPLICATION_COMMAND") {
		return interaction.reply({
			embeds: [await embedBuilder('main')],
			components: [await components('main')],
			ephemeral: true
		});
	}

	if (interaction.type === "MESSAGE_COMPONENT") {
		let responseObject;
		let selection;
		switch(interaction.componentType) {
			case 'SELECT_MENU':
				selection = interaction.values[0].split("_");
				// console.log("SELECT_MENU customId, values[0]", interaction.customId, interaction.values[0])
				switch(interaction.customId) { //interaction.values[0] = enter_discord, enter_ark, enter_postrules, enter_config
					case 'mainMenuSelection':
						// console.log("admin SELECT_MENU mainMenuSelection selection[1]", selection);
						switch(selection[1]) {
							case 'postrules':
								responseObject = {
									type: 7,
									data: {
										embeds: [ await embedBuilder(interaction.values[0]) ],
										components: [ await components(interaction.values[0]) ]
									}
								}
								break;

							case 'config':
								responseObject = {
									type: 7,
									data: {
										embeds: [ await embedBuilder(interaction.values[0]) ],
										components: [ await components(interaction.values[0]) ]
									}
								}
								break;

							default:
								responseObject = {
									type: 7,
									data: {
										embeds: [ await embedBuilder(interaction.values[0]) ],
										components: [ await components(interaction.values[0]) ]
									}
								}
								break;
						}
						break;
					
					case 'edit': //edit_discord_2 customId_values
						// console.log("admin SELECT_MENU edit selection[1]", selection[1]);
						switch(selection[1]) {
							case 'main':
								responseObject = {
									type: 7,
									data: {
										embeds: [await embedBuilder('main')],
										components: [await components('main')],
									}
								}
								break;
							
							case 'add':
								responseObject = {
									type: 9,
									data: await modalBuilder([selection[1], selection[0], null], null) //['add', 'discord', '1'], null embed obj
								}
								break;

							default:
								responseObject = {
									type: 7,
									data: {
										embeds: [ await embedBuilder(`${interaction.customId}_${interaction.values[0]}`) ],
										components: [ await components(`${interaction.customId}_${interaction.values[0]}`, true) ]
									}
								}
								break;
						}
						break;
				}
				return await bot.api.interactions(interaction.id)[interaction.token].callback.post({ data: responseObject });

			case 'BUTTON':
				selection = interaction.customId.split("_");
				// console.log("BUTTON selection", selection);
				switch(selection[0]) {
					case 'edit':
						responseObject = {
							type: 9,
							data: await modalBuilder(selection, interaction.message.embeds[0])
						}
						break;

					case 'postrules':
						postRulesHandler(bot);
						responseObject = {
							type: 7,
							data: {
								embeds: [ await embedBuilder('postrulessuccess') ],
								components: [ await components('postrulessuccess') ]
							}
						}
						break;

					case 'delete':
						if (selection[1] === "confirm") {
							// console.log("Delete confirm embed", interaction.message.embeds[0])
							// console.log("delete confirm selection", selection);
							await deleteRule(selection[2], selection[3]);
							responseObject = {
								type: 7,
								data: {
									embeds: [ await embedBuilder('main') ],
									components: [ await components('main') ]
								}
							}
						} else {
							responseObject = {
								type: 7,
								data: {
									embeds: [ await embedBuilder(`delete_${selection[1]}`, interaction.message.embeds[0]) ],
									components: [ await components(`delete_${selection[1]}_${selection[2]}`) ]
								}
							}
						}
						break;

					case 'save':
						await saveRulesHandler(bot, interaction.customId, interaction.message.embeds[0]);
						responseObject = {
							type: 7,
							data: {
								embeds: [ await embedBuilder(`enter_${selection[1]}`) ],
								components: [ await components(`enter_${selection[1]}`) ]
							}
						}
						break;

					case 'exit':
						//
						break;

					case 'return':
						responseObject = {
							type: 7,
							data: {
								embeds: [ await embedBuilder(`enter_${selection[1]}`) ],
								components: [ await components(`enter_${selection[1]}`) ]
							}
						}
						break;

					case 'main':
						responseObject = {
							type: 7,
							data: {
								embeds: [await embedBuilder('main')],
								components: [await components('main')]
							}
						}
						break;
				}
				return await bot.api.interactions(interaction.id)[interaction.token].callback.post({ data: responseObject }); //{ type: callbackType, data: fetchedModal }

			case 'MODAL':
				let opt = interaction.data.custom_id.split("_"); //Why this is custom_id and not customId is beyond me.
				let ruleNum = interaction.data.components[0].components[0].value;
				let ruleText = interaction.data.components[1].components[0].value;
				let isDuplicate = await checkIfExisting(opt[1], ruleNum);
				// console.log("MODAL Submit", opt); // ['edit', 'discord']
				// console.log("MODAL Submit ruleNum, ruleText", ruleNum, ruleText)
				switch(opt[0]) {
					case 'add':
						// console.log("add", ruleNum, ruleText)
						// console.log(opt)
						if (!isDuplicate) {
							responseObject = {
								type: 7,
								data: {
									embeds: [ await embedBuilder(interaction.data.custom_id, interaction.data.components) ], //add_discord, components
									components: [ await components(`add_${opt[1]}`, false) ]
								}
							}
						} else {
							responseObject = {
								type: 7,
								data: {
									embeds: [ await embedBuilder(`duplicate_${opt[1]}`, interaction.data.components) ], //add_discord, components
									components: [ await components(`duplicate_${opt[1]}`, true) ]
								}
							}
						}
						break;

					case 'edit':
						let origRuleNum = interaction.message.embeds[0].title.split("#")[1];
						let origRuleText = interaction.message.embeds[0].description;
						// console.log("MODAL edit embedData", interaction.data.custom_id, origRuleNum, ruleNum);
						// console.log(`Original Rule #${origRuleNum} - Modal Rule #${ruleNum}`)
						// console.log(origRuleText)
						if (origRuleNum !== ruleNum) {
							console.log("rule number was changed")
							responseObject = {
								type: 7,
								data: {
									//TODO: If isDuplicate then send a modified embed that gives a warning that this record cannot be saved?
									// if isDuplicate, disable(remove) the Delete button?
									// flags: 1 << 4,
									// content: "**!! UNABLE TO SAVE !!**\n**DUPLICATE ENTRY FOUND**\n**PLEASE CHANGE RULE NUMBER.**\n",
									embeds: [ await embedBuilder(`${interaction.data.custom_id}_${origRuleNum}`, interaction.data.components) ], 
									components: [ await components(`edit_${opt[1]}`, isDuplicate) ]
								}
							}
						} else {
							// console.log("rule number is the same")
							responseObject = {
								type: 7,
								data: {
									embeds: [ await embedBuilder(`${interaction.data.custom_id}_${origRuleNum}`, interaction.data.components) ],
									components: [ await components(`edit_${opt[1]}`, (origRuleText === ruleText) ? true : false) ]
								}
							}
						}
						break;
				}
				return await bot.api.interactions(interaction.id)[interaction.token].callback.post({ data: responseObject });
		}
	}
};

const handleModalSubmit = async (interaction, bot) => {
	const selection = interaction.data.custom_id.split("_"); //add_discord -> "add", "discord"
	const check = await checkIfExisting(selection[1], interaction.data.components[0].components[0].value);
	// console.log(check);

	if (selection[0] === "add") {
		let fetchedEmbed = await embedBuilder(interaction.data.custom_id, interaction.data.components);
		let fetchedComponent = await components(interaction.data.custom_id);
		await bot.api.interactions(interaction.id)[interaction.token].callback.post({ data: { type: 7, data: { embeds: [fetchedEmbed], components: [fetchedComponent] } } })
	}
	if (selection[0] === "edit") {
		let fetchedEmbed = await embedBuilder(interaction.data.custom_id, interaction.data.components);
		let fetchedComponent = await components(interaction.data.custom_id);
		await bot.api.interactions(interaction.id)[interaction.token].callback.post({ data: { type: 7, data: { embeds: [fetchedEmbed], components: [fetchedComponent] } } })
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription(`Command designated to assist Admin's with Admin related tasks`)
		.setDefaultPermission(false),
	execute,
	handleModalSubmit
};