import React from 'react'
import { Container } from 'reactstrap'

export default class Header extends React.Component {
  render() {
    return (
      <header role="banner">
        <Container>
          <h2 className="app-name">Protobuf node test</h2>
        </Container>
      </header>
    )
  }
}
