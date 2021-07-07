import fs, { access, constants } from 'fs';

export const writeToFileStream = (file, data) => {
    const writeStream = fs.createWriteStream(file);
    writeStream.write(data)
    writeStream.close;
}

export const appendFile = (file, data) => {
    fs.appendFile(file, data, (err) => { err && console.error(err) });
}

export const isFileEmpty = (file) => {
    let empty = true;
    try {
        const data = fs.readFileSync(file)
        empty = !!!data?.toString()?.length;
    } catch (err) {
        console.error(err)
    }

    return empty;
}

export const checkFile = (file) => {
    let fileExistsAndWitable = true;
    // Check if the file exists in the current directory.
    access(file, constants.F_OK, (err) => { fileExistsAndWitable = err; });
    // Check if the file is readable.
    access(file, constants.R_OK, (err) => { fileExistsAndWitable = err; });
    // Check if the file is writable.
    access(file, constants.W_OK, (err) => { fileExistsAndWitable = err });
    // Check if the file exists in the current directory, and if it is writable.
    access(file, constants.F_OK | fs.constants.W_OK, (err) => { fileExistsAndWitable = err; });

    return fileExistsAndWitable;
}