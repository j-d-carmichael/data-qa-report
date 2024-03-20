# data-qa-report

data-qa attribute reporting tool.

The idea is to allow the team to quickly highlight elements with data-qa attributes and those without. Where in the code
the items code can be found and ultimately where on your website or app the element can be found.

The output will be written to disk or if no input passed it will log to the console.

The report format is `IFinalReport` found in, [types/index.ts](https://github.com/j-d-carmichael/data-qa-report/blob/main/src/types/index.ts), but see further below for an example JSON output.

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
