import 'dotenv/config';
import axios from 'axios';
import { parse } from 'node-html-parser';

const url = 'https://www.espn.com.br/futebol/time/calendario/_/id/819/flamengo';

export interface Competitor {
  id: string;
  abbrev: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  recordSummary: string;
  standingSummary: string;
  location: string;
  links: string;
  isHome: boolean;
}

export interface Team {
  id: string;
  abbrev: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  recordSummary: string;
  standingSummary: string;
  location: string;
  links: string;
  isHome: boolean;
}

export interface Status {
  state: string;
  detail: string;
  link: string;
}

export interface Address {
  city: string;
  country: string;
}

export interface Venue {
  fullName: string;
  address: Address;
}

export interface Leg {
  value: number;
  displayValue: string;
}

export interface FootballEvent {
  id: string;
  competitors: Competitor[];
  date: string;
  tbd: boolean;
  completed: boolean;
  broadcasts?: any;
  link: string;
  teams: Team[];
  isTie: boolean;
  tickets?: any;
  dateFormat: string;
  score: string;
  status: Status;
  league: string;
  venue: Venue;
  attnd: number;
  leg: Leg;
  notes: string;
}


export const getNextGames = async () => {
  const { data: response } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    },
  });

  const html = parse(response);

  const list = html.getElementsByTagName('script')

  const htmlElement = list.filter(element => element.rawText.includes("window['__espnfitt__']="))[0];

  const json = htmlElement.rawText.replace("window['__espnfitt__']=", '').slice(0, -1);
  const data = JSON.parse(json);

  return data.page.content.fixtures.events as FootballEvent[];
}