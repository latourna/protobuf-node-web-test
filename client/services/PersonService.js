import axios from 'axios'

import { Person } from '../../proto/Person_pb'

export default class PersonService {
  baseApi = '/api/v1/person'

  async getPerson() {
    const res = await axios.get(`${this.baseApi}`, { responseType: 'arraybuffer' })
    const person = Person.deserializeBinary(res.data)
    const personObject = person.toObject()
    return personObject
  }
}
