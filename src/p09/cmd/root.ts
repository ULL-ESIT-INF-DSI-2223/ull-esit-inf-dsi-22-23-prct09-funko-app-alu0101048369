import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as add from "./add"
import * as list from "./list"
import * as read from "./read"
import * as remove from "./remove"
import * as update from "./update"

export default function cmd(argv: string[]) {
  yargs(hideBin(argv))
    .scriptName("FunkoApp")
    .strict()
    .wrap(yargs.terminalWidth())
    .demandCommand()
    .usage("$0 [command] <options>")
    .command("add", "Add a new funko to the user list", add.builder, add.handler)
    .command("list", "List all the funkos in a user list", list.builder, list.handler)
    .command("read", "Read all the properties of a funko", read.builder, read.handler)
    .command("remove", "Remove a funko from the database", remove.builder, remove.handler)
    .command("update", "Update the values in the fields provided for a funko", update.builder, update.handler)
    .options({
      h: {
        alias: "help",
        global: true,
        group: "Global options:",
      },
      path: {
        alias: "p",
        default: "funkos",
        describe: "Path to the funko's database",
        global: true,
        group: "Global options:",
        type: "string",
      },
      user: {
        alias: "u",
        demandOption: true,
        describe: "Owner of the funko",
        global: true,
        group: "Global options:",
        type: "string",
      }
    })
    .version(false)
    .parse()
}
