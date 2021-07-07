# Activity Detection
Activity Detection is a node project to track certain events that are happening on a device. 
including:
 - File Changes (add, delete, modify)
 - Processes that are started
 - Connections to the current device

Once one of these listeners are tiggered it sends the relevant information to the respective log. The logs are in
CSV format. 

### Listeners

Each event tracker for specific activity had its own listener that get kicked off from `main.js`.

#### Connection Listener

In order to listen to network connections on the device we need to use a packet sniffer called [pcap](https://www.npmjs.com/package/pcap). Once a session is started from `pcap.createSession` we listen for any packets that are coming from or to the default device. Once the packet is detected we send that information to the `tcp_tracker` which then we can get the session information from. From there we look for any processes that are created within the most relevent time frame of the session that was started from the `logs/process_log.csv`. Then we log a row to the connection information to `logs/connection_log.csv`.

#### Process Listener

To track the process that are running on the device we are going to use a npm package [os](https://www.npmjs.com/package/os). Using the os package we can do a scan and get all running processes on the device in a snapshot. In order to keep tracking we are going to use an interval to get running processes every 300ms. If there are running processes we are going to loop through and send the process information to `logs/process_log.csv`

## Installation 

Make sure you are using a node version > 11

Install the packages with `npm install`

## Starting up the app

`node main.js`

## License
[MIT](https://choosealicense.com/licenses/mit/)