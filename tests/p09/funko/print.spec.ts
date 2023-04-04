import { expect } from "chai"
import { printFunko, printUserFunkoCollection } from "../../../src/p09/funko/print"
import Funko from "../../../src/p09/funko/funko"
import { FunkoType } from "../../../src/p09/funko/type"
import { FunkoGenre } from "../../../src/p09/funko/genre"
import chalk from "chalk"

chalk.level = 3

describe("FunkoPrinter", () => {
  it("Test printFunko with no maxMarketValue", () => {
    const defaultLogger = console.log
    let out = ""
    console.log = (str: string) => out += str + "\n"

    printFunko(new Funko(
      "LIS_Max",
      "Max Caulfield",
      "Protagonist of Life is Strange",
      FunkoType.POP_RIDES,
      FunkoGenre.VIDEOGAMES,
      "Life is Strange",
      1,
      true,
      "Tornado stand",
      49.38
    ))

    console.log = defaultLogger

    expect(out).to.equal(`\u001b[32mID:               LIS_Max\u001b[39m
\u001b[32mName:             Max Caulfield\u001b[39m
\u001b[32mDescription:      Protagonist of Life is Strange\u001b[39m
\u001b[32mType:             Pop! Rides\u001b[39m
\u001b[32mGenre:            Videogames\u001b[39m
\u001b[32mFranchise:        Life is Strange\u001b[39m
\u001b[32mNumber:           1\u001b[39m
\u001b[32mExclusive:        Yes\u001b[39m
\u001b[32mSpecial features: Tornado stand\u001b[39m
\u001b[32mMarket value:     \u001b[38;2;255;0;0m49.38\u001b[39m\u001b[32m €\u001b[39m
`)
  })

  it("Test printUserFunkoCollection with data", () => {
    const defaultLogger = console.log
    let out = ""
    console.log = (str: string) => out += str + "\n"

    printUserFunkoCollection("miguel", [
      new Funko(
        "DITF_015",
        "Ichigo",
        "One of the main characters in Darling in the FranXX",
        FunkoType.VINYL_SODA,
        FunkoGenre.ANIME,
        "Darling in the FranXX",
        15,
        false,
        "",
        12.34
      ),
      new Funko(
        "JOJO2_Joseph",
        "Joseph Joestar",
        "Protagonist of JoJo's Bizarre Adventure Part 2",
        FunkoType.VINYL_GOLD,
        FunkoGenre.ANIME,
        "JoJo's Bizarre Adventure: Battle Tendency",
        1,
        true,
        "Hand-crafted",
        98.76
      ),
      new Funko(
        "LIS_Max",
        "Max Caulfield",
        "Protagonist of Life is Strange",
        FunkoType.POP_RIDES,
        FunkoGenre.VIDEOGAMES,
        "Life is Strange",
        1,
        true,
        "Tornado stand",
        49.38
      )
    ])

    console.log = defaultLogger

    expect(out).to.equal(`\u001b[32mmiguel Funko Pop Collection\u001b[39m
\u001b[32m------------------------------------------------------\u001b[39m
\u001b[32mID:               DITF_015\u001b[39m
\u001b[32mName:             Ichigo\u001b[39m
\u001b[32mDescription:      One of the main characters in Darling in the FranXX\u001b[39m
\u001b[32mType:             Vinyl Soda\u001b[39m
\u001b[32mGenre:            Anime\u001b[39m
\u001b[32mFranchise:        Darling in the FranXX\u001b[39m
\u001b[32mNumber:           15\u001b[39m
\u001b[32mExclusive:        No\u001b[39m
\u001b[32mSpecial features: \u001b[39m
\u001b[32mMarket value:     \u001b[38;2;223;32;0m12.34\u001b[39m\u001b[32m €\u001b[39m
\u001b[32m------------------------------------------------------\u001b[39m
\u001b[32mID:               JOJO2_Joseph\u001b[39m
\u001b[32mName:             Joseph Joestar\u001b[39m
\u001b[32mDescription:      Protagonist of JoJo's Bizarre Adventure Part 2\u001b[39m
\u001b[32mType:             Vinyl Gold\u001b[39m
\u001b[32mGenre:            Anime\u001b[39m
\u001b[32mFranchise:        JoJo's Bizarre Adventure: Battle Tendency\u001b[39m
\u001b[32mNumber:           1\u001b[39m
\u001b[32mExclusive:        Yes\u001b[39m
\u001b[32mSpecial features: Hand-crafted\u001b[39m
\u001b[32mMarket value:     \u001b[38;2;0;255;0m98.76\u001b[39m\u001b[32m €\u001b[39m
\u001b[32m------------------------------------------------------\u001b[39m
\u001b[32mID:               LIS_Max\u001b[39m
\u001b[32mName:             Max Caulfield\u001b[39m
\u001b[32mDescription:      Protagonist of Life is Strange\u001b[39m
\u001b[32mType:             Pop! Rides\u001b[39m
\u001b[32mGenre:            Videogames\u001b[39m
\u001b[32mFranchise:        Life is Strange\u001b[39m
\u001b[32mNumber:           1\u001b[39m
\u001b[32mExclusive:        Yes\u001b[39m
\u001b[32mSpecial features: Tornado stand\u001b[39m
\u001b[32mMarket value:     \u001b[38;2;127;128;0m49.38\u001b[39m\u001b[32m €\u001b[39m
`)
  })

  it("Test printUserFunkoCollection with no data", () => {
    const defaultLogger = console.log
    let out = ""
    console.log = (str: string) => out += str + "\n"

    printUserFunkoCollection("miguel", [])

    console.log = defaultLogger

    expect(out).to.equal(`\u001b[32mmiguel Funko Pop Collection\u001b[39m
\u001b[32m------------------------------------------------------\u001b[39m
\u001b[32m<no funkos>\u001b[39m
`)
  })
})
