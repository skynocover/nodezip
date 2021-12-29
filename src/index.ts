import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

let srcpath = './zip';
let trgpath = './trg';

fs.readdirSync(srcpath).forEach((file) => {
  console.log(file);
  if (file.endsWith('zip')) {
    let zip = new AdmZip(path.resolve(process.cwd(), srcpath, file));

    let zipEntries = zip.getEntries(); // an array of ZipEntry records

    let folderName = '';
    for (const zipEntry of zipEntries) {
      if (zipEntry.entryName.endsWith('/')) {
        folderName = zipEntry.entryName;
        break;
      }
    }

    zip.extractAllTo(trgpath, true);
    fs.rename(
      path.resolve(process.cwd(), trgpath, folderName),
      path.resolve(process.cwd(), trgpath, file.replace('.zip', '')),
      (err) => {
        if (err) console.log(err);
      },
    );
  }
});

const dezip = (filename: string, path: string) => {
  // reading archives
  let zip = new AdmZip(filename);
  //   let zipEntries = zip.getEntries(); // an array of ZipEntry records

  //   zipEntries.forEach(function (zipEntry) {
  //     console.log(zipEntry.toString()); // outputs zip entries information
  //     if (zipEntry.entryName == 'my_file.txt') {
  //       console.log(zipEntry.getData().toString('utf8'));
  //     }
  //   });
  //   // outputs the content of some_folder/my_file.txt
  //   console.log(zip.readAsText('some_folder/my_file.txt'));
  // extracts the specified file to the specified location
  zip.extractEntryTo(
    /*entry name*/ 'some_folder/my_file.txt',
    /*target path*/ '/home/me/tempfolder',
    /*maintainEntryPath*/ false,
    /*overwrite*/ true,
  );
  // extracts everything
  zip.extractAllTo(/*target path*/ '/home/me/zipcontent/', /*overwrite*/ true);
};
