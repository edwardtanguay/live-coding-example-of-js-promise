const getRand = (from, to) => Math.floor(Math.random() * ((to - from) + 1)) + from;


const apiDataServer = () => {
	return getRand(4, 6);
};

console.log(apiDataServer());