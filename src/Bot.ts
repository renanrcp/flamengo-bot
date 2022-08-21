import "dotenv/config";
import { Client, ClientOptions } from "discord.js";
import Ready from "./listeners/Ready";

console.log("Bot is starting...");

const client = new Client({
  intents: []
});

Ready(client);

client.login(process.env.BOT_TOKEN);