/* eslint-disable @typescript-eslint/no-explicit-any */
import yargs from "yargs";
import { FunkoGenre } from "../funko/genre";
import { FunkoType } from "../funko/type";

/**
 * ParsedOptions represents an object that contains the default options parsed
 */
export interface ParsedOptions {
  description: string
  exclusive: boolean
  franchise: string
  genre: FunkoGenre
  id: string
  name: string
  number: number
  path: string
  special: string
  type: FunkoType
  user: string
  value: number
}

/**
 * isNonEmptyString checks if the string in the field in the args provided contains something.
 * @param argv Yargs arguments.
 * @param fieldName Name of the field to check.
 */
export function isNonEmptyString(argv: any, fieldName: string): void {
  if (argv[fieldName].trim() === "") {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

/**
 * isPositive checks if the number in the field in the args provided is positive or zero.
 * @param argv Yargs arguments.
 * @param fieldName Name of the field to check.
 */
export function isPositive(argv: any, fieldName: string) {
  if (!isFinite(argv[fieldName]) || argv[fieldName] < 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
}

/**
 * isPositive checks if the number in the field in the args provided is a positive integer or zero.
 * @param argv Yargs arguments.
 * @param fieldName Name of the field to check.
 */
export function isPositiveInteger(argv: any, fieldName: string) {
  isPositive(argv, fieldName)
  if (Math.trunc(argv[fieldName]) !== argv[fieldName]) {
    throw new Error(`${fieldName} must be an integer`);
  }
}

/**
 * defaultOptions returns the default list of Yargs options.
 * @returns The default list (for this program) of Yargs options.
 */
export function defaultOptions(): { [key: string]: yargs.Options } {
  return {
    description: {
      alias: "d",
      describe: "Description of the funko",
      type: "string",
    },
    exclusive: {
      alias: "e",
      describe: "The funko is exclusive",
      type: "boolean",
    },
    franchise: {
      alias: "f",
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
      describe: "Type of the funko",
      type: "string",
    },
    id: {
      alias: "i",
      describe: "ID of the funko",
      type: "string",
    },
    name: {
      alias: "n",
      describe: "Name of the funko",
      type: "string",
    },
    number: {
      describe: "Number of the funko in the franchise",
      type: "number",
    },
    special: {
      alias: "s",
      describe: "Special features of the Funko",
      type: "string",
    },
    type: {
      alias: "t",
      choices: ["Pop!", "Pop! Rides", "Vinyl Soda", "Vinyl Gold"],
      describe: "Type of the funko",
      type: "string",
    },
    value: {
      alias: "v",
      describe: "Market value of the funko, in EUR",
      type: "number",
    }
  }
}
