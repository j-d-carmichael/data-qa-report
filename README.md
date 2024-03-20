# data-qa-report

Simple data-qa attribute reporting tool.

The report format is `IFinalReport` found in: [types/index.ts](./src/types/index.ts)

The idea is to allow the team to quickly highlist elements with the data-qa attributes and where in the code they live.

It also allows for the team to easily find elements without.

The output will be written to disk or if no input passed it will log to the console.
