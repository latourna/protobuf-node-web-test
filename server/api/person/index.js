const express = require('express')

const { Person } = require('../../../proto/Person_pb')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const person = new Person()
    person.setName('John Doe')
    person.setId(25)
    person.setEmail('john.doe@test.io')

    const serializedPerson = person.serializeBinary()
    res.set('Content-Type', 'application/octet-stream')
    res.end(Buffer.from(serializedPerson), 'binary')
  } catch (err) {
    console.log('err', err)
    res.status(400).send(err)
  }
})

module.exports = router
