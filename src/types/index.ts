import { dirListObj } from '@/utils/dirListFilesSync';

export interface IExtractQuantityReportFromFilesObject{
  withDataQa: number,
  withoutDataQa: number,
}

export interface IDataQaResult {
  xpath: string,
  dataQaValue: string;
  nodeName: string;
}

export interface IFileObjDataQa extends dirListObj {
  resultsWithDataQa: IDataQaResult[];
  resultsWithoutDataQa: IDataQaResult[];
}

export interface IFinalReport {
  filesReport: IFileObjDataQa[],
  quantities: IExtractQuantityReportFromFilesObject,
  nodeNames: string[]
}
