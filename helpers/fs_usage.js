import { spawn } from 'child_process';

const command = 'echo ** | sudo fs_usage | grep /Users/austin/Desktop/red'

const child = spawn(command, [], { shell: true });

child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
});

child.stdout.on('data', (data) => {
    console.log(data.toString());
});