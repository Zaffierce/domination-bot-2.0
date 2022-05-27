const { Client, Collection, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_WEBHOOKS]});
const config = require('./config.json');
const { deleteAllCommands, deleteSingleCommand, getCommands, start } = require('./utils/commandHandler.js');
require('dotenv').config();
const { TOKEN } = process.env;

bot.commands = new Collection();

const fs = require('fs');
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for (const file of cmdFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
};

bot.once('ready', async () => {
  // await deleteAllCommands();
  // deleteSingleCommand('977327432854032384');
  
  await start(bot.commands);
  console.log("\n")
  const cmd = await getCommands();
  cmd.forEach((c) => {
    console.log(`Loading command ${c.name} - ID: ${c.id}`);
  });
  console.log("\n")
  console.log("DomiNATION HLN-A Version 2.0, Online Survivor!");
});

bot.on('interactionCreate', async (interaction) =>  {
  const commandName = interaction.commandName ? interaction.commandName : interaction.message.interaction.commandName;
  const command = bot.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(interaction, bot);
  } catch (e) {
    console.error(e);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

bot.ws.on('INTERACTION_CREATE', async (interaction) => {
  if (interaction.type != 5) return;
  interaction.type = 'MESSAGE_COMPONENT'
  interaction.componentType = 'MODAL'
  console.log("wsInteractionCreate", interaction.type, interaction.componentType);

  const commandName = interaction.message.interaction.name;
  const command = bot.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(interaction, bot);
  } catch (e) {
    console.error(e);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

bot.on('messageCreate', async (message) => {
  if (message.content.startsWith(config.prefix)) {
    return message.reply('Please use the new / command variant instead.').then(msg => { 
      setTimeout(() => { 
        msg.delete()
        message.delete();
      }, 10000);
    });
  }
});

// bot.on('test', console.log); //TODO: Future bot.emit project

// bot.on('raw', async message => {
//   console.log(message);
// });

bot.on('error', console.error); //TODO: Convert to errorHandler Function

bot.login(TOKEN);