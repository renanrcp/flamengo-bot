import { Client } from 'discord.js';
import Command from '../commands/Command';
import Ping from '../commands/Ping';


const commands = new Map<string, Command>();
commands.set("ping", Ping);

export default async (client: Client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    await commands.get(commandName)?.run(interaction);
  });
}
