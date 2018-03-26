import React from 'react'

import Person from './Person'
import PersonService from '../services/PersonService'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      people: [],
    }
    this.personService = new PersonService()
  }

  componentWillMount() {
    this.personService.getPerson().then((person) => {
      this.setState({
        people: [person],
      })
    })
  }

  render() {
    const people = this.state.people
      .map(person => (
        <Person
          person={person}
          key={person.id}
        />
      ))

    return (
      <div>
        {people}
      </div>
    )
  }
}
