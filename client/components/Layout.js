import React from 'react'
import { Container } from 'reactstrap'

import Header from './Header'
import Home from './Home'

export default class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Container>
          <Home />
        </Container>
      </div>
    )
  }
}
