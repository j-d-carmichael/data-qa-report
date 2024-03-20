# data-qa-report

Simple data-qa attribute reporting tool.

The report format is `IFinalReport` found in: [types/index.ts](./src/types/index.ts)

The idea is to allow the team to quickly highlist elements with the data-qa attributes and where in the code they live.

It also allows for the team to easily find elements without.

The output will be written to disk or if no input passed it will log to the console.

## Example

1. Clone the repo
2. Install dependencies
3. Run the script "run:example" from the package.json file

The example output will create a report on the files in folder, the test output will look like:
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
