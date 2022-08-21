import 'dotenv/config';
import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
  throw new Error('Missing environment variables');
}

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);


