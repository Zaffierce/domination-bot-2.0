const discordRules = require('../../data/discordRules.json');
const arkRules = require('../../data/arkRules.json');
const patreonRules = require('../../data/patreonRules.json');
const ARKAdmins = require('../../data/ARKAdmins.json');
const ASAAdmins = require('../../data/ASAAdmins.json');
const banRules = require('../../data/banRules.json');

const modalBuilder = async (opt, embed) => { //['edit', 'discord', '1']
  let ruleNum, ruleText;
  // console.log("modalBuilder opt, embed", opt, embed)
  // console.log(embed)
  // console.log("opt", opt);
  switch(opt[1]) {
    case 'discord':
      ruleNum = 'Discord Rule #:'
      ruleLabel = 'Discord Rule Text:'
      break;
    case 'ark':
      ruleNum = 'Ark Rule #:'
      ruleLabel = 'Ark Rule Text:'
      break;
    case 'patreon':
      ruleNum = 'Patreon Rule #:'
      ruleLabel = 'Patreon Rule Text:'
      break;
    case 'serveradmin':
      ruleNum = 'Server #:'
      ruleLabel = 'ARK Admin List:'
      break;
    case 'serveradmin2':
      ruleNum = 'Server #:'
      ruleLabel = 'ASA Admin List:'
      break;
    case 'ban':
      ruleNum = "Ban Rule #:"
      ruleLabel = "Ban Rule Text:"
      break;

  }
  return {
    title: (opt[0] === "edit") ? "Editing rule" : "Creating rule",
    custom_id: `${opt[0]}_${opt[1]}`, //edit_discord
    components: [ 
      {
        type: 1,
        components: [
          {
            type: 4, //Text Input
            style: 1, //1 is short, 2 is paragraph w/ 4k char limit
            custom_id: 'ruleNum', //Custom ID to grab this data later
            value: opt[2] ? opt[2] 
                  : embed ? embed.title.split("#")[1]
                  : "", //embed.title is a string, so opt[2] instead to just grab #
            label: ruleNum, //Name above box
            required: true,
            placeholder: opt[2] ? null : 'Enter the rule/server number'
          }
        ]
      },
      {
        type: 1,
        components: [
          {
            type: 4, //Text Input
            style: 2, //1 is short, 2 is paragraph w/ 4k char limit
            custom_id: 'ruleText', //Custom ID to grab this data later
            value: embed ? embed.description : null,
            label: ruleLabel, //Name above box
            required: true,
            placeholder: embed ? null : 'Enter text for your rule'
          }
        ]
      }
    ]
  }
}

const modalBuilderAdd = async (opt) => {
  let ruleNum, ruleLabel;
  switch(opt) {
    case 'discord':
      ruleNum = 'Discord Rule #:'
      ruleLabel = 'Discord Rule Text:'
      break;
    case 'ark':
      ruleNum = 'Ark Rule #:'
      ruleLabel = 'Ark Rule Text:'
      break;
    case 'patreon':
      ruleNum = 'Patreon Rule #:'
      ruleLabel = 'Patreon Rule Text:'
      break;
    case 'serveradmin':
      ruleNum = 'Server #:'
      ruleLabel = 'ARK Admin List:'
      break;
    case 'serveradmin2':
      ruleNum = 'Server #:'
      ruleLabel = 'ASA Admin List:'
      break;
    case 'ban':
      ruleNum = "Ban Rule #:"
      ruleLabel = "Ban Rule Text:"
      break;
  }
  return {
    title: "Creating a new entry",
    custom_id: `add_${opt}`,
    components: [ 
      {
        type: 1,
        components: [
          {
            type: 4, //Text Input
            style: 1, //1 is short, 2 is paragraph w/ 4k char limit
            custom_id: 'ruleNum', //Custom ID to grab this data later
            label: ruleNum, //Name above box
            placeholder: 'Enter the rule/server number'
          }
        ]
      },
      {
        type: 1,
        components: [
          {
            type: 4, //Text Input
            style: 2, //1 is short, 2 is paragraph w/ 4k char limit
            custom_id: 'ruleText', //Custom ID to grab this data later
            label: ruleLabel, //Name above box
            placeholder: 'Enter text for your rule.'
          }
        ]
      }
    ]
  }
}

const modalBuilderEdit = async (opt, embed) => {
  let ruleText, ruleLabel;
  // console.log("modalBuilderEditOpt", opt)
  // console.log("modalBuilderEditEmbed", embed);
  if (embed) {
    // console.log("modalBuilderEditModalTrue")
    switch(opt) {
      case 'discord':
        ruleNum = 'Discord Rule #:'
        ruleLabel = 'Discord Rule Text:'
        break;
      case 'ark':
        ruleNum = 'Ark Rule #:'
        ruleLabel = 'Ark Rule Text:'
        break;
      case 'patreon':
        ruleNum = 'Patreon Rule #:'
        ruleLabel = 'Patreon Rule Text:'
        break;
      case 'serveradmin':
        ruleNum = 'Server #:'
        ruleLabel = 'ARK Admin List:'
        break;
      case 'serveradmin2':
        ruleNum = 'Server #:'
        ruleLabel = 'ASA Admin List:'
        break;
      case 'ban':
        ruleNum = 'Ban Rule #:'
        ruleLabel = 'Ban Rule Text:'
        break;
    }
    return {
      title: "Editing Value",
      custom_id: `edit_${opt}`,
      components: [ 
        {
          type: 1,
          components: [
            {
              type: 4, //Text Input
              style: 1, //1 is short, 2 is paragraph w/ 4k char limit
              custom_id: 'ruleNum', //Custom ID to grab this data later
              label: ruleNum, //Name above box
              value: embed[0].value
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 4, //Text Input
              style: 2, //1 is short, 2 is paragraph w/ 4k char limit
              custom_id: 'ruleText', //Custom ID to grab this data later
              label: ruleLabel, //Name above box
              value: embed[1].value
            }
          ]
        },
      ]
    }
  } else {
    // console.log("modalBuilderEditModalFalse")
    switch(opt) {
      case 'discord':
        ruleLabel = `Discord Rule #${embed[0].value}`
        ruleText = discordRules[selection[1]].ruleText
        // ruleText = embed[1].value
        break;
      case 'ark':
        ruleLabel = `Ark Rule #${selection[1]}`
        ruleText = arkRules[selection[1]].ruleText
        break;
      case 'patreon':
        ruleLabel = `Patreon Rule #${selection[1]}`
        ruleText = patreonRules[selection[1]].ruleText
        break;
      case 'serveradmin':
        ruleLabel = `ARK Admins for Server #${selection[1]}`
        ruleText = ARKAdmins[selection[1]].ruleText
        break;
      case 'serveradmin2':
        ruleLabel = `ASA Admins for Server #${selection[1]}`
        ruleText = ASAAdmins[selection[1]].ruleText
        break;
      case 'ban':
        ruleLabel = `Ban Rule #${selection[1]}`
        ruleText = banRules[selection[1]].ruleText
    }
    return {
      title: "Editing Value",
      custom_id: "cool_modal",
      components: [ 
        {
          type: 1,
          components: [
            {
              type: 4, //Text Input
              style: 2, //1 is short, 2 is paragraph w/ 4k char limit
              custom_id: 'text_field_s1', //Custom ID to grab this data later
              label: ruleLabel, //Name above box
              value: ruleText
            }
          ]
        },
      ]
    }
  }
}

module.exports = {
  modalBuilder,
  modalBuilderAdd,
  modalBuilderEdit
}