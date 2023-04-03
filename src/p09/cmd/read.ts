import yargs from "yargs";
import { printFunko } from "../funko/print";
import Storage from "../funko/storage";
import { isNonEmptyString } from "./common";

/**
 * builder is the builder function for the read command
 * @param yargs Yargs Arguments
 */
export function builder(yargs: yargs.Argv<unknown>) {
  yargs
    .usage("$0 read <options>")
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

/**
 * handler is the handler executed after a valid read command
 * @param argv Parsed Yargs arguments
 */
export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const input = argv as unknown as {id: string, path: string, user: string}

  const s = new Storage(input.path)
  printFunko(s.read(input.user, input.id))
}
