'use strict';

module.exports.authorize = function(socket) {
  socket.emit('user.authorize');
  socket.on('user.authorize.response', function(user){
    socket.join(user); // Join user to its own room for to call it individually.
  });
};