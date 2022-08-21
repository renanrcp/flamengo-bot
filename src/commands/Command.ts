import { CacheType, ChatInputCommandInteraction } from "discord.js";

export default interface Command {
  name: string;
  run: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
}