import path from "node:path"
import { expect } from "chai"
import { lock, unlock } from "../../../src/p09/utils/lockfile"

describe("LockFile", () => {
  it("Test releasing nonexistent error", () => {
    expect(() => unlock()).not.to.throw()
  })

  it("Test trying to use multiple locks", () => {
    expect(() => lock(".")).not.to.throw()
    expect(() => lock(".")).to.throw("trying to use more than one lock on the same program")
    expect(() => unlock()).not.to.throw()
  })

  it("Test unexpected error", () => {
    expect(() => lock("nonexistent")).to.throw("ENOENT: no such file or directory, open 'nonexistent/.lock'")
  })
})
