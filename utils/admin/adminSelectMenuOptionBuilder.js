const discordRules = require('../../data/discordRules.json');
const arkRules = require('../../data/arkRules.json');
const patreonRules = require('../../data/patreonRules.json');
const serverAdmins = require('../../data/serverAdmins.json');
const banRules = require('../../data/banRules.json');
const config = require('../../config.json');

const selectMenuOptionBuilder = async (opt) => {
  let selection = opt.split("_"); //add_discord -> "add", "discord"
  switch(selection[0]){
    case 'main':
      return [
        {	
          label: 'Discord',
          value: 'enter_discord',
          description: 'Choose this option to manage the Discord Rules',
          emoji: {
            name: "domi_discordlogo",
            id: "959889991826296883"
          }
        },
        {	
          label: 'Ark',
          value: 'enter_ark',
          description: 'Choose this option to manage the Ark Rules',
          emoji: {
            name: "domi_arkicon",
            id: "959889482209980426"
          }
        },
        {	
          label: 'Patreon',
          value: 'enter_patreon',
          description: 'Choose this option to manage the Patreon Rules',
          emoji: {
            name: "domi_patreon",
            id: "959890027511418910"
          }
        },
        {	
          label: 'Ban',
          value: 'enter_ban',
          description: 'Choose this option to manage the Ban Rules',
          emoji: {
            name: "domi_banhammer",
            id: "959889117989183548"
          }
        },
        {	
          label: 'Server Admins',
          value: 'enter_serveradmin',
          description: 'Choose this option to manage the Server Admin list',
          emoji: {
            name: "domi_adminstar",
            id: "959890009786298498"
          }
        },
        {	
          label: 'Post Rules',
          value: 'enter_postrules',
          description: 'Choose this option to post the rules',
          emoji: {
            name: "domi_send",
            id: "968302841389264938"
          }
        },
        {	
          label: 'Config',
          value: 'enter_config',
          description: 'Choose this option to modify various config data',
          emoji: {
            name: "Zaff",
            id: "456393493062090753"
          }
        },
    ]
  //view_discord
    case 'view':
      let options = [];
      switch(selection[1]) {
        case 'discord':
          for (let i in discordRules) {
            options.push({
              label: `Discord Rule #${(discordRules[i].messageID === "none" ? discordRules[i].ruleNum + " *NEW*" : discordRules[i].ruleNum)}`,
              value: `discord_${discordRules[i].ruleNum}`,
              description: discordRules[i].ruleText.length < 50 ? discordRules[i].ruleText : discordRules[i].ruleText.slice(0,50)+"..."
            });
          }
          break;
        
        case 'ark':
          for (let i in arkRules) {
            options.push({
              label: `Ark Rule #${arkRules[i].ruleNum}`,
              value: `ark_${arkRules[i].ruleNum}`,
              description: arkRules[i].ruleText.length < 50 ? arkRules[i].ruleText : arkRules[i].ruleText.slice(0,50)+"..."
            });
          }
          break;
        
        case 'patreon':
          for (let i in patreonRules) {
            options.push({
              label: `Patreon Rule #${patreonRules[i].ruleNum}`,
              value: `patreon_${patreonRules[i].ruleNum}`,
              description: patreonRules[i].ruleText.length < 50 ? patreonRules[i].ruleText : patreonRules[i].ruleText.slice(0,50)+"..."
            });
          }
          break;
        
        case 'ban':
          for (let i in banRules) {
            options.push({
              label: `Ban Rule #${banRules[i].ruleNum}`,
              value: `ban_${banRules[i].ruleNum}`,
              description: banRules[i].ruleText.length < 50 ? banRules[i].ruleText : banRules[i].ruleText.slice(0,50)+"..."
            });
          }
          break;

        case 'serveradmin':
          for (let i in serverAdmins) {
            options.push({
              label: `Server #${serverAdmins[i].ruleNum}`,
              value: `serveradmin_${serverAdmins[i].ruleNum}`,
              description: serverAdmins[i].ruleText.length < 50 ? serverAdmins[i].ruleText : serverAdmins[i].ruleText.slice(0,50)+"..."
            });
          }
          break;

        case 'config':
          Object.entries(config).forEach(([k, v]) => {
            options.push({
              label: `${k}`,
              value: `config_${k}`,
              description: v ? v : '-'
            });
          });
          break;
      }
      options.push(
        {
          label: 'New entry',
          value: `${selection[1]}_add`,
          description: 'Choose this option to make a new entry.'
        },
        {
          label: 'Return',
          value: 'return_main',
          description: 'Choose this to return to the main menu.'
        }
      )
      return options;
  }
}

module.exports = {
  selectMenuOptionBuilder
}