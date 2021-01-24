import React, { Component } from 'react'
import { PageContainer, Body } from './style'

import Header from '../../Components/Header'
class Schedule extends Component {
  render() {
    return (
      <PageContainer>
        <Header />
        <Body color="black"></Body>
      </PageContainer>
    )
  }
}

export default Schedule
