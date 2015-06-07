var users = [
  {id: 1, nick: 'vkalinkin', name: 'Vladimir Kalinkin'},
  {id: 2, nick: 'asaul', name: 'Adams Saul'},
  {id: 3, nick: 'alupe', name: 'Anderson Lupe'},
  {id: 4, nick: 'mhanna', name: 'Michael Hanna'},
  {id: 5, nick: 'aromanie', name: 'Anna Romanie'},
  {id: 6, nick: 'user', name: 'Test User'}
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