import { Client } from 'discord.js-commando'
const { token, ownerId, prefix } = require('../config/bot-settings.json')

// Instantiate a new client, configure some options
const client = new Client({
  unknownCommandResponse: false,
  disableEveryone: true,
  owner: ownerId,
  commandPrefix: prefix
})

// Wrap login method make it easier to call
const login = async () => {
  await client.login(token)
}

// If an error occurs, restart the bot so it will be up 24/7
const onError = (err?: Error) => {
  console.warn('An error has occurred. Will relaunch bot.')
  console.error(err)
  setTimeout(() => login(), 5000)
}

// Once the bot is ready to be used.
client.on('ready', () => {
  console.log('Ready!')
})

// When the bot errors, call the error function
client.on('error', onError)

// Register all the commands
client.registry.registerCommandsIn('commands').registerGroup('general', 'General')

// Start the bot
login()
