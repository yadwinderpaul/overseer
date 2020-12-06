import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { message } from 'antd'
import Login from './views/Login'
import Home from './views/Home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/auth'

class App extends Component {
  componentDidMount () {
    this.props.actions.initializeAuth()
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={routerProps => <Home {...routerProps} />} />
        </Switch>
      </Router>
    )
  }

  componentDidCatch (error, errorInfo) {
    console.log('error', error)
    console.log('errorInfo', errorInfo)
    message.error(error.toString())
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(null, mapDispatchToProps)(App)
