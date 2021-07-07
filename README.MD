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

In order to listen to network connections on the device we need to use a packet sniffer called `pcap`. Once a session is started from `pcap.createSession` we listen for any packets that are coming from or to the default device. Once the packet is detected we send that information to the `tcp_tracker` which then we can get the session information from. From there we look for any processes that are created within the most relevent time frame of the session that was started from the `logs/process_log`. Then we log a row to the connection information to `logs/connection_log`.



## Installation 

Make sure you are using a node version > 11

Install the packages with `npm install`

## Starting up the app

`node main.js`

## License
[MIT](https://choosealicense.com/licenses/mit/)