import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../actions/add-service'
import './index.css'
import ServiceForm from '../../components/ServiceForm'

class AddService extends Component {
  handleOnFinish = (values) => {
    console.log('values', values)
    this.props.actions.addService({
      name: values.name,
      endpoint: values.endpoint,
      description: values.description
    }, this.props.history)
  }

  render () {
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }}>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <Link to='/'>
                <Button icon={<LeftOutlined />}>Back</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ServiceForm
                title='Register a new service'
                isLoading={this.props.isLoading}
                onFinish={this.handleOnFinish}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.services.isAddingService
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddService)
