import chalk from "chalk";
import Funko from "./funko";

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

export function printFunko(f: Funko, maxMarketValue?: number): void {
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

function marketValueStr(n: number, maxMarketValue = Infinity): string {
  const colorOffset = Math.round((n*255)/maxMarketValue)
  return chalk.rgb(255 - colorOffset, colorOffset, 0)(n)
}

function green(str: string): void {
  console.log(chalk.green(str));
}

function separator(): void {
  green("------------------------------------------------------")
}
