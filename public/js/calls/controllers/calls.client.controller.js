'use strict';

app.controller('CallsController', ['Socket', 'Auth'], function(Socket, Auth){
  Socket.on('user.authorize', function(){
    Auth.get().then(function(user){
      Socket.emit('user.authorize.response', {user: user.id});
    });
  });
});