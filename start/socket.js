'use strict'
const server = use('Server')
const io = use('socket.io')(server.getInstance())
io.on('connection', function (socket) {
  // console.log('a user connected');
  socket.on('disconnect', function () {
    //console.log('user disconnected');
  });
})
