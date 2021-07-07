import fs from 'fs';
import { writeToFileStream } from './file.js';
import { logMap } from '../logs/log_map.js'
import csv from 'csv-parser';
import { getTime } from './date.js';

const getRowFromCsv = (att, val, file = logMap['process']) => {
    let row = {}
    let results = [];
    fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results)
            row = results.filter(c => c[att] == val)
        });

    return row;
}

export const getProcessFromTime = async (date, varience = 10000, file = logMap['process']) => {
    return await new Promise((resolve) => {
        let results = [];
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (data) => {
                const procTime = getTime(data['Timestamp'])
                const inputTime = getTime(date)

                //find processes from the logs are within now and the varience
                if (inputTime > procTime - 1 && inputTime < procTime + varience) {
                    results.push(data)
                }
            })
            .on('end', () => {
                resolve(results)
            })
    })
}

export const writeHeaders = (type) => {
    const fileHeaders = 'Timestamp,Path,Activity,Username,Process Name,Process Command Line,Process ID\n';
    const ProcessHeaders = 'Timestamp,Username,Process Name,Process Command Line,Process ID\n';
    const connectionHeaders = 'Timestamp,Username,Destination address and port,Source address and port,Amount of data sent,Protocol of data sent,Process name,Process command line,Process ID\n';
    const mapHeaders = {
        files: {
            file: logMap['file'],
            headers: fileHeaders
        },
        processes: {
            file: logMap['process'],
            headers: ProcessHeaders
        },
        connection: {
            file: logMap['connection'],
            headers: connectionHeaders
        }
    }

    writeToFileStream(mapHeaders[type].file, mapHeaders[type].headers)
};
