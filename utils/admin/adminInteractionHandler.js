const { MessageEmbed } = require('discord.js');
const discordRules = require('../../data/discordRules.json');
const arkRules = require('../../data/arkRules.json');
const patreonRules = require('../../data/patreonRules.json');
const ARKAdmins = require('../../data/ARKAdmins.json');
const ASAAdmins = require('../../data/ASAAdmins.json');
const banRules = require('../../data/banRules.json');
require('dotenv').config();
const { ARK_RULES_ID } = process.env;
const fs = require("fs");

const saveDataToFile = async (opt, embed) => {
  // console.log("saveDataToFileOpt", opt);
  // console.log("saveDataToFileEmbed", embed);
  const selection = opt.split("_"); //add_discord -> "add", "discord"
  let fileName, filePath, ruleNum, ruleText
  switch(selection[1]) {
    case 'discord':
      fileName = discordRules;
      filePath = './data/discordRules.json';
      break;

    case 'ark':
      fileName = arkRules;
      filePath = './data/arkRules.json';
      break;

    case 'patreon':
      fileName = patreonRules;
      filePath = './data/patreonRules.json';
      break;

    case 'ban':
      fileName = banRules;
      filePath = './data/banRules.json';
      break;

    case 'serveradmin':
      fileName = ARKAdmins;
      filePath = './data/ARKAdmins.json';
      break;

    case 'serveradmin2':
      fileName = ASAAdmins;
      filePath = './data/ASAAdmins.json';
      break;
  }
  ruleNum = embed.title.split("#")[1];
  ruleText = embed.description;

  if (!fileName[ruleNum]) fileName[ruleNum] = {
    ruleText: ruleText,
    ruleNum: ruleNum,
    messageID: "none"
  };

  fileName[ruleNum] = {
    ruleText: ruleText,
    ruleNum: ruleNum,
    messageID: fileName[ruleNum].messageID
  }

  fs.writeFile(filePath, JSON.stringify(fileName), (err) => {
    if (err) console.log(err);
  });

  return fileName[ruleNum].messageID;
}

const fetchExistingRule = async (opt) => {
  // console.log("fetchExisting", opt)
  const selection = opt.split("_"); //discord_1 -> "discord", "1"
  let fileName, filePath, ruleNum, ruleText
  switch(selection[0]) {
    case 'discord':
      fileName = discordRules;
      filePath = './data/discordRules.json';
      break;

    case 'ark':
      fileName = arkRules;
      filePath = './data/arkRules.json';
      break;

    case 'patreon':
      fileName = patreonRules;
      filePath = './data/patreonRules.json';
      break;

    case 'ban':
      fileName = banRules;
      filePath = './data/banRules.json';
      break;

    case 'serveradmin':
      fileName = ARKAdmins;
      filePath = './data/ARKAdmins.json';
      break;

    case 'serveradmin2':
      fileName = ASAAdmins;
      filePath = './data/ASAAdmins.json';
      break;
  }
  return fileName[selection[1]];
}

const checkIfExisting = async (opt, ruleNum) => { //discord, 3
  // console.log("checkIfExisting", opt, ruleNum)
  let fileName;
  switch(opt) {
    case 'discord':
      fileName = discordRules;
      break;

    case 'ark':
      fileName = arkRules;
      break;

    case 'patreon':
      fileName = patreonRules;
      break;
    
    case 'ban':
      fileName = banRules;
      break;

    case 'serveradmin':
      fileName = ARKAdmins;
      break;

    case 'serveradmin2':
      fileName = ASAAdmins;
      break;
  }
  if (fileName[ruleNum]) return true
  else return false
}

const deleteRule = async (opt, ruleNum) => {
  // console.log("deleteRule", opt, ruleNum);
  const selection = opt.split("_"); //discord_1 -> "discord", "1"
  switch(selection[0]) {
    case 'discord':
      fileName = discordRules;
      filePath = './data/discordRules.json';
      break;

    case 'ark':
      fileName = arkRules;
      filePath = './data/arkRules.json';
      break;

    case 'patreon':
      fileName = patreonRules;
      filePath = './data/patreonRules.json';
      break;

    case 'ban':
      fileName = banRules;
      filePath = './data/banRules.json';
      break;

    case 'serveradmin':
      fileName = ARKAdmins;
      filePath = './data/ARKAdmins.json';
      break;

    case 'serveradmin2':
      fileName = ASAAdmins;
      filePath = './data/ASAAdmins.json';
      break;
  }
  try {
    delete fileName[ruleNum];
    fs.writeFile(filePath, JSON.stringify(fileName), (err) => {
      if (err) console.log(err);
    });
    return `${opt} #${ruleNum} has been deleted`;
  } catch(e) {
    console.log("Error while trying to delete rule", e);
    return e;
  }
}

