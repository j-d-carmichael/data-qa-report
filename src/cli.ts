import cliCommands from '@/cli-commands';
import report from '@/report';

const parseCli = async () => {
  const commands = cliCommands(process.argv);

  console.log('Input commands:', commands);
  console.log('');

  report({
    targetDirectoryToReportOn: commands.input,
    outputReportDirectory: commands.output
  });
};

parseCli().catch(console.error);
