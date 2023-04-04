import fs from "node:fs";
import path from "node:path";
import { isSystemError } from "../utils/errors";
import { lock } from "../utils/lockfile";
import Funko from "./funko";

/**
 * Storage represents a storage of funkos.
 */
export default class Storage {
  /**
   * Creates a new Storage object in the directory provided, and it locks it to avoid other users to use it at the
   * same time. It creates the directory if it doesn't exist.
   * @param dirPath Directory to store the funkos.
   */
  constructor(private dirPath: string) {
    fs.mkdirSync(dirPath, {recursive: true})
    lock(dirPath)
  }

  /**
   * Adds a new Funko to the user collection.
   * @param user Owner of the funko.
   * @param f Funko to add to the storage.
   */
  add(user: string, f: Funko): void {
    const userDir = path.join(this.dirPath, user)
    fs.mkdirSync(userDir, {recursive: true})
    fs.writeFileSync(
      path.join(userDir, `${f.id}.json`),
      JSON.stringify(f),
      {flag: "wx"})
  }

  /**
   * Lists all the funkos from the user's collection.
   * @param user User to print their funkos.
   * @returns List of funkos owned by the user.
   */
  list(user: string): Funko[] {
    const userDir = path.join(this.dirPath, user)
    
    let filenames: string[];
    try {
      filenames = fs.readdirSync(userDir);
    } catch (e) {
      /* istanbul ignore else */
      if (isSystemError(e) && e.syscall === "scandir" && e.code === "ENOENT") {
        return [];
      } else {
        throw e;
      }
    }

    return filenames.reduce((acc, filename) => {
      if (!filename.endsWith(".json")) {
        return acc;
      }

      acc.push(
        Funko.parse(
          filename.slice(0, -5),
          JSON.parse(fs.readFileSync(path.join(userDir, filename), "utf-8"))
        )
      )
      return acc;
    }, new Array<Funko>())
  }

  /**
   * Reads the funko with the ID and owner provided.
   * @param user Owner of the funko.
   * @param id ID of the funko.
   * @returns The funko requested.
   */
  read(user: string, id: string): Funko {
    return Funko.parse(id, JSON.parse(fs.readFileSync(path.join(this.dirPath, user, `${id}.json`), "utf-8")))
  }

  /**
   * Removes the funko with the ID and owner provided.
   * @param user Owner of the funko.
   * @param id ID of the funko.
   */
  remove(user: string, id: string): void {
    fs.rmSync(path.join(this.dirPath, user, `${id}.json`))
  }

  /**
   * Updates the funko with the ID and owner provided, applying the fields provided.
   * @param user Owner of the funko.
   * @param id ID of the funko.
   * @param fields Key-value pair of the fields to modify in the funko.
   */
  update(user: string, id: string, fields: Map<string, unknown>): void {
    const fPath = path.join(this.dirPath, user, `${id}.json`)
    const rawData = JSON.parse(fs.readFileSync(fPath, "utf-8"))
    Array.from(fields.entries()).forEach(field => rawData[field[0]] = field[1])
    fs.writeFileSync(fPath, JSON.stringify(rawData))
  }
}
