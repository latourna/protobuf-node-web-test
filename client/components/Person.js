import PropTypes from 'prop-types'
import React from 'react'

export default class Person extends React.Component {
  static propTypes = {
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div>
        <span>Name: {this.props.person.name}</span><br />
        <span>ID: {this.props.person.id}</span><br />
        <span>Email: {this.props.person.email}</span>
      </div>
    )
  }
}
