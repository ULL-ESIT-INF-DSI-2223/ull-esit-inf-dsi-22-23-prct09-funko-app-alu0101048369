import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as add from "./add"

export default function cmd(argv: string[]) {
  yargs(hideBin(argv))
    .scriptName("FunkoApp")
    .strict()
    .wrap(yargs.terminalWidth())
    .demandCommand()
    .usage("$0 [command] <options>")
    .command("add", "Adds a new Funko to the user list", add.builder, add.handler)
    .option("user", {
      alias: "u",
      demandOption: true,
      describe: "Owner of the funko",
      global: true,
      group: "Global options:",
      type: "string",
    })
    .alias("h", "help")
    .group("h", "Global options:")
    .version(false)
    .parse()
}
