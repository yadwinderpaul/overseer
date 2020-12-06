import React, { Component } from 'react'
import { BarChart, Bar, Cell, Tooltip } from 'recharts'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Typography, Space, Image } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../actions/status-updates'
import './index.css'
import img from './server.jpg'

const { Title, Text } = Typography
class ViewService extends Component {
  componentDidMount () {
    if (this.props.service) {
      this.props.actions.getStatusUpdates(this.props.service)
    }
  }

  tooltipFormatter = (value, name, props) => {
    const ts = new Date(props.payload.createdAt)
    return [ts.toLocaleString(), 'Checked at']
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
          <Row className='view-service-container'>
            <Col span={24}>
              <Row align='middle'>
                <Col span={10}>
                  <Space direction='vertical'>
                    <Title level={4}>{this.props.service.name}</Title>
                    <Text type='secondary'>{this.props.service.endpoint}</Text>
                    <Text>{this.props.service.description}</Text>
                  </Space>
                </Col>
                <Col span={14} style={{ textAlign: 'center' }}>
                  <Image width={200} src={img} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Title level={5}>Service Uptime</Title>
                  <BarChart width={300} height={80} data={this.props.statusUpdates}>
                    <Tooltip
                      allowEscapeViewBox={{ x: true, y: true }}
                      formatter={this.tooltipFormatter}
                    />
                    <Bar dataKey='value' fill='#1bdeb0' radius={[4, 4, 4, 4]}>
                      {
                        this.props.statusUpdates.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.status ? '#1bdeb0' : '#ed1c5f'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const service = (state.services.services || []).find(svc => svc.id === ownProps.match.params.id) || {}
  let statusUpdates = []
  if (service && service.id) {
    statusUpdates = (state.statusUpdates.statusUpdates || {})[service.id] || []
  }
  statusUpdates = statusUpdates.map(upd => Object.assign(upd, { value: 1 }))
  return {
    service: service,
    statusUpdates: statusUpdates,
    isLoading: state.services.isUpdatingService
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewService)
