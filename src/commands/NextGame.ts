import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import Command from './Command';
import { getNextGames } from '../api/FutebolApi';
import { parseISO, format, subHours } from 'date-fns';

const run = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const events = await getNextGames();
  const event = events[0];

  const parsedDate = parseISO(event.date);
  const brazilianDate = subHours(parsedDate, 3);


  console.log(brazilianDate);
  console.log(format(brazilianDate, 'dd/MM/yyyy HH:mm'));
  console.log(brazilianDate.getUTCHours());

  let message = 'Próximo jogo: ' + event.competitors[0].displayName + ' vs ' + event.competitors[1].displayName;
  message += '\n'
  message += `Data: ${format(brazilianDate, 'dd/MM/yyyy')} às ${format(brazilianDate, 'HH:mm')}`;

  await interaction.editReply(message);
}

const NextGame: Command = {
  name: 'next-game',
  run
}

export default NextGame;

