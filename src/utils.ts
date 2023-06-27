import { faker } from "@faker-js/faker";

type GamerData = {
  firstname: string;
  lastname: string;
  address: string;
  PLZ: string;
  city: string;
  birthdate: string;
  email: string;
  gamertag: string;
  join_date: string;
  hardware: string;
  game: string;
  playtime: string;
  wins: string;
  losses: string;
  ingamelevel: string;
};

const possibleHardware = [
  "PC",
  "Playstation 4",
  "Playstation 5",
  "Xbox One",
  "Xbox Series X",
  "Nintendo Switch",
];

const possibleGames = [
  "Call of Duty: Warzone",
  "League of Legends",
  "Valorant",
  "Overwatch",
  "Counter Strike: Global Offensive",
  "Fortnite",
  "Apex Legends",
  "Rocket League",
  "Minecraft",
  "Grand Theft Auto V",
  "World of Warcraft",
  "Dota 2",
  "Hearthstone",
  "Rainbow Six Siege",
  "PlayerUnknown's Battlegrounds",
  "FIFA 20",
  "NBA 2K20",
  "Madden NFL 20",
  "Destiny 2",
  "Teamfight Tactics",
  "Diablo III",
  "Starcraft II",
  "Heroes of the Storm",
  "Path of Exile",
  "Smite",
  "World of Tanks",
  "World of Warships",
];

export const generateGamerData = (): GamerData => {
  const gamerData: GamerData = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    address:
      faker.location.street() +
      " " +
      faker.number.int({ min: 1, max: 100 }).toString(),
    PLZ: faker.number.int({ min: 1000, max: 9999 }).toString(),
    city: faker.location.city(),
    // birthdate as yyyy-mm-dd
    birthdate: faker.date
      .past({ years: 60, refDate: "2008-01-01T00:00:00.000Z" })
      .toISOString()
      .substring(0, 10),
    email: faker.internet.email().toLocaleLowerCase("de-DE"),
    gamertag: faker.internet.userName(),
    // join_date as yyyy-mm-dd
    join_date: faker.date.past({ years: 10 }).toISOString().substring(0, 10),
    hardware: faker.helpers.arrayElement(possibleHardware),
    game: faker.helpers.arrayElement(possibleGames),
    playtime: faker.number.int({ min: 100, max: 1000 }).toString(),
    wins: faker.number.int({ min: 0, max: 1000 }).toString(),
    losses: faker.number.int({ min: 0, max: 1000 }).toString(),
    ingamelevel: faker.number.int({ min: 1, max: 100 }).toString(),
  };

  return gamerData;
};

export const gamerDataToCSV = (gamerData: GamerData[]): string => {
  const header = Object.keys(gamerData[0]).join(";");

  const rows = gamerData.map((data) => {
    return Object.values(data).join(";");
  });

  return `${header}\n${rows.join("\n")}`;
};
