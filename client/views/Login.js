import React, { Component } from 'react'
import { Layout, Row, Col, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/auth'

const { Content } = Layout
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      containerHeight: 500
    }
    this.emailRules = [
      { required: true, message: 'Please enter your email address!' },
      { type: 'email', message: 'Should be a valid email address' }
    ]
    this.passwordRules = [{ required: true, message: 'Please enter your Password!' }]

    this.handleOnFinish = this.handleOnFinish.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      console.log('is already authenticated componentDidMount')
      this.props.history.push('/')
    }

    this.setState({
      containerHeight: window.innerHeight
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.isAuthenticated) {
      console.log('is already authenticated componentDidUpdate')
      this.props.history.push('/')
    }
  }

  handleOnFinish (values) {
    this.props.actions.loginUser(values.email, values.password, this.props.history)
  }

  render () {
    return (
      <Layout>
        <Content>
          <Row className='login-container' style={{ height: `${this.state.containerHeight}px` }}>
            <Col span={24}>
              <Row style={{ paddingTop: `${this.state.containerHeight / 5}px` }}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 8, offset: 8 }} className='form'>
                  <div className='logo'>Overseer</div>
                  <Form
                    initialValues={{ remember: true }}
                    onFinish={this.handleOnFinish}
                  >
                    <Form.Item
                      name='email'
                      rules={this.emailRules}
                    >
                      <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='user@email.com' />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      rules={this.passwordRules}
                    >
                      <Input
                        prefix={<LockOutlined className='site-form-item-icon' />}
                        type='password'
                        placeholder='Password'
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type='primary' htmlType='submit' className='login-form-button'
                        disabled={this.props.isAuthenticating}
                      >
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
