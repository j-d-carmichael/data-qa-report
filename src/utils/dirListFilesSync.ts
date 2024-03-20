import fs from 'fs-extra';
import path from 'path';

export interface dirListObj {
  absolutePath: string,
  relativePath: string,
  ext: string
}

export const dirListFilesSync = (opt: { loadFrom: string, dir: string, exts: string[] }): dirListObj[] => {
  const { exts, loadFrom, dir } = opt;

  const absoluteDir = path.join(loadFrom, dir);

  const filesInDirectory = fs.readdirSync(absoluteDir);

  let files: dirListObj[] = [];

  for (const file of filesInDirectory) {
    const absoluteFile = path.join(absoluteDir, file);
    const fileStat = fs.statSync(absoluteFile);
    if (fileStat.isDirectory()) {
      files = [
        ...files,
        ...dirListFilesSync({
          dir: dir + '/' + file,
          loadFrom: loadFrom,
          exts: exts
        })
      ];
    } else {
      const fileExt = path.extname(absoluteFile).substring(1);
      if (exts.includes(fileExt)) {
        files.push({
          ext: fileExt,
          absolutePath: absoluteFile,
          relativePath: absoluteFile.replace(loadFrom, '')
        });
      }
    }
  }

  return files;
};
