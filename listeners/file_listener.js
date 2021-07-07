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
        cmd: '/Users'
    }

    const listening = chokidar.watch('.', listenerParams).on('all', (event, filePath) => {
        if (path.extname(filePath) == '.csv') return;
        fs.stat(filePath, async (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            const now = new Date()
            const process = await getProcessFromTime(now)
            const data = `${now},${filePath},${event},${process[0]?.['Username']},${process[0]?.['Process Command Line']},${process[0]?.['Process ID']}`
            logHandler(logMap['file'], data)
        })
    });

    await listening.unwatch('node_modules/*', '*.csv');
}

FileListener()


