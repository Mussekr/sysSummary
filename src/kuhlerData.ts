import * as childProcess from 'child_process';

export default function getKuhlerData(): object {
    return getRawData()
    .then((data) => {
        const fanRPM = /Fan RPM : (\d.+$)/gm.exec(data);
        const pumpRPM = /Pump RPM : (\d.+$)/gm.exec(data);
        const liquidTemp = /Liquid Temp : (\d.+) deg\/C/gm.exec(data);
        return {
            fanRPM: fanRPM[1],
            pumpRPM: pumpRPM[1],
            liquidTemp: liquidTemp[1],
        };
    })
    .catch((err) => err);
}

function getRawData(): Promise<string> {
    return new Promise((resolve, reject) => {
        childProcess.exec('/var/local/kuhler_ctl -l', (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stdout);
        });
    });
}
