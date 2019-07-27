socket = new WebSocket('ws://188.166.46.38/');
socket.binaryType = "arraybuffer";
socket.onopen = function() {
	let sendObj = {name: "try1", command: "challenge accepted"};
	socket.send(JSON.stringify(sendObj));
}

socket.onmessage = function(event) {
	let sendObj = {};
	if (typeof event.data === 'string') {
		let obj = JSON.parse(event.data);
		let nextTask = obj.next || obj.nextTask;
		let taskName = obj.name;
		socket.token = socket.token || obj.token;
		sendObj.token = socket.token;
		if (nextTask) {
			socket.send(JSON.stringify({'token': sendObj.token , 'command': nextTask}));
			
		}
		else if (taskName === 'arithmetic') {
			sendObj.command = taskName;
			sendObj.answer = obj.task.values.reduce((acc, item) => eval(`${acc}${obj.task.sign}${item}`));
			socket.send(JSON.stringify(sendObj));
		}
		else if (taskName === 'binary_arithmetic') {
			socket.bits = obj.task.bits;
		}
		else if (taskName === 'win') {
			i++;
			sendObj.token = socket.token;
			sendObj.command = 'win';
			socket.send(JSON.stringify(sendObj))
		}
		
	}
	console.log(event.data);
	console.log(sendObj);
	if (typeof event.data === 'object') {
			sendObj.token = socket.token;
			sendObj.command = 'binary_arithmetic';
			if (socket.bits == 8) { sendObj.answer = [].reduce.call(new Uint8Array(event.data), (sum,item) => sum + item, 0); } 
			if (socket.bits == 16) { sendObj.answer = [].reduce.call(new Uint16Array(event.data), (sum,item) => sum + item, 0); } 
			socket.send(JSON.stringify(sendObj))
	}
}