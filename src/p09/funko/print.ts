import chalk from "chalk";
import Funko from "./funko";

/**
 * printUserFunkoCollection prints a user's collection of funkos.
 * @param user Name of the owner of the collection.
 * @param funkos Funko collection to print.
 */
export function printUserFunkoCollection(user: string, funkos: Funko[]): void {
  let maxMarketValue = funkos.reduce((max, f) => max >= f.marketValue ? max : f.marketValue, 0)
  if (maxMarketValue === 0) {
    maxMarketValue = Infinity
  }

  green(`${user} Funko Pop Collection`)
  if (funkos.length < 1) {
    separator()
    green("<no funkos>")
    return
  }
  funkos.forEach(f => {
    separator()
    printFunko(f, maxMarketValue)
  })
}

/**
 * printFunko prints the funko provided, using the optional maxMarketValue provided to generate the marketValue color.
 * @param f Funko to print.
 * @param maxMarketValue Max market value of the collection to generate the price color.
 */
export function printFunko(f: Funko, maxMarketValue = Infinity): void {
  green(`ID:               ${f.id}`)
  green(`Name:             ${f.name}`)
  green(`Description:      ${f.description}`)
  green(`Type:             ${f.type}`)
  green(`Genre:            ${f.genre}`)
  green(`Franchise:        ${f.franchise}`)
  green(`Number:           ${f.franchiseNumber}`)
  green(`Exclusive:        ${f.exclusive ? "Yes" : "No"}`)
  green(`Special features: ${f.specialFeatures}`)
  green(`Market value:     ${marketValueStr(f.marketValue, maxMarketValue)} €`)
}

/**
 * marketValueStr returns a string containing the number provided in a spectrum of color that goes from red to green
 * in the range of 0 to maxMarketValue.
 * @param n Number to print.
 * @param maxMarketValue MaxMarketValue to generate the range of colors. Default is Infinity.
 * @returns The number provided represented as a string with colors.
 */
function marketValueStr(n: number, maxMarketValue: number): string {
  const colorOffset = Math.round((n*255)/maxMarketValue)
  return chalk.rgb(255 - colorOffset, colorOffset, 0)(n)
}

/**
 * green is a shorthand to print the string provided in color green.
 * @param str String to print in green.
 */
function green(str: string): void {
  console.log(chalk.green(str));
}

/**
 * separator is a shorthand for a green line in the terminal.
 */
function separator(): void {
  green("------------------------------------------------------")
}
