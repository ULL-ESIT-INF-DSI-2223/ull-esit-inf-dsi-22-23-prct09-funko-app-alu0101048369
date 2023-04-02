import yargs from "yargs";
import Funko from "../funko/funko";
import Storage from "../funko/storage";
import { FunkoType } from "../funko/type";
import { defaultOptions, isNonEmptyString, isPositive, isPositiveInteger, ParsedOptions } from "./common";

export function builder(yargs: yargs.Argv<unknown>) {
  const opts = defaultOptions()
  opts.exclusive.default = false
  opts.id.default = ""
  opts.id.defaultDescription = "<random>"
  opts.number.default = 0
  opts.special.default = ""
  opts.type.default = FunkoType.POP
  opts.description.demandOption = true
  opts.franchise.demandOption = true
  opts.genre.demandOption = true
  opts.name.demandOption = true
  opts.value.demandOption = true

  yargs
    .usage("$0 add <option>")
    .options(opts)
    .check(argv => {
      isNonEmptyString(argv, "name")
      isNonEmptyString(argv, "description")
      isNonEmptyString(argv, "franchise")
      isPositiveInteger(argv, "number")
      isPositive(argv, "value")
      return true
    })
}

export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const input = argv as unknown as ParsedOptions

  const s = new Storage(input.path)
  s.add(input.user as string, new Funko(
    input.id,
    input.name,
    input.description,
    input.type,
    input.genre,
    input.franchise,
    input.number,
    input.exclusive,
    input.special,
    input.value
  ))
}
