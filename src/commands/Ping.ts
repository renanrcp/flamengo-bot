import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import Command from './Command';

const run = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  await interaction.reply('Pong!');
}

const Ping: Command = {
  name: 'ping',
  run
}

export default Ping;

