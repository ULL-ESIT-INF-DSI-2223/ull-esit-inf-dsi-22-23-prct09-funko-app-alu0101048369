import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as add from "./add"
import * as list from "./list"

export default function cmd(argv: string[]) {
  yargs(hideBin(argv))
    .scriptName("FunkoApp")
    .strict()
    .wrap(yargs.terminalWidth())
    .demandCommand()
    .usage("$0 [command] <options>")
    .command("add", "Add a new funko to the user list", add.builder, add.handler)
    .command("list", "List all the funkos in a user list", list.builder, list.handler)
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
