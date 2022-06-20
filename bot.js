const { Client, Collection, Intents, MessageEmbed, } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_WEBHOOKS]});
const config = require('./config.json');
const { deleteAllCommands, deleteSingleCommand, getCommands, start } = require('./utils/commandHandler.js');
const { errorHandler } = require("./utils/errorHandler.js");
require('dotenv').config();
const { TOKEN, ARK_NOTIFICATIONS_ID, ARK_TICKET_SUBMISSIONS } = process.env;

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
    const errMsgID = await errorHandler(e, interaction);
    await interaction.reply({ content: 'An error has occurred, please report this to Zaff.\nError ID: ```'+errMsgID+'```', ephemeral: true });
  }
});

bot.ws.on('INTERACTION_CREATE', async (interaction) => {
  if (interaction.type != 5) return;
  interaction.type = 'MESSAGE_COMPONENT'
  interaction.componentType = 'MODAL'

  const commandName = interaction.message.interaction.name;
  const command = bot.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(interaction, bot);
  } catch (e) {
    const errMsgID = await errorHandler(e, interaction);
    await interaction.reply({ content: 'An error has occurred, please report this to Zaff.\nError ID: `'+errMsgID+'`', ephemeral: true });
  }
});

bot.on('messageCreate', async (message) => {
  if (message.content.startsWith(config.prefix)) {
    const commandName = message.content.slice(1);
    const command = bot.commands.get(commandName);
    if (!command) return message.reply("I no longer support ! commands however I couldn't find a command like this, please type / to see the available commands.");
    else return message.reply('Please use the new slash commands instead by typing `/'+commandName+'`');
  };
  if (message.channelId === ARK_NOTIFICATIONS_ID) {
    const userID = message.content.split(',')[0].replace(/\D/g,'');
    const ticketType = message.content.split(',')[1];
    const ticketLink = message.content.split(',')[2];
    try {
      switch(ticketType) {
        case ' UPDATE':
          hlnaQuote = "Hello Survivor!  An Admin has left a note on your ticket!  Go check it out!"
          break;
        
        case ' COMPLETED':
          hlnaQuote = "G'day Survivor!  Just wanted to let you know that your ticket was completed!";
          break;
        
        case ' CANCELLED':
          hlnaQuote = 'Aw sorry Survivor, it seems your ticket was cancelled out!';
          break;
      }
      const fetchedUser = await message.guild.members.fetch(userID);
      const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription(hlnaQuote)
        .setTitle('DomiNATION Support Ticket Notifier')
        .setURL(ticketLink)
        .setThumbnail('https://cdn.discordapp.com/attachments/483968919804313600/778014605410697246/20201116164643_1.png')
        .addFields({ name: '**Ticket Link**', value: ticketLink, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Message sent on' })
      fetchedUser.send({ embeds: [embed] });
    } catch(e) {
      bot.channels.cache.get(ARK_TICKET_SUBMISSIONS).send({ content: 'An error has occurred while sending ticket notification to user <@'+userID+'> ```'+e+'```'});
    }
  };
});

bot.login(TOKEN);