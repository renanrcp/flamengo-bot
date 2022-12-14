import { Client } from 'discord.js';
import Command from '../commands/Command';
import NextGame from '../commands/NextGame';
import Ping from '../commands/Ping';


const commands = new Map<string, Command>();
commands.set("ping", Ping);
commands.set("next-game", NextGame);

export default async (client: Client) => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    try {
      await interaction.deferReply();
      await commands.get(commandName)?.run(interaction);
    }
    catch (error) {
      console.error(error);
      await interaction.editReply('Ocorreu um erro ao executar o comando.');
    }
  });
}
