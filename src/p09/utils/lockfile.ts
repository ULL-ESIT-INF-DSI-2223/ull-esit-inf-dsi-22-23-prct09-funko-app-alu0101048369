import fs from "node:fs";
import path from "node:path";

let currentLock: string | undefined = undefined

/**
 * lock creates a lockfile in the directory provided if it doesn't exist, and a lock is not active in this program.
 * @param pathToDirLock Directory to contain the lockfile.
 */
export function lock(pathToDirLock: string): void {
  if (currentLock !== undefined) {
    throw new Error("trying to use more than one lock on the same program");
  }
  currentLock = path.join(pathToDirLock, ".lock")
  fs.closeSync(fs.openSync(currentLock, "wx"))
}

/**
 * unlock removes the lockfile of this program if it exist.
 */
export function unlock(): void {
  if (currentLock === undefined) {
    return
  }
  fs.rmSync(currentLock)
  currentLock = undefined
}
