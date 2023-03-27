import { expect } from "chai"
import DivMapReduce from "../../src/pe102/div_map_reduce"

describe("DivMapReduce", () => {
  it("Test map()", () => {
    const amr = new DivMapReduce()
    expect(amr.map([-2,0,1,2,4])).to.deep.equal([-1,0,0.5,1,2])
  })
  it("Test reduce()", () => {
    const amr = new DivMapReduce()
    expect(amr.reduce([1,2,4,8], 1)).to.equal(0.015625)
  })
})
