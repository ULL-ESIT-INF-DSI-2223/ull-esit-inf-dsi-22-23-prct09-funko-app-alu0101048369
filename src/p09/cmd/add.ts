import yargs from "yargs";
import { isNonEmptyString, isPositive, isPositiveInteger } from "./common";

export function builder(yargs: yargs.Argv<unknown>) {
  yargs
    .usage("$0 add <option>")
    .options({
      description: {
        alias: "d",
        demandOption: true,
        describe: "Description of the funko",
        type: "string",
      },
      exclusive: {
        alias: "e",
        default: false,
        describe: "The funko is exclusive",
        type: "boolean",
      },
      franchise: {
        alias: "f",
        demandOption: true,
        describe: "Franchise of the funko",
        type: "string",
      },
      genre: {
        alias: "g",
        choices: [
          "Animation",
          "Anime",
          "Film & TV",
          "Music",
          "Sports",
          "Videogames",
        ],
        demandOption: true,
        describe: "Type of the funko",
        type: "string",
      },
      id: {
        alias: "i",
        default: "",
        describe: "ID of the funko",
        type: "string",
      },
      name: {
        alias: "n",
        demandOption: true,
        describe: "Name of the funko",
        type: "string",
      },
      number: {
        default: 0,
        describe: "Number of the funko in the franchise",
        type: "number",
      },
      special: {
        alias: "s",
        default: "",
        describe: "Special features of the Funko",
        type: "string",
      },
      type: {
        alias: "t",
        choices: ["Pop!", "Pop! Rides", "Vinyl Soda", "Vinyl Gold"],
        demandOption: true,
        describe: "Type of the funko",
        type: "string",
      },
      value: {
        alias: "v",
        demandOption: true,
        describe: "Market value of the funko, in EUR",
        type: "number",
      },
    })
    .check(argv => {
      isNonEmptyString(argv, "name")
      isNonEmptyString(argv, "description")
      isNonEmptyString(argv, "franchise")
      isPositiveInteger(argv, "number")
      isPositive(argv, "value")
      return true
    })
}

export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  console.log(argv)
}
