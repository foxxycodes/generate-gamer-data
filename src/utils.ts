import { faker } from "@faker-js/faker";

type GamerData = {
  realname: string;
  address: string;
  birthdate: string;
  email: string;
  gamertag: string;
  join_date: string;
  last_login: string;
  hardware: string[];
  game_stats: GameStats[];
};

type GameStats = {
  game: string;
  consumption: Consumption;
  in_game_level: number;
  playtime: number;
  wins: number;
  losses: number;
};

type Consumption = "Low" | "Medium" | "High";

const possibleHardware = [
  [
    "Asus Rock Strix 1080ti",
    "Intel i7 8700k",
    "16GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "Asus Rock Strix 2080ti",
    "Intel i9 9900k",
    "32GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "Asus Rock Strix 3080ti",
    "Intel i9 10900k",
    "64GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "Nvidia 1080ti",
    "Intel i7 8700k",
    "16GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "Nvidia 2080ti",
    "Intel i9 9900k",
    "32GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "Nvidia 3080ti",
    "Intel i9 10900k",
    "64GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
  [
    "AMD 5700XT",
    "AMD Ryzen 7 3700x",
    "16GB DDR4 3200mhz",
    "1TB SSD",
    "2TB HDD",
  ],
];

const consumption = ["Low", "Medium", "High"] as Consumption[];
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
  const realname = faker.person.fullName();
  const address = faker.location.streetAddress();
  const birthdate = faker.date.past({ years: 50 });
  const email = faker.internet.email();
  const gamertag = faker.internet.userName();
  const join_date = faker.date.past({ years: 7 });
  const last_login = faker.date.past();
  const hardware = faker.helpers.arrayElement(possibleHardware);
  const game_stats = generateGameStats(faker.number.int({ min: 1, max: 10 }));

  return {
    realname,
    address,
    birthdate: birthdate.toISOString(),
    email,
    gamertag,
    join_date: join_date.toISOString(),
    last_login: last_login.toISOString(),
    hardware,
    game_stats,
  };
};

function generateGameStats(amountOfGames: number) {
  const gameStats: GameStats[] = [];
  for (let i = 0; i < amountOfGames; i++) {
    const game = faker.helpers.arrayElement(possibleGames);
    const gameConsumption = faker.helpers.arrayElement(consumption);
    const in_game_level = faker.number.int({ min: 1, max: 100 });
    // playtime is in hours
    const playtime = faker.number.int({ min: 0, max: 1000 });
    const wins = faker.number.int({ min: 0, max: 1000 });
    const losses = faker.number.int({ min: 0, max: 1000 });
    gameStats.push({
      game,
      consumption: gameConsumption,
      in_game_level,
      playtime,
      wins,
      losses,
    });
  }

  // filter out duplicates
  const uniqueGames = gameStats.filter(
    (game, index, self) => index === self.findIndex((t) => t.game === game.game)
  );

  return uniqueGames;
}
