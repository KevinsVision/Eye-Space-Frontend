import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Header from './pages/Header'
import SignInForm from './pages/SignInForm'
import Welcome from './pages/Welcome'
import Signup from './pages/signup'
import { validate } from './services/api'

import './App.css'

class App extends Component {

  state = {
    username: ''
  }

  signin = (user) => {
    this.setState({ username: user.username })
    localStorage.setItem('token', user.token)
    this.props.history.push('/welcome')
  }

  signout = () => {
    this.setState({ username: '' })
    localStorage.removeItem('token')
  }

  componentDidMount () {
    if (localStorage.token) {
      validate()
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.signin(data)
          }
        })
    }
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className="App">
        <Header username={username} signout={signout} />
        <Switch>
        <Route exact path="/signup" component={props => <Signup {...props} signin={signin} />}/>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={props => <SignInForm signin={signin} {...props} />} />
          <Route path='/welcome' component={props => <Welcome username={username} {...props} />} />
          <Route component={() => <h1>Page not found.</h1>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
