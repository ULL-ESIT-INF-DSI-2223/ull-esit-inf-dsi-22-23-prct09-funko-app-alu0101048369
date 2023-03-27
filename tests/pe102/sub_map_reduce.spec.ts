import { expect } from "chai"
import SubMapReduce from "../../src/pe102/sub_map_reduce"

describe("SubMapReduce", () => {
  it("Test map()", () => {
    const amr = new SubMapReduce()
    expect(amr.map([-2,-1,0,1,2,3])).to.deep.equal([-3,-2,-1,0,1,2])
  })
  it("Test reduce()", () => {
    const amr = new SubMapReduce()
    expect(amr.reduce([-3,-2,-1,0,1,2], 0)).to.equal(3)
  })
})
