import { expect } from "chai"
import MapReduce from "../../src/pe102/map_reduce"

describe("MapReduce", () => {
  it("Test default mapFn()", () => {
    class DefaultMapReduce extends MapReduce {
      reduce(): number {return 0}
    }

    const dmr = new DefaultMapReduce()
    expect(dmr.map([-3,-2,-1,0,1,2,3])).to.deep.equal([-3,-2,-1,0,1,2,3])
  })
})
