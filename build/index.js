'use strict';

var add = function add(a, b) {
  return a + b;
};

var curriedAdd = function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
};
var curriedMul = function curriedMul(a) {
  return function (b) {
    return a * b;
  };
};

var add5 = curriedAdd(5);

console.log(add5);

// console.log(add5(4))
// console.log(add5(50))

// (f: b -> c, g: a -> b) -> a -> c
var comp2 = function comp2(f, g) {
  return function (a) {
    return f(g(a));
  };
};

var add3Mul5 = comp2(curriedMul(5), curriedAdd(3));

// console.log(add3Mul5(7))

var message = function message(greeting) {
  return function (name) {
    return greeting + ' ' + name;
  };
};

var loginMessage = message('Hello');

var logoutMessage = message('Goodbye');

var changeServer = message('You changed servers');

console.log(loginMessage('bob'));

console.log(changeServer('susie'));

console.log(logoutMessage('bob'));

var weirdMessage = comp2(message('Hello,'), message('welcome to our new server which covers so much of the world'));

console.log(weirdMessage('Timmy'));

// id: a -> a
var id = function id(a) {
  return a;
};

// compose: (...func) -> compose functions
var compose = function compose() {
  for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }

  return fs.reduce(comp2, id);
};

var add5Add5Mul2 = compose(curriedMul(2), curriedAdd(5), curriedAdd(5));

console.log(add5Add5Mul2(10)); // 40

var users = [{
  username: 'Tim',
  role: 'admin',
  email: 'tim@test.com'
}, {
  username: 'Bob',
  role: 'user',
  email: 'bob@test.com'
}, {
  username: 'Jerry',
  role: 'smuck',
  email: 'jerry@test.com'
}, {
  username: 'Morty',
  role: 'admin',
  email: 'morty@test.com'
}];

var prop = function prop(p) {
  return function (obj) {
    return obj[p];
  };
};

var propEq = function propEq(v) {
  return function (p) {
    return function (obj) {
      return prop(p)(obj) === v;
    };
  };
};

var map = function map(f) {
  return function (array) {
    return array.map(f);
  };
};

var filter = function filter(f) {
  return function (array) {
    return array.filter(f);
  };
};

var getEmailsOf = map(prop('email'));

var onlyAdmins = filter(propEq('admin')('role'));

var getAdminEmails = compose(getEmailsOf, onlyAdmins);

console.log(getAdminEmails(users));