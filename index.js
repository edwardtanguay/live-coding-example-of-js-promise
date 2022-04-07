const getRand = (from, to) =>
    Math.floor(Math.random() * (to - from + 1)) + from;

const startElapsedTime = () => {
    return process.hrtime();
};

const getElapsedTime = (timer) => {
    const padLeft = (num, size) => {
        num = num.toString();
        while (num.length < size) num = '0' + num;
        return num;
    };
    const ms = parseInt(process.hrtime(timer)[1] / 1000000);
    const paddedMs = padLeft(ms, 3);
    return `${process.hrtime(timer)[0]}.${paddedMs} seconds`;
};

const getEmployees = async () => {
    return new Promise((resolve, reject) => {
        const ms = getRand(1000, 3000);
        const num = getRand(1, 2);
        setTimeout(() => {
            if (num !== 1) {
                resolve([
                    { name: 'Jack', age: 34 },
                    { name: 'Angie', age: 55 }
                ]);
            } else {
                reject(new Error('API could not process your request.'));
            }
        }, ms);
    });
};

const getEvents = async () =>
    new Promise((resolve, reject) => {
        const ms = getRand(1000, 3000);
        const num = getRand(1, 2);
		setTimeout(() => {
			if (num !== 1) {
				resolve([
					{
						date: "2022-05-12", eventName: "Svelte Conference"
					},
					{
						date: "2022-05-15", eventName: "NextJS Conference"
					}
				]);
			} else {
				reject(new Error('Conference data server is down.'));
			}
		}, ms);
    });

const apiDataServer = async () => {
    const timer = startElapsedTime();

    const obj = {
        employees: [],
		events: [],
        errors: [],
        info: {
            service: 'API Data Service',
            version: 'v6.34',
            elapsedTime: ''
        }
    };

    try {
        obj.employees = await getEmployees();
    } catch (e) {
        obj.employees = [];
        obj.errors.push({
            dataSource: 'employees',
            message: e.message
        });
    }

	try {
		obj.events = await getEvents();
	}
	catch (e) {
		obj.events = [];
		obj.errors.push({
			dataSource: 'events',
			message: e.message
		});
	}

    obj.info.elapsedTime = getElapsedTime(timer);

    return obj;
};

(async () => {
    const data = await apiDataServer();
    console.log(data);
})();
