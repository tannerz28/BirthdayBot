import { Command, CommandMessage, CommandoClient } from 'discord.js-commando'
import { Message } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'

export default class RegisterBirthdayCommand extends Command {
  constructor (client: CommandoClient) {
    super(client, {
      name: 'register',
      group: 'general',
      memberName: 'register',
      description: 'Register your birthday in the bot.',
      guildOnly: false,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: 'birthday',
          type: 'string',
          prompt: 'When is your birthday? (Use mm/dd/yyyy format)\n'
        }
      ]
    })
  }

  public async run (msg: CommandMessage, args: { birthday: string }): Promise<Message | Message[]> {
    if (!args.birthday || !new Date(args.birthday)) {
      return msg.reply('Birthday was entered in invalid format.')
    }

    const users: Record<string, Date> = JSON.parse(readFileSync('../../../data/users.json', 'utf-8'))

    if (users[msg.author.id]) {
      return msg.reply('You have already added your birthday.')
    }

    users[msg.author.id] = new Date(args.birthday)

    writeFileSync('../../../data/users.json', users)

    return msg.reply('Your birthday has been registered')
  }
}
