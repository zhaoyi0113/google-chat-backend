
module.exports = http => {
	const io = require('socket.io')(http);

  io.on('connection', client => {
    // here you can start emitting events to the client
    console.log('connection');
		client.on('chat', message => {
			console.log('chat', message);
			client.broadcast.emit('message', message);
		});
  });

	return io;
  // io.listen(port);
};
