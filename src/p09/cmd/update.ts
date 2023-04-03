import yargs from "yargs";
import Storage from "../funko/storage";
import { defaultOptions, isNonEmptyString, isPositive, isPositiveInteger } from "./common";

export function builder(yargs: yargs.Argv<unknown>) {
  const opts = defaultOptions()
  opts.id.demandOption = true

  yargs
    .usage("$0 add <option>")
    .options(opts)
    .check(argv => {
      isNonEmptyString(argv, "id")
      if (argv.description) isNonEmptyString(argv, "description")
      if (argv.franchise) isNonEmptyString(argv, "franchise")
      if (argv.name) isNonEmptyString(argv, "name")
      if (argv.number !== undefined) isPositiveInteger(argv, "number")
      if (argv.value !== undefined) isPositive(argv, "value")
      return true
    })
}

export function handler(argv: yargs.ArgumentsCamelCase<unknown>) {
  const fieldsToChange = new Map<string, unknown>()
  if (argv.description)             fieldsToChange.set("description", argv.description)
  if (argv.exclusive !== undefined) fieldsToChange.set("exclusive", argv.exclusive)
  if (argv.franchise)               fieldsToChange.set("franchise", argv.franchise)
  if (argv.genre)                   fieldsToChange.set("genre", argv.genre)
  if (argv.name)                    fieldsToChange.set("name", argv.name)
  if (argv.number !== undefined)    fieldsToChange.set("franchiseNumber", argv.number)
  if (argv.special !== undefined)   fieldsToChange.set("specialFeatures", argv.special)
  if (argv.type)                    fieldsToChange.set("type", argv.type)
  if (argv.value !== undefined)     fieldsToChange.set("marketValue", argv.value)

  const s = new Storage((argv.path as string))
  s.update((argv.user as string), (argv.id as string), fieldsToChange)
}
