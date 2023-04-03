import fs from "node:fs";
import path from "node:path";
import { isSystemError } from "../utils/errors";
import { lock } from "../utils/lockfile";
import Funko from "./funko";

export default class Storage {
  constructor(private dirPath: string) {
    lock(dirPath)
  }

  add(user: string, f: Funko): void {
    fs.writeFileSync(
      path.join(this.createUserDir(user), `${f.id}.json`),
      JSON.stringify(f),
      {flag: "wx"})
  }

  list(user: string): Funko[] {
    const userDir = path.join(this.dirPath, user)
    
    let filenames: string[]
    try {
      filenames = fs.readdirSync(userDir)
    } catch (e) {
      if (isSystemError(e) && e.syscall === "scandir" && e.code === "ENOENT") {
        return []
      }
      throw e
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

  read(user: string, id: string): Funko {
    return Funko.parse(id, JSON.parse(fs.readFileSync(path.join(this.dirPath, user, `${id}.json`), "utf-8")))
  }

  remove(user: string, id: string): void {
    fs.rmSync(path.join(this.dirPath, user, `${id}.json`))
  }

  update(user: string, id: string, fields: Map<string, unknown>): void {
    const fPath = path.join(this.dirPath, user, `${id}.json`)
    const rawData = JSON.parse(fs.readFileSync(fPath, "utf-8"))
    Array.from(fields.entries()).forEach(field => rawData[field[0]] = field[1])
    fs.writeFileSync(fPath, JSON.stringify(rawData))
  }

  private createUserDir(user: string): string {
    if (user === "") {
      throw new Error("user cannot be empty string");
    }
    const userDir = path.join(this.dirPath, user)
    fs.mkdirSync(userDir, {recursive: true})
    return userDir
  }
}
