import yargs from "yargs";
import Storage from "../funko/storage";
import { isNonEmptyString } from "./common";

export function builder(yargs: yargs.Argv<unknown>) {
  yargs
    .usage("$0 remove <option>")
    .options({
      id: {
        alias: "i",
        demandOption: true,
        describe: "ID of the funko",
        type: "string",
      },
    })
    .check(argv => {
      isNonEmptyString(argv, "id")
      return true
    })
}

export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const input = argv as unknown as {id: string, path: string, user: string}

  const s = new Storage(input.path)
  s.remove(input.user, input.id)
}
