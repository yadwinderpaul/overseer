import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import ServiceInfo from './components/ServiceInfo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../actions/delete-service'
import img from './network.png'

class ServicesList extends Component {
  handleOnServiceEdit = (service) => {
    this.props.history.push(`edit/${service.id}`)
  }

  handleOnServiceDelete = (service) => {
    this.props.actions.deleteService(service)
  }

  handleOnServiceView = (service) => {
    this.props.history.push(`view/${service.id}`)
  }

  render () {
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 18, offset: 3 }}>
          {
            this.props.services.length === 0
              ? (
                <Row gutter={20} style={{ marginTop: '100px', textAlign: 'center' }}>
                  <Col span={24} style={{ marginBottom: '20px' }}>
                    <Image
                      width={100}
                      src={img}
                    />
                  </Col>
                  <Col span={24}>
                    <Link to='new'>
                      <Button icon={<PlusCircleOutlined />} type='primary'>Add A Service</Button>
                    </Link>
                  </Col>
                </Row>
                )
              : (
                <>
                  <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={24}>
                      <Link to='new'>
                        <Button icon={<PlusCircleOutlined />}>Add New Service</Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row gutter={[20, 10]}>
                    {this.props.services.map(service => {
                      return (
                        <Col xs={24} sm={24} md={12} lg={12} key={service.id}>
                          <ServiceInfo
                            key={service.id}
                            service={service}
                            onEditClick={this.handleOnServiceEdit}
                            onDeleteClick={this.handleOnServiceDelete}
                            onViewClick={this.handleOnServiceView}
                          />
                        </Col>
                      )
                    })}
                  </Row>
                </>
                )
          }
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  services: state.services.services
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList)
