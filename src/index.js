const add = (a, b) => a + b

const curriedAdd = a => b => a + b
const curriedMul = a => b => a * b

const add5 = curriedAdd(5)

console.log(add5)

// console.log(add5(4))
// console.log(add5(50))

// (f: b -> c, g: a -> b) -> a -> c
const comp2 = (f, g) => a => f(g(a))

const add3Mul5 = comp2(curriedMul(5), curriedAdd(3))

// console.log(add3Mul5(7))

const message = greeting => name => `${greeting} ${name}`

const loginMessage = message('Hello')

const logoutMessage = message('Goodbye')

const changeServer = message('You changed servers')

console.log(loginMessage('bob'))

console.log(changeServer('susie'))

console.log(logoutMessage('bob'))

const weirdMessage = comp2(
  message('Hello,'),
  message('welcome to our new server which covers so much of the world')
)

console.log(weirdMessage('Timmy'))

// id: a -> a
const id = a => a

// compose: (...func) -> compose functions
const compose = (...fs) => fs.reduce(comp2, id)

const add5Add5Mul2 = compose(curriedMul(2), curriedAdd(5), curriedAdd(5))

console.log(add5Add5Mul2(10)) // 40

const users = [
  {
    username: 'Tim',
    role: 'admin',
    email: 'tim@test.com'
  },
  {
    username: 'Bob',
    role: 'user',
    email: 'bob@test.com'
  },
  {
    username: 'Jerry',
    role: 'smuck',
    email: 'jerry@test.com'
  },
  {
    username: 'Morty',
    role: 'admin',
    email: 'morty@test.com'
  }
]

const prop = p => obj => obj[p]

const propEq = v => p => obj => prop(p)(obj) === v

const map = f => array => array.map(f)

const filter = f => array => array.filter(f)

const getEmailsOf = map(prop('email'))

const onlyAdmins = filter(propEq('admin')('role'))

const getAdminEmails = compose(getEmailsOf, onlyAdmins)

console.log(getAdminEmails(users))
