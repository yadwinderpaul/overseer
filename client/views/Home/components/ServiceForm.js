import React, { Component } from 'react'
import {
  Button, Typography, Image,
  Row, Col,
  Form, Input
} from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import './ServiceForm.css'
import img from './server.jpg'

const { Title } = Typography
class ServiceForm extends Component {
  constructor (props) {
    super(props)
    this.nameRules = [
      { type: 'string', message: 'Enter name of the service', required: true },
      { type: 'string', min: 4, message: 'Enter atleast 4 chars for better identification' }
    ]
    this.endpointRules = [
      { type: 'string', message: 'Please enter endpoint to your service', required: true },
      { type: 'url', message: 'Please enter a valid url' }
    ]
  }

  handleOnFinish = (values) => {
    this.props.onFinish(values)
  }

  render () {
    return (
      <Row align='middle' className='add-service-form-container'>
        <Col span={12}>
          <Title level={3}>{this.props.title}</Title>
          <Form
            layout='vertical'
            onFinish={this.handleOnFinish}
          >
            <Form.Item
              label='Service name'
              name='name'
              rules={this.nameRules}
              initialValue={this.props.name}
            >
              <Input placeholder='eg: Integrations Service' />
            </Form.Item>
            <Form.Item
              label='Service endpoint'
              name='endpoint'
              rules={this.endpointRules}
              initialValue={this.props.endpoint}
            >
              <Input placeholder='eg: http://api.mydomain.com/my-service' />
            </Form.Item>
            <Form.Item
              label='Description'
              name='description'
              initialValue={this.props.description}
            >
              <Input placeholder='eg: Service for providing assets details' />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                icon={<SaveOutlined />}
                type='primary'
                disabled={this.props.isLoading}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Image
            width={200}
            src={img}
          />
        </Col>
      </Row>
    )
  }
}

export default ServiceForm