const fetchNewRules = async () => {
  let ruleArr = [discordRules, arkRules, patreonRules, ARKAdmins, ASAAdmins, banRules];
  let newRuleArr = [];
  const rules = Object.keys(ruleArr);
  rules.forEach((key, value) => {
    Object.entries(ruleArr[key]).forEach(([k,v]) => {
      if (v.messageID === "none") {
        newRuleArr.push(v);
      }
    });
  });
  return newRuleArr;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

async function editExistingMessage(bot, messageID, newRuleData) {
  const channel = bot.channels.cache.get(ARK_RULES_ID);
  let fetchedMessage = await fetchMessageByID(channel, messageID);
  const newEmbed = new MessageEmbed()
    .setColor(fetchedMessage.embeds[0].color)
    .setTitle(newRuleData.title)
    .setDescription(newRuleData.description)
    // .addFields({ name: newRuleData.title, value: newRuleData.description })
  await fetchedMessage.edit({embeds: [newEmbed]});
}

function fetchMessageByID(channel, messageID) {
  return new Promise(resolve => {
    resolve(channel.messages.fetch(messageID));
  });
}

function fetchChannelMessageSize(channel, amount) {
  return new Promise(resolve => {
    // const channel = bot.channels.cache.get(ARK_RULES_ID);
    channel.messages.fetch({ limit: amount ? amount : 100 }).then(m => {
      resolve(m.size);
    });
  })
};

function fetchAndDeleteMessages(bot, interaction, amount) {
  const channel = bot.channels.cache.get(interaction.channelId);
  channel.messages.fetch({ limit: amount ? amount : 100 }).then(m => {
    m.forEach((msg) =>{
      msg.delete();
    });
  });
};

async function fetchMessageSizeWithSleep(channel, amount, ms) {
  await sleep(ms)
  return await fetchChannelMessageSize(channel, amount);
}

// async function sendAnnouncement()
// await sendAnnouncement(interaction.customId, interaction.message.embeds[0]);

async function fetchAndDelete(channel, amount) {
  try {
    channel.messages.fetch({ limit: amount ? amount : 100 }).then(m => {
      // console.log("Amount to delete:", m.size);
      m.forEach((msg) => {
        msg.delete();
      });  
    });
    if (!amount) {
      let messagesRemaining = await fetchMessageSizeWithSleep(channel, amount, 5000);
      while (messagesRemaining > 0) {
        // console.log("Remaining:", messagesRemaining);
        messagesRemaining = await fetchMessageSizeWithSleep(channel, amount, 5000);
      }
      // console.log("Messages successfully deleted!");
    }
    return true;
  } catch(e) {
    return e;
  }
}

async function saveRulesHandler(bot, opt, embed) {
  let messageID = await saveDataToFile(opt, embed);
  if (messageID !== "none") {
    //Message exists
    await editExistingMessage(bot, messageID, embed);
  }
  //Send announcement with updated information (?)
}

async function postRulesHandler(bot) {
  const channel = bot.channels.cache.get(ARK_RULES_ID);
  await fetchAndDelete(channel, null);
  await postRules(channel);
  // bot.emit('test', 'Finished posting the rules', true); //TODO: Test bot.emit capability for science.
  // console.log(post);
  // return post;
}

async function deleteMessagesHandler(bot, interaction, amountToDelete) {
  const channel = bot.channels.cache.get(ARK_RULES_ID);
  await fetchAndDelete(channel, amountToDelete);
  return true;
}

async function postRules(channel) {
  const lineBreakEmbed = new MessageEmbed()
    .setColor('#000000')
    .addField('\u200b', '\u200b');
  const embedHeader = new MessageEmbed()

  const embedFooter = new MessageEmbed()
    .setColor('#000000')
    .setTimestamp()
    .setFooter({ text: 'Posted on' })

  let ruleArr = [discordRules, arkRules, patreonRules, ARKAdmins, ASAAdmins, banRules];
  const rules = Object.keys(ruleArr);
  rules.forEach((key) => {
    switch(key) {
      case '0': //Discord
        embedHeader.setColor('#0099FF')
        embedHeader.setAuthor({ name: 'DomiNATION Discord Rules' })
        embedHeader.setDescription(`These are the rules for the DomiNATION Discord.  Please be aware that these may change at any time and also apply to DM's with members of this server.  Anything you say in a DM can and will be used against you if brought to the admin's with proof.`)
        embedHeader.setThumbnail('https://lh3.googleusercontent.com/_4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkA=w256')
        break;
      
      case '1': //Ark
        embedHeader.setColor('#76FF33')
        embedHeader.setAuthor({ name: 'DomiNATION Ark Rules' })
        embedHeader.setDescription(`These are the rules for the DomiNATION Ark Cluster.  Please be aware that these may change at any time.  Anyone who breaks the following rules will be dealt with on a case by case basis and at full discretion of the admins, with varying degrees of punishment up to and including wipes/bans.`)
        embedHeader.setThumbnail('http://orig14.deviantart.net/2c5f/f/2015/311/3/5/ark_survival_evolved_icon_by_troublem4ker-d9fw57a.png')
        break;

      case '2': //Patreon
        embedHeader.setColor('#8500FF')
        embedHeader.setAuthor({ name: 'DomiNATION Ark Patron Rules' })
        embedHeader.setDescription(`These are the rules for the DomiNATION Ark Patron's only!  All rules posted above still apply, but with slight modification as follows.`)
        embedHeader.setThumbnail('https://cdn.discordapp.com/attachments/480355364613783566/570192827699560458/pirate-dilo-2_1.png')
        break;

      case '3': //Server Admins
        embedHeader.setColor('#F6DD0F')
        embedHeader.setAuthor({ name: 'Ark Admin Tribe Names' })
        embedHeader.setDescription(`The following is a full list of the current ARK admins and their tribes on each server.`)
        embedHeader.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/570453800129658892/e4d52f4d69d7bba67e5fd70ffe26b70d.png')
        break;

      case '4': //Server Admins
        embedHeader.setColor('#F6DD0F')
        embedHeader.setAuthor({ name: 'ASA Admin Tribe Names' })
        embedHeader.setDescription(`The following is a full list of the current ASA admins and their tribes on each server.`)
        embedHeader.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/570453800129658892/e4d52f4d69d7bba67e5fd70ffe26b70d.png')
        break;

      case '5': //Ban
        embedHeader.setColor('#F44242')
        embedHeader.setAuthor({ name: 'DomiNATION Gaming Point System 2.0' })
        embedHeader.setDescription(`This is the guidelines by which the Admin's follow when issuing punishments.  This is public to make it known to all, so each punishment is fair and just.  Points are accumulated by breaking the rules, each violation of a rule gains a player(s) points depending on severity and times occured.  Punishments are handed down based on how many points a player(s) has, based on the following guide:`)
        embedHeader.setThumbnail('https://cdn.discordapp.com/attachments/566853064967847946/572723585840447499/ban-hammer-ol-512.png')
        break;
    }    
    channel.send({ embeds: [embedHeader] });

    Object.entries(ruleArr[key]).forEach(([k,v]) => {
      let fileName, filePath;
      const embedBody = new MessageEmbed()
      switch(key) {
        case '0': //Discord
          embedBody.setColor('#0099FF')
          embedBody.setTitle(`Discord Rule #${v.ruleNum}`)
          embedBody.setDescription(`${v.ruleText}`)
          // embedBody.addFields({ name: `Discord Rule #${v.ruleNum}`, value: `${v.ruleText}` })
          fileName = discordRules
          filePath = 'data/discordRules.json'
          break;
        
        case '1': //Ark
          embedBody.setColor('#76FF33')
          embedBody.setTitle(`Ark Rule #${v.ruleNum}`)
          embedBody.setDescription(`${v.ruleText}`)
          // embedBody.addFields({ name: `Ark Rule #${v.ruleNum}`, value: `${v.ruleText}` })
          fileName = arkRules
          filePath = 'data/arkRules.json'
          break;

        case '2': //Patreon
          embedBody.setColor('#8500FF')
          embedBody.setTitle(`Patreon Rule #${v.ruleNum}`)
          embedBody.setDescription(`${v.ruleText}`)
          // embedBody.addFields({ name: `Patreon Rule #${v.ruleNum}`, value: `${v.ruleText}` })
          fileName = patreonRules
          filePath = 'data/patreonRules.json'
          break;

        case '3': //Server Admins
          embedBody.setColor('#F6DD0F')
          embedBody.setTitle(`Ark Server #${v.ruleNum}`)
          embedBody.setDescription(`${v.ruleText}`)
          // embedBody.addFields({ name: `Ark Server #${v.ruleNum}`, value: `${v.ruleText}` })
          fileName = ARKAdmins
          filePath = 'data/ARKAdmins.json'
          break;

        case '4': //Server Admins
        embedBody.setColor('#F6DD0F')
        embedBody.setTitle(`ASA Server #${v.ruleNum}`)
        embedBody.setDescription(`${v.ruleText}`)
        // embedBody.addFields({ name: `Ark Server #${v.ruleNum}`, value: `${v.ruleText}` })
        fileName = ASAAdmins
        filePath = 'data/ASAAdmins.json'
        break;

        case '5': //Ban
          embedBody.setColor('#F44242')
          embedBody.setDescription(`${v.ruleText}`)
          fileName = banRules
          filePath = 'data/banRules.json'
          break;
      }
      channel.send({embeds: [embedBody]}).then(m => {
        fileName[k].messageID = m.id;
        fs.writeFile(filePath, JSON.stringify(fileName), (err) => {
          if (err) console.log(err);
        });
      });
    });
    if (key !== '4') channel.send({embeds: [lineBreakEmbed]});
  }); 
  channel.send({embeds: [embedFooter]});
  return true;
}

module.exports = {
  checkIfExisting,
  deleteRule,
  deleteMessagesHandler,
  fetchExistingRule,
  fetchNewRules,
  postRulesHandler,
  saveDataToFile,
  fetchAndDeleteMessages,
  saveRulesHandler
}
