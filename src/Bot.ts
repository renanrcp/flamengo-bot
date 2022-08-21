import 'dotenv/config';
import { Client, ClientOptions } from 'discord.js';
import Ready from './listeners/Ready';
import InteractionCreate from './listeners/InteractionCreate';

console.log("Bot is starting...");

const client = new Client({
  intents: []
});

Ready(client);
InteractionCreate(client);

client.login(process.env.BOT_TOKEN);