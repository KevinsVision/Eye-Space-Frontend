import React from 'react'

import UserPlanet from '../components/userPlanet'

import { getUserPlanets }  from '../services/api'
import { getAllPlanets }  from '../services/api'


import Button from '@material-ui/core/Button'


class Welcome extends React.Component {
  state = {
    userPlanet: [],
    planets: [],
    distance: 0
    // likes: 0
  }

  style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  }

  setUserPlanets = () => {
    getUserPlanets()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.setState({ userPlanet: data })
        }
      })
  }

  setPlanets = () => {
    getAllPlanets()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.setState({ planets: data })
        }
      })
  }

  componentDidMount () {
    this.setPlanets()
    if (!this.props.username) {
      this.props.history.push('/signin')
    } else {
      this.setUserPlanets()
    }
  }

  sortPlanets = (value) => {
    const {planets} = this.state
    const sortedPlanets = planets.slice()
    value === 'Alphabetically' ? sortedPlanets.sort((a,b) => (a.name > b.name) ? 1 : -1)
    : value === 'Distance' ? sortedPlanets.sort((a,b) => (a.sun_distance > b.sun_distance) ? 1 : -1)
    : sortedPlanets.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
    this.setState({planets: sortedPlanets})
  }

  render () {
    const { planets } = this.state 

    return (
      <div style={this.style} className='user-list'>
        <h3>Here's all the planets in our Solar System:</h3>
        <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Likes" name="sortRadio" onChange={(e) => { this.sortPlanets(e.target.value)}}/>
        Most Voted
      </label>
      <label>
        <input type="radio" value="Alphabetically" name="sortRadio" onChange={(e) => { this.sortPlanets(e.target.value)}}/>
        Name
      </label>
      <label>
        <input type="radio" value="Distance" name="sortRadio" onChange={(e) => { this.sortPlanets(e.target.value)}}/>
        Distance from Sun
      </label>


        { planets.length === 0 && <p>Sorry, you don't have any planet.</p>}
        {
          planets.map(planet =>
            <UserPlanet key={planet.id} planet={planet} handleSort={this.sortPlanets} />
            
          )
        }
      </div>
    )
  }
}

export default Welcome