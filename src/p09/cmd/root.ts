import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as add from "./add"

export default function cmd(argv: string[]) {
  yargs(hideBin(argv))
    .scriptName("FunkoApp")
    .strict()
    .demandCommand()
    .usage("$0 [command] <options>")
    .command("add", "Adds a new Funko to the user list", add.builder, add.handler)
    .alias("h", "help")
    .version(false)
    .parse()
}
