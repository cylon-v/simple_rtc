var users = [
  {id: 1, nick: 'vkalinkin', password: 'user', name: 'Vladimir Kalinkin'},
  {id: 2, nick: 'asaul', password: 'user', name: 'Adams Saul'},
  {id: 3, nick: 'alupe', password: 'user', name: 'Anderson Lupe'},
  {id: 4, nick: 'mhanna', password: 'user', name: 'Michael Hanna'},
  {id: 5, nick: 'aromanie', password: 'user', name: 'Anna Romanie'},
  {id: 6, nick: 'user', password: 'user', name: 'Test User'}
];

exports.getAll = function() {
  return users;
};

exports.find = function(id) {
  var user = null;
  for(var i in users) {
    if (users[i].id == id) {
      user = users[i];
    }
  }
  return user;
};

exports.findByName = function(name){
  var user = null;
  for(var i in users) {
    if (users[i].nick === name) {
      user = users[i];
    }
  }
  return user;
};