import { expect } from "chai"
import AddMapReduce from "../../src/pe102/add_map_reduce"

describe("AddMapReduce", () => {
  it("Test map()", () => {
    const amr = new AddMapReduce()
    expect(amr.map([-2,-1,0,1,2,3,4,5,6])).to.deep.equal([-1,0,1,2,3,4,5,6,7])
  })
  it("Test reduce()", () => {
    const amr = new AddMapReduce()
    expect(amr.reduce([-2,-2,-1,0,1,2,3], 0)).to.equal(1)
  })
})
