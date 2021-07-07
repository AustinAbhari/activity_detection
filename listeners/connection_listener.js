import pcap from 'pcap';
import { logHandler } from '../handlers/log_handler.js';
import { logMap } from '../logs/log_map.js';
import { getProcessFromTime } from '../helpers/csv.js';

export const ConnectionListener = () => {
    const tcp_tracker = new pcap.TCPTracker();
    const pcap_session = new pcap.createSession('en0')

    tcp_tracker.on('session', async (session) => {
        const now = new Date();
        const process = await getProcessFromTime(now);
        const data = `${now}, ${process[0]?.['Username']}, ${session.dst_name}, ${session.src_name}, ${session.send_bytes_tcp}, tcp, ${process[0]?.['Process Command Line']}, ${process[0]?.['Process ID']}`;

        logHandler(logMap['connection'], data);
    });

    pcap_session.on('packet', function (raw_packet) {
        const packet = pcap.decode.packet(raw_packet);
        tcp_tracker.track_packet(packet);
    });
}

