import React from 'react'

class Planet extends React.Component {

  state = { 
    
  }

  render () {

    const { planet } = this.props

    return (
      <div>
        {/* <img src={planet.first} /> */}
        <h1>{planet.name}</h1>
        <h1>Hello</h1>
      </div>
    )
  }


}


export default Planet