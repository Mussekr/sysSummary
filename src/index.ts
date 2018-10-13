import { getAllData, cpuTemperature } from 'systeminformation';

// getAllData().then((data) => console.log(data)).catch((err) => console.error(err));

cpuTemperature().then((data) => console.log(data)).catch((err) => console.error(err));
