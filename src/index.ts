import { getAllData, cpuTemperature } from 'systeminformation';
import * as childProcess from 'child_process';
getAllData().then((data) => console.log(data)).catch((err) => console.error(err));
childProcess.exec('/var/local/kuhler_ctl -l', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});
// cpuTemperature().then((data) => console.log(data)).catch((err) => console.error(err));
