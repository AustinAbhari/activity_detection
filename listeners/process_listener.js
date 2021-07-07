import si from 'systeminformation';
import { logHandler } from '../handlers/log_handler.js';
import { logMap } from '../logs/log_map.js'

export const ProcessListener = () => {
    setInterval(async () => {
        const processes = await si.processes();
        const whatsRunning = processes.list.filter(c => c.state == 'running' && c.name != 'ps');
        for (let process of whatsRunning) {
            const { name, pid, command, user } = process;
            const now = new Date();
            const data = `${now},${user},${name},${command},${pid}`;

            logHandler(logMap['process'], data);
        }
    }, 300);
}