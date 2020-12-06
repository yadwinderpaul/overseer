import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import './index.css'
import ServicesList from './views/ServicesList'
import AddService from './views/AddService'
import EditService from './views/EditService'
import ViewService from './views/ViewService'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as servicesActionCreators from '../../actions/services'
import * as authActionCreators from '../../actions/auth'

const { Header, Content } = Layout
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      containerHeight: 500
    }
  }

  componentDidMount () {
    if (!this.props.isAuthenticated) {
      console.log('is not authenticated componentDidMount')
      this.props.history.push('/login')
      return
    }
    this.props.actions.listServices()

    this.setState({
      containerHeight: window.innerHeight
    })
  }

  componentDidUpdate (prevProps) {
    if (!this.props.isAuthenticated) {
      console.log('is not authenticated componentDidUpdate')
      this.props.history.push('/login')
    }
  }

  handleLogoutClick = () => {
    console.log('logging out')
    this.props.actions.logoutUser()
  }

  render () {
    return (
      <div className='App'>
        <Layout>
          <Header>
            <Row>
              <Col span={12}>
                <div className='logo'>Overseer</div>
              </Col>
              <Col span={12}>
                <div className='logout'>
                  <a onClick={this.handleLogoutClick}>
                    <LogoutOutlined /> <span className='text'>Logout</span>
                  </a>
                </div>
              </Col>
            </Row>
          </Header>
          <Content>
            <div className='content' style={{ minHeight: `${this.state.containerHeight}px` }}>
              <Switch>
                <Route
                  path={`${this.props.match.path}new`}
                  render={routerProps => <AddService {...routerProps} />}
                />
                <Route
                  path={`${this.props.match.path}view/:id`}
                  render={routerProps => <ViewService {...routerProps} />}
                />
                <Route
                  path={`${this.props.match.path}edit/:id`}
                  render={routerProps => <EditService {...routerProps} />}
                />
                <Route
                  path={this.props.match.path}
                  render={routerProps => <ServicesList {...routerProps} />}
                />
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  services: state.services.services,
  isLoading: state.services.isLoadingServicesList
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...servicesActionCreators,
    ...authActionCreators
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
