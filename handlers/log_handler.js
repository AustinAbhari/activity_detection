import { checkFile, appendFile } from '../helpers/file.js'
const defaultFile = '../logs/file_log.csv'

export const logHandler = (file, data) => {
    const readyToWrite = checkFile(file);
    readyToWrite ? appendFile(file, `${data}\n`) : console.error('An issue occured with the provided file')
}