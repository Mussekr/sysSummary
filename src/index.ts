import { getAllData, cpuTemperature } from 'systeminformation';
import { exec } from 'process-promises';

getAllData().then((data) => console.log(data)).catch((err) => console.error(err));

exec('/var/local/kuhler_ctl -l')
    .on('process', (process) => console.log('Pid: ', process.pid))
    .then((result) => {
        console.log('stdout: ', result.stdout);
        console.log('stderr: ', result.stderr);
    })
    .fail((err) => {
        console.error('ERROR: ', err);
    });

// cpuTemperature().then((data) => console.log(data)).catch((err) => console.error(err));
