import React from 'react'

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import logo from '../images/secondLogo.jpeg'

const Header = props =>
  <header className='App-header'>
    <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
    <br />
    <h1 className='App-title'>
      {
        props.username
          ? `Welcome to EyeSpace, ${props.username}!`
          : 'Welcome to EyeSpace'
      }
      <br />
      <br />
      {
        props.username &&
          <Button onClick={props.signout} variant='contained' color='primary'>
            SIGN OUT
          </Button>
      }
    </h1>
  </header>

export default Header