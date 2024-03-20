import { dirListObj } from '@/utils/dirListFilesSync';
import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import cheerioXPath from '@/utils/cheerioXPath';
import { IDataQaResult, IExtractQuantityReportFromFilesObject, IFileObjDataQa } from './types';

class DataQaExtractor {
  parseFiles (inputs: dirListObj[], cssSelector: string = 'input[type=button], button'): IFileObjDataQa[] {
    const resp: IFileObjDataQa[] = [];
    inputs.forEach((input) => resp.push(this.parseFile(input, cssSelector)));
    return resp;
  }

  parseFile (input: dirListObj, cssSelector: string): IFileObjDataQa {
    const htmlExtraction = this.htmlExtractor(
      input.absolutePath,
      cssSelector
    );
    return {
      ...input,
      ...htmlExtraction,
    };
  }

  extractQuantityReportFromFilesObject (reportObject: IFileObjDataQa[]): IExtractQuantityReportFromFilesObject {
    return {
      withDataQa: reportObject.reduce((acc, curr) => acc + curr.resultsWithDataQa.length, 0),
      withoutDataQa: reportObject.reduce((acc, curr) => acc + curr.resultsWithoutDataQa.length, 0),
    };
  }

  extractAllNodeNamesFromParsedFilesObject (reportObject: IFileObjDataQa[]): string[] {
    return [].concat(...reportObject.map((obj) => {
      return obj.resultsWithoutDataQa.map((item) => item.nodeName)
        .concat(obj.resultsWithDataQa.map((item) => item.nodeName));
    })).filter(function (v, i, self) {
      // It returns the index of the first instance of each value to filter with indexOd
      return i == self.indexOf(v);
    });
  }

  htmlExtractor (filePath: string, cssSelector: string): {
    resultsWithDataQa: IDataQaResult[];
    resultsWithoutDataQa: IDataQaResult[];
  } {
    const htmlString = fs.readFileSync(filePath);
    const $ = cheerio.load(htmlString);

    const resp: {
      resultsWithDataQa: IDataQaResult[],
      resultsWithoutDataQa: IDataQaResult[]
    } = {
      resultsWithDataQa: [],
      resultsWithoutDataQa: []
    };
    $(cssSelector).each(function () {
      const obj = {
        dataQaValue: $(this).attr('data-qa'),
        nodeName: $(this).prop('nodeName'),
        xpath: cheerioXPath($, this)
      };
      if (obj.dataQaValue) {
        resp.resultsWithDataQa.push(obj);
      } else {
        resp.resultsWithoutDataQa.push(obj);
      }
    });
    return resp;
  }
}

export default new DataQaExtractor();
