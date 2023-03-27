import { expect } from "chai"
import ProdMapReduce from "../../src/pe102/prod_map_reduce"

describe("ProdMapReduce", () => {
  it("Test map()", () => {
    const amr = new ProdMapReduce()
    expect(amr.map([-2,-1,0,1,2,3])).to.deep.equal([-4,-2,0,2,4,6])
  })
  it("Test reduce()", () => {
    const amr = new ProdMapReduce()
    expect(amr.reduce([-2,-1,1,2,3,4,5,6], 1)).to.equal(1440)
  })
})
