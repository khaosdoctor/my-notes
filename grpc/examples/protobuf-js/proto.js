const protobuf = require('protobufjs')
const path = require('path')

protobuf.load(path.resolve('../protobuf/meetings.proto'))
  .then(start)
  .catch(console.error)

function start (root) {
  const User = root.lookupType('meetings.User')
  const payload = {
    firstName: 'Lucas',
    lastName: 'Santos',
    addresses: [
      {
        line1: 'Rua X',
        line2: 3540,
        type: 0
      }
    ]
  }

  const message = User.fromObject(payload)
  const buffer = User.encode(message).finish()
  console.log(buffer, message)

  const decoded = User.decode(buffer)
  const obj = User.toObject(decoded)
  console.log(decoded, obj)
}
