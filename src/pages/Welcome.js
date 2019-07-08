import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// Components
import UserPlanet from '../components/userPlanet'
import Planet from './Planet'
import Exoplanet from './Exoplanet'

// API
import { getUserPlanets }  from '../services/api'
import { getAllPlanets }  from '../services/api'
import { createUserPlanet }  from '../services/api'


import Button from '@material-ui/core/Button'


class Welcome extends React.Component {
  state = {
    userPlanet: [],
    planets: [],
    distance: 0,
    filters: {
      types: 'all'
    },
    filterPlanets: []
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
          console.log(data)
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

  
  getFilteredPlanets = () => {
    const filter = this.state.filters.types
    const url = filter === 'all' ? getAllPlanets() : `/api/planets?types=${filter}`

    fetch(url)
    .then(resp => resp.json())
    .then(filterPlanets => this.setState({ filterPlanets }))
  }
  
  changeFilter = (event) => {
    this.setState({ filters: { types: event.target.value } })
  }
  // amountOfLikes = (id) => {
  //   const {userPlanet} = this.state

  // }

  newUserPlanets = () => {
    createUserPlanet()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.setState({ userPlanet: data })
        }
      })
  }

  render () {
    const { planets, userPlanet } = this.state
    const { adoptPlanet, changeFilter } = this

    return (
      <div style={this.style} className='user-list'>
        {/* <iframe src="https://solarsystem.nasa.gov/gltf_embed/2375" width="50%" height="450px" frameborder="0" /> */}
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
      
        <h3>Planet type</h3>
        
          <select onChange={this.changeFilter} name="type" id="type">
            <option value="all">All</option>
            <option value="Rocky">Rocky</option>
            <option value="Gas giants">Gas giants</option>
            <option value="Ice giants">Ice giants</option>
          </select>
          <div className="field">
          <button onClick={this.getFilteredPlanets} className="ui secondary button">Find planets</button>
        </div>
      
        { planets.length === 0 && <p>Sorry, you don't have any planet.</p>}
        {
          planets.map(planet =>
            <UserPlanet key={planet.id} planet={planet} handleSort={this.sortPlanets} userPlanet={userPlanet} changeFilter={changeFilter}/>
          )
        }
        <Route exact path="/planet" component={ <Planet />}/>
        <Route exact path="/exoplanet" component={props => <Exoplanet />}/>
      </div>
    )
  }
}

export default Welcome