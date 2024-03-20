import { dirListFilesSync } from '@/utils/dirListFilesSync';
import DataQaExtractor from '@/DataQaExtractor';
import fs from 'fs-extra';
import path from 'path';
import yyyymmddhhmmss from '@/utils/yyyymmddhhmmss';
import { IFileObjDataQa, IFinalReport } from '@/types';

export interface ReportInput {
  targetDirectoryToReportOn: string,
  outputReportDirectory?: string,
  cssSelector?: string,
}

export default (input: ReportInput) => {
  // 1 - get all files and their respective paths
  const files = dirListFilesSync({
    exts: ['html'],
    dir: input.targetDirectoryToReportOn,
    loadFrom: process.cwd(),
  });

  // 2 - parse all files and extract their data-qa attributes along with the meta
  const filesObject: IFileObjDataQa[] = DataQaExtractor.parseFiles(files, input.cssSelector);

  // 3 - Formulate the report object
  const reportObject: IFinalReport = {
    filesReport: filesObject,
    quantities: DataQaExtractor.extractQuantityReportFromFilesObject(filesObject),
    nodeNames: DataQaExtractor.extractAllNodeNamesFromParsedFilesObject(filesObject)
  };

  // 4 - output the report to the target
  if (!input.outputReportDirectory) {
    console.log(JSON.stringify(reportObject, null, 2));
  } else {
    const reportName = yyyymmddhhmmss() + '_data-qs-report.json';
    fs.writeFileSync(
      path.join(process.cwd(), input.outputReportDirectory, reportName),
      JSON.stringify(reportObject, null, 2),
    );
  }
}
