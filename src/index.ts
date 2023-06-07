import { generateGamerData } from "./utils";

// test performance of generating 1000 data sets
console.time("generate gamer data");

// generate 1000 data sets
const gamerData = Array.from({ length: 1000 }, () => generateGamerData());

// convert to CSV
const csv = [
  "realname,address,birthdate,email,gamertag,join_date,last_login,hardware,game_stats",
  ...gamerData.map((gamer) => {
    return [
      gamer.realname,
      gamer.address,
      gamer.birthdate,
      gamer.email,
      gamer.gamertag,
      gamer.join_date,
      gamer.last_login,
      // Convert the hardware array to a JSON string
      JSON.stringify(gamer.hardware),
      // Convert the game_stats array to a JSON string
      JSON.stringify(
        gamer.game_stats.map((game) => {
          return {
            game: game.game,
            consumption: game.consumption,
            in_game_level: game.in_game_level,
            playtime: game.playtime,
            wins: game.wins,
            losses: game.losses,
          };
        })
      ),
    ].join(",");
  }),
].join("\n");

// write to file
Bun.write("gamer-data.csv", csv);

console.timeEnd("generate gamer data");
