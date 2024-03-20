# data-qa-report

data-qa attribute reporting tool.

The idea is to allow the team to quickly highlight elements with data-qa attributes and those without. Where in the code
the items code can be found and ultimately where on your website or app the element can be found.

The output will be written to disk or if no input passed it will log to the console.

The report format is `IFinalReport` found in, [types/index.ts](https://github.com/j-d-carmichael/data-qa-report/blob/main/src/types/index.ts), but see further below for an example JSON output.

## What the script does:
- Reads all html files in a target folder
- For each file it will find all the `data-qa` attributes on the elements that match the given CSS Selectors
- Bundle the output into a single JSON file to read

## Todo list for this tool:
See: https://github.com/j-d-carmichael/data-qa-report/issues

## The example
In the project on github you will see in the package json a script that runs the tool that would be run when you install from npm like:
`data-qa-report --input ./test/code-to-report-on --output ./test/report-output --css-selector 'APP-LT-BUTTON'`

It will:
- Read all the html files within: `test/code-to-report-on` 
- Output the JSON report to the folder: `./test/report-output`
- It will report on elements: `APP-LT-BUTTON`

The output from the test file results in:
```json
{
  "filesReport": [
    {
      "ext": "html",
      "absolutePath": "/mnt/linuxdrive/code/opensource/data-qa-report/test/code-to-report-on/login.page.html",
      "relativePath": "/test/code-to-report-on/login.page.html",
      "resultsWithDataQa": [
        {
          "dataQaValue": "login-form-submit",
          "nodeName": "APP-LT-BUTTON",
          "xpath": "ION-CONTENT > ION-GRID > ION-ROW > ION-COL > FORM > APP-LT-BUTTON.button-login"
        },
        {
          "dataQaValue": "forgot-password-cancel-button",
          "nodeName": "APP-LT-BUTTON",
          "xpath": "ION-CONTENT > ION-GRID > ION-ROW > ION-COL > FORM > DIV > APP-LT-BUTTON"
        },
        {
          "dataQaValue": "forgot-password-form-submit",
          "nodeName": "APP-LT-BUTTON",
          "xpath": "ION-CONTENT > ION-GRID > ION-ROW > ION-COL > FORM > DIV > APP-LT-BUTTON"
        }
      ],
      "resultsWithoutDataQa": [
        {
          "nodeName": "APP-LT-BUTTON",
          "xpath": "ION-CONTENT > ION-GRID > ION-ROW > ION-COL > NG-CONTAINER > APP-LT-BUTTON.email-login-button"
        }
      ]
    }
  ],
  "quantities": {
    "withDataQa": 3,
    "withoutDataQa": 1
  },
  "nodeNames": [
    "APP-LT-BUTTON"
  ]
}
```
