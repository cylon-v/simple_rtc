'use strict';

module.exports.authorize = function(socket) {
  socket.emit('user.authorize');

  socket.on('user.authorize.response', function(user){
    socket.join(user.id); // Join user to its own room for to call it individually.
  });

  var room = function(message) {
    return 'call_' + message.from + '_' + message.to;
  };

  socket.on('call.ready', function(message){
    socket.broadcast.to(room(message)).emit('call.ready');
  });

  socket.on('call.connect', function(message){
     socket.join(room(message));
  });

  socket.on('call.message', function(message){
    console.log(message);
    socket.broadcast.to(room(message)).emit('call.message', message);
  });
};