import { dirListFilesSync } from '@/utils/dirListFilesSync';
import DataQaExtractor from '@/DataQaExtractor';
import fs from 'fs-extra';
import path from 'path';
import yyyymmdd from '@/utils/yyyymmdd';
import { IFileObjDataQa, IFinalReport } from '@/types';

export default (input: {
  targetDirectoryToReportOn: string,
  outputReportDirectory?: string
}) => {
  // 1 - get all files and their respective paths
  const files = dirListFilesSync({
    exts: ['html'],
    dir: input.targetDirectoryToReportOn,
    loadFrom: process.cwd(),
  });

  // 2 - parse all files and extract their data-qa attributes along with the meta
  const filesObject: IFileObjDataQa[] = DataQaExtractor.parseFiles(files, `APP-LT-BUTTON`);

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
    const reportName = yyyymmdd() + '_data-qs-report.json';
    fs.writeFileSync(
      path.join(process.cwd(), input.outputReportDirectory, reportName),
      JSON.stringify(reportObject, null, 2),
    );
  }
}
