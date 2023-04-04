import fs from "node:fs";
import path from "node:path";
import { isSystemError } from "./errors";

let currentLock: string | undefined = undefined

/**
 * lock creates a lockfile in the directory provided if it doesn't exist, and a lock is not active in this program.
 * @param pathToDirLock Directory to contain the lockfile.
 */
export function lock(pathToDirLock: string): void {
  if (currentLock !== undefined) {
    throw new Error("trying to use more than one lock on the same program")
  }

  const lockPath = path.join(pathToDirLock, ".lock")
  try {
    fs.closeSync(fs.openSync(lockPath, "wx"))
  } catch (e: unknown) {
    if (isSystemError(e) && e.syscall === "open" && e.code === "EEXIST") {
      throw new Error(`directory is already locked: file ${e.path} exists`);
    }
    throw e
  }
  currentLock = lockPath
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
