import React from 'react'
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormGroup, FormControl, FormLabel } from "react-bootstrap"
import { makeStyles } from '@material-ui/core/styles';

// API
import { signin } from '../services/api'


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}))

class SignInForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    signin(this.state.username, this.state.password)
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.props.signin(data)
        }
      })
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  render () {
    const { username, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div className="user-list">
        <FormLabel>Username</FormLabel>
        <TextField
          id='usernameInput'
          label='Username'
          value={username}
          onChange={handleChange}
          margin='normal'
          name='username'
        />
        <br />
        <FormLabel>Password</FormLabel>
        <TextField
          id='passwordInput'
          label='Password'
          value={password}
          onChange={handleChange}
          margin='normal'
          name='password'
          type='password'
        />
        <br />
        
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          SUBMIT
        </Button>
        <br />
        <br />
        <Button variant='contained' color='primary'><Link to="/" className="user-list">Go Back</Link></Button>
        
      </div>
    )
  }
}

export default SignInForm