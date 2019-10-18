import React, { Component } from 'react'

class Planet extends Component {

  state = { 
    
  }

  render () {

    const { planet } = this.props

    return (
      <div className='user-list'>
        {/* <img src={planet.first} /> */}
        {/* <h1>{planet.name}</h1> */}
        <h1>Hello</h1>
      </div>
    )
  }

}


export default Planet