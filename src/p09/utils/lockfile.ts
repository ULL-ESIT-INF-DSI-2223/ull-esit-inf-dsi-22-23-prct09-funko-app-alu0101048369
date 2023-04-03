import fs from "node:fs";
import path from "node:path";

let currentLock: string | undefined = undefined

export function lock(pathToDirLock: string) {
  if (currentLock !== undefined) {
    throw new Error("trying to use more than one lock on the same program");
  }
  currentLock = path.join(pathToDirLock, ".lock")
  fs.closeSync(fs.openSync(currentLock, "wx"))
}

export function unlock() {
  if (currentLock === undefined) {
    return
  }
  fs.rmSync(currentLock)
  currentLock = undefined
}
