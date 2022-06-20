//TODO:  Error Handler partially wrote for Interaction Creation Commands, needs to be expanded out to capture the rest.
const fs = require("fs");
const errorLog = require('../data/errorLog.json');
const { randomUUID } = require('crypto');

const errorHandler = async (errMsg, interaction) => {
  const uuid = randomUUID();
  await saveError(errMsg, interaction, uuid);
  console.log('*** ERROR ***', uuid)
  console.error(errMsg);
  return uuid;
};

async function saveError(errMsg, interaction, uuid) {
  const user = interaction.user;
  const message = interaction.message.interaction;
  const unixTime = Math.floor(new Date(Date.now()).getTime()/1000);
  
  errorLog[uuid] = {
    id: uuid,
    time: unixTime,
    user: user.id,
    interaction: message.commandName,
    errorMsg: errMsg.stack,
  }

  fs.writeFile('data/errorLog.json', JSON.stringify(errorLog), (err) => {
    if (err) console.log(err);
  });
}

async function reportError(errData) {
  //Send a message to Zaff?
}

module.exports = {
  errorHandler
}