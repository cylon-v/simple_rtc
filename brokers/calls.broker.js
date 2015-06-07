'use strict';

module.exports.authorize = function(socket) {
  socket.emit('user.authorize');
  socket.on('user.authorize.response', function(user){
    console.log(user.id);
    socket.join(user.id); // Join user to its own room for to call it individually.
  });
};