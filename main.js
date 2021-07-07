import { FileListener } from './listeners/file_listener.js'
import { ProcessListener } from './listeners/process_listener.js'
import { ConnectionListener } from './listeners/connection_listener.js';
import { writeHeaders } from './helpers/csv.js';
import { isFileEmpty } from './helpers/file.js';
import { logMap } from './logs/log_map.js'

const Main = () => {
    //File listener
    //Set up log csv if it hasn't already been
    isFileEmpty(logMap['file']) && writeHeaders('files')
    // Begin Watching files
    FileListener();

    //Process listener
    //Set up log csv if it hasn't already been
    isFileEmpty(logMap['process']) && writeHeaders('processes')
    // Begin watching procesess 
    ProcessListener();

    //Network listener
    //Set up log csv if it hasn't already been
    isFileEmpty(logMap['connection']) && writeHeaders('connection')
    // Begin watching connections
    ConnectionListener();
}

// Things to still do
// filter process only on start and end of them 2f

Main();