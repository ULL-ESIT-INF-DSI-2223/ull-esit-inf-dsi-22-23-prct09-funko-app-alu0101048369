import { expect } from "chai"
import Funko from "../../../src/p09/funko/funko"
import { FunkoType } from "../../../src/p09/funko/type"
import { FunkoGenre } from "../../../src/p09/funko/genre"

describe("Funko", () => {
  it("Test constructor", () => {
    // Test valid constructor
    expect(() => new Funko(
      "LIS_Max",
      "Max Caulfield",
      "Protagonist of Life is Strange",
      FunkoType.POP_RIDES,
      FunkoGenre.VIDEOGAMES,
      "Life is Strange",
      1,
      true,
      "Tornado stand",
      23.45
    )).not.to.throw()

    // Test invalid constructor
    expect(() => new Funko(
      "LIS_Max",
      "Max Caulfield",
      "Protagonist of Life is Strange",
      FunkoType.POP_RIDES,
      FunkoGenre.VIDEOGAMES,
      "Life is Strange",
      1,
      true,
      "Tornado stand",
      -3
    )).to.throw("market value must be zero or a positive finite number")

    // Check random ID is used when empty
    expect(new Funko(
      "",
      "Max Caulfield",
      "Protagonist of Life is Strange",
      FunkoType.POP_RIDES,
      FunkoGenre.VIDEOGAMES,
      "Life is Strange",
      1,
      true,
      "Tornado stand",
      23.45
    ).id).not.to.equal("")
  })
})
