import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'

// Sorted Radio Styling
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CardMedia from '@material-ui/core/CardMedia';

// Filter Selects
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Routes
import { Route, Switch, withRouter } from 'react-router-dom'

// imports from child
import Planet from '../pages/Planet'
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

class UserPlanet extends React.Component {
  state = { 
    expanded: true,
    planets: []
  }

  adoptPlanet = planetId => {
    const planets = this.state.planets.map(planet => planet.id === planetId
      ? {...planet, isAdopted: true}
      : planet
      )
      this.setState({planets})
  }
  
updateTheLikes = (planet) => {
    const likes = planet.likes += 1
  
  return fetch(`http://localhost:3000/planets/${planet.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
      body: JSON.stringify({likes})
  }).then(resp => resp.json())
}

addLikes = () => {
  this.updateTheLikes(this.props.planet)
  .then(data => {
    if (data.error) {
      alert(data.error)
    } else {
      this.setState({ planets: data })
    }
  })
}

componentDidMount () {
  this.addLikes()

}

handleExpandClick = () => {
  this.setState(state => ({ expanded: !state.expanded }))
}

  render () {
    const { classes, planet, handleSort, userPlanet } = this.props
    const { planets } = this.state
    const { adoptPlanet } = this

    return (
      
      // <FormControl component="fieldset" className={classes.formControl}>

      //   <FormLabel component="legend">Sort Planets By</FormLabel>
      //     <RadioGroup
      //       aria-label="planets"
            
      //       className={classes.group}
      //       value="Alphabetically"
      //       onChange={(e) => { handleSort(e.target.value)}}
      //     >
      //         <FormControlLabel
      //           value="Alphabetically"
      //           name="sortRadio"
      //           control={<Radio color="primary" />}
      //           label="Name"
      //           labelPlacement="start"
      //         />
      //         <FormControlLabel
      //           value="Distance"
      //           name="sortRadio"
      //           control={<Radio color="primary" />}
      //           label="Distance"
      //           labelPlacement="start"
      //         />
      //     </RadioGroup>
      
      <Card style={{margin: '10px'}} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              { planets.likes }
            </Avatar>
          }


//           id:
//           1
//           planet_id:
//           4
//           updated_at:
//           "2019-07-01T19:31:05.972Z"
//           user_id:
//           1


          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={planet.name}
          subheader='July 8, 2019'
        />
  
      <CardMedia
        className={classes.media}
        image={planet.first}
        title="Planet Image"
      />

        <CardActions className={classes.actions} disableActionSpacing>
          {/* <IconButton aria-label='Add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='Share'>
            <ShareIcon />
          </IconButton> 
          Save */}
          {/* <Link to='/signin'>Signin</Link> */}
          <Link to={`/planet/${planet.id}`} planet={planet => <Planet {...planet}/>}>
            <Button variant="contained" color="primary" planet={planet => <Planet {...planet}/>} className={classes.button}>
              More Info
            </Button>
          </Link>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label='Show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph variant='body2'>
            <ul>
              <li>Earth like-size Diameter: {planet.diameter} KM</li>
              <li>Earth like-mass: {planet.mass} Earths</li>
              <li>Earth like-orbit: {planet.orbital_period} Days</li>
              <li>Earth like-days: {planet.day_length} Hours</li>
              <li>Distance from Earth: {planet.sun_distance} Million KM</li>
              <li>Average Temperature: {planet.temperature} ℃</li>
              
            </ul>
              <br />
              <h2>The More Votes You Give, The Greater The Chances Are!</h2>
              <Button onClick={this.addLikes}> Vote 👍🏻 </Button>
              {/* <div className="extra content">
          {
            planet.isAdopted
              ? <button className="ui disabled button">Already adopted</button>
              : <button onClick={() => adoptPlanet(planet.id)} className="ui primary button">Adopt pet</button>
          }
        </div> */}
            </Typography>
          </CardContent>
        </Collapse>
        <Route exact path="/planet" planet={planet => <Planet {...planet}/>}/>
      </Card>
      // </FormControl>
      
    )
    
  }
}

UserPlanet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserPlanet)