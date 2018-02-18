const {getUser} = './google_auth';

module.exports = http => {
  const io = require('socket.io')(http);

  io.on('connection', client => {
    // here you can start emitting events to the client
    console.log('connection');
    client.on('chat', ({message, username}) => {
      console.log('chat', message);
      client.broadcast.emit('message', {message, username});
    });
  });

  return io;
  // io.listen(port);
};
