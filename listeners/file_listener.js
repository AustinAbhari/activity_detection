import chokidar from 'chokidar';
import fs from 'fs';
import { logHandler } from '../handlers/log_handler.js';
import path from 'path';
import { logMap } from '../logs/log_map.js'
import { getProcessFromTime } from '../helpers/csv.js'

export const FileListener = async () => {
    const listenerParams = {
        alwaysStat: true,
        ignored: '*.csv',
        interval: 100,
        ignoreInitial: true,
        // to change to directory use `cwd: '<directory>'`
    }

    // start up the file watcher
    const listening = chokidar.watch('.', listenerParams).on('all', (event, filePath) => {
        if (path.extname(filePath) == '.csv') return;
        fs.stat(filePath, async (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            const now = new Date()
            // find the process that did the file event
            const process = await getProcessFromTime(now)
            const data = `${now},${filePath},${event},${process[0]?.['Username'] || 'N/A'},${process[0]?.['Process Command Line'] || 'N/A'},${process[0]?.['Process ID'] || 'N/A'}`
            logHandler(logMap['file'], data)
        })
    });

    // make sure the to not watch the csvs so that we don't get an infinite loop when writing to the logs
    await listening.unwatch('node_modules/*', '*.csv');
}

FileListener()


