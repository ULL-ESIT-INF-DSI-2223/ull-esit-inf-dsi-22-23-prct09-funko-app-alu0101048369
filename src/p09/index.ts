import chalk from "chalk";
import cmd from "./cmd/root";
import { isError } from "./utils/errors";
import { unlock } from "./utils/lockfile";
try {
  cmd(process.argv);
} catch (e) {
  if (isError(e)) {
    console.log(chalk.red(e.message))
  } else {
    console.error(e)
  }
}
unlock()
