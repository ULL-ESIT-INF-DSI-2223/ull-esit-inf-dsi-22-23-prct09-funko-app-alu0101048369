import fs from "node:fs"
import path from "node:path"
import { expect } from "chai"
import Storage from "../../../src/p09/funko/storage"
import { unlock } from "../../../src/p09/utils/lockfile"
import Funko from "../../../src/p09/funko/funko"
import { FunkoType } from "../../../src/p09/funko/type"
import { FunkoGenre } from "../../../src/p09/funko/genre"

describe("Storage", () => {
  it("Test constructor", () => {
    // Test create DB dir
    expect(() => new Storage("funkos")).not.to.throw()
    unlock()

    // Test existing DB dir
    expect(() => new Storage("funkos")).not.to.throw()
    unlock()

    // Test locked DB dir
    fs.closeSync(fs.openSync(path.join("funkos", ".lock"), "wx"))
    expect(() => new Storage("funkos")).to.throw("directory is already locked: file funkos/.lock exists")
    fs.rmSync(path.join("funkos", ".lock"))
  })

  it("Test add", () => {
    const s = new Storage("funkos")

    // Add funkos
    expect(() => s.add("miguel", new Funko(
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
    ))).not.to.throw()
    expect(() => s.add("miguel", new Funko(
      "DITF_015",
      "Ichigo",
      "asdasdasdasdasd",
      FunkoType.VINYL_SODA,
      FunkoGenre.ANIME,
      "Darling in the FranXX",
      15,
      false,
      "",
      12.34
    ))).not.to.throw()
    expect(() => s.add("miguel", new Funko(
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
    ))).not.to.throw()

    // Error if already exist
    expect(() => s.add("miguel", new Funko(
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
    ))).to.throw("EEXIST: file already exists, open 'funkos/miguel/JOJO2_Joseph.json'")

    unlock()
  })

  it("Test update", () => {
    const s = new Storage("funkos")

    expect(() => s.update(
      "miguel",
      "DITF_015",
      new Map([["description", "One of the main characters in Darling in the FranXX"]]),
    )).not.to.throw()

    expect(() => s.update(
      "unknown",
      "DITF_015",
      new Map([["description", "One of the main characters in Darling in the FranXX"]]),
    )).to.throw("ENOENT: no such file or directory, open 'funkos/unknown/DITF_015.json'")

    unlock()
  })

  it("Test list", () => {
    const s = new Storage("funkos")

    // Test empty / nonexistent collection
    expect(s.list("nonexistent")).to.deep.equal([])

    // Add garbage file that must be skipped
    fs.closeSync(fs.openSync(path.join("funkos", "miguel", "skip_this_file.txt"), "wx"))

    // Test existing collection
    expect(s.list("miguel")).to.deep.equal([
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
        23.45
      )
    ])

    unlock()
  })

  it("Test remove", () => {
    const s = new Storage("funkos")
    expect(() => s.remove("miguel", "JOJO2_Joseph")).not.to.throw()
    expect(() => s.remove("miguel", "JOJO2_Joseph")).to.throw("ENOENT: no such file or directory, stat 'funkos/miguel/JOJO2_Joseph.json'")
    unlock()
  })

  it("Test read", () => {
    const s = new Storage("funkos")
    expect(() => s.read("miguel", "JOJO2_Joseph")).to.throw("ENOENT: no such file or directory, open 'funkos/miguel/JOJO2_Joseph.json'")
    expect(s.read("miguel", "DITF_015")).to.deep.equal(
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
      )
    )
    unlock()
  })

  after(() => {
    fs.rmSync("funkos", {recursive: true})
  })
})
