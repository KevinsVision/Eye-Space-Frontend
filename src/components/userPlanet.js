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
import Grid from '@material-ui/core/Grid';

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
    maxWidth: 550
  },
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
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
  },

  control: {
    padding: theme.spacing(2),
  }
  
})

class UserPlanet extends React.Component {
  state = { 
    expanded: true,
    planets: []
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


      <Card style={{margin: '10px'}} className={classes.card}>
        <CardHeader className="card-header"
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              { planets.likes }
            </Avatar>
          }
          title={planet.name}
          subheader='July 9, 2019'
        />  
      <CardMedia
        className={classes.media}
        image={planet.first}
        title="Planet Image"
      />
        <CardActions className={classes.actions} disableActionSpacing>    
          <Link to={`/welcome/planet/${planet.id}`} target="_blank" component={ <Planet planet={planet} />}>
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
              <ul className="outer-stats">
                <ul className="stats">
                  <li className="inner-stats">Earth like-size Diameter: {planet.diameter} KM</li>
                  <li className="inner-stats">Earth like-mass: {planet.mass} Earths</li>
                  <li className="inner-stats">Earth like-orbit: {planet.orbital_period} Days</li>
                  <li className="inner-stats">Earth like-days: {planet.day_length} Hours</li>
                  <li className="inner-stats">Distance from Earth: {planet.sun_distance} Light Years Away</li>
                  <li className="inner-stats">Average Temperature: {planet.temperature} ℃</li>
                </ul>
              </ul>
            </ul>
              <br />
                <h2>The More Likes You Give, The Greater The Chances Are of Going!</h2>
              <Button onClick={this.addLikes}> Vote 👍🏻 </Button>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )    
  }
}
UserPlanet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserPlanet)