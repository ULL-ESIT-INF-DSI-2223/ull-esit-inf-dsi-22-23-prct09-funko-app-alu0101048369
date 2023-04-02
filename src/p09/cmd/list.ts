import yargs from "yargs";
import { printUserFunkoCollection } from "../funko/print";
import Storage from "../funko/storage";
import { ParsedOptions } from "./common";

export function builder(yargs: yargs.Argv<unknown>) {
  yargs.usage("$0 list --user <username>")
}

export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const input = argv as unknown as ParsedOptions

  const s = new Storage(input.path)
  printUserFunkoCollection(input.user, s.list(input.user))
}
