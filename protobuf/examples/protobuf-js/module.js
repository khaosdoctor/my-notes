const { meetings: { User } } = require('./compiledUser')

const user = new User({
  firstName: 'Lucas',
  addresses: [new User.Address({ line1: 'Rua X' })]
}
)
const err = User.verify(user)
if (err) console.error(err)
console.log(`Created user: ${user.firstName}`)

const encoded = User.encode(user).finish()
console.log(encoded)

const decoded = User.decode(encoded)
console.log(decoded)
