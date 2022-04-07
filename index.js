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

const apiDataServer = () => {
    return getRand(4, 6);
};

console.log(apiDataServer());
