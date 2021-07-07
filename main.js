import { FileListener } from './listeners/file_listener.js'
import { ProcessListener } from './listeners/process_listener.js'
import { ConnectionListener } from './listeners/connection_listener.js';
import { writeHeaders } from './helpers/csv.js';
import { isFileEmpty } from './helpers/file.js';
import { logMap } from './logs/log_map.js'

const Main = () => {
    console.log("--- Starting Activity Tracker ---");

    //Process listener
    //Set up log csv if it hasn't already been
    isFileEmpty(logMap['process']) && writeHeaders('processes');
    // Begin watching procesess 
    console.log("* Spinning up process Listener *");
    ProcessListener();

    isFileEmpty(logMap['file']) && writeHeaders('files');
    //File listener
    //Set up log csv if it hasn't already been

    // Begin Watching files
    console.log("* Spinning up File Listener *");
    FileListener();

    //Network listener
    //Set up log csv if it hasn't already been
    isFileEmpty(logMap['connection']) && writeHeaders('connection');
    // Begin watching connections
    console.log("* Spinning up Connection Listener *");
    ConnectionListener();

    console.log(" == All listeners are running == ");
}

Main();