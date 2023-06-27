import { gamerDataToCSV, generateGamerData } from "./utils";

// test performance of generating 1000 data sets
console.time("generate gamer data");

// generate 1000 data sets
const gamerData = Array.from({ length: 1000 }, () => generateGamerData());

// delete gamerData where email or gamertag is not unique
const uniqueGamerData = gamerData.filter(
  (data, index, self) =>
    self.findIndex(
      (d) => d.email === data.email || d.gamertag === data.gamertag
    ) === index
);

// convert to CSV
const csv = gamerDataToCSV(uniqueGamerData);

// write to file
Bun.write("gamer-data.csv", csv);

console.timeEnd("generate gamer data");
