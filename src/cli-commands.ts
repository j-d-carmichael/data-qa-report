import { createCommand } from 'commander';

interface cliOpts {
  input: string,
  output?: string,
  cssSelector?: string
}

/**
 * This project has been alive for a while - please only add new commands
 * in kebab-case and ensure the command is added alphabetically following
 * the convention set below. Thanks.
 */
export default (args: any[]): cliOpts => {
  const commander = createCommand();
  commander.requiredOption('-i, --input [path]', 'The directory to report on eg ./src');
  commander.option('-o, --output [path]', 'The folder to output the report to, if empty it will only log to the terminal');
  commander.option('-s, --css-selector [string]', 'defaults to `input[type=button], button` if nothing is passed');

  commander.parse(args);
  return commander.opts() as unknown as cliOpts;
};
