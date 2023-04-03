import yargs from "yargs";
import { printUserFunkoCollection } from "../funko/print";
import Storage from "../funko/storage";
import { ParsedOptions } from "./common";

/**
 * builder is the builder function for the list command
 * @param yargs Yargs Arguments
 */
export function builder(yargs: yargs.Argv<unknown>) {
  yargs.usage("$0 list --user <username>")
}

/**
 * handler is the handler executed after a valid list command
 * @param argv Parsed Yargs arguments
 */
export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const input = argv as unknown as ParsedOptions

  const s = new Storage(input.path)
  printUserFunkoCollection(input.user, s.list(input.user))
}
