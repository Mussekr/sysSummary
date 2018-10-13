import { getAllData, cpuTemperature } from 'systeminformation';
import getKuhlerData from './kuhlerData';
getAllData().then((data) => console.log(data)).catch((err) => console.error(err));

const kuhlerData = getKuhlerData();
console.log(kuhlerData);
// cpuTemperature().then((data) => console.log(data)).catch((err) => console.error(err));
