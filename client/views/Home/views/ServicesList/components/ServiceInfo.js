import React, { Component } from 'react'
import { Card, Popconfirm } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone
} from '@ant-design/icons'
import './ServiceInfo.css'

const { Meta } = Card
class ServiceInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visiblePopconfirm: false
    }
  }

  handleDeleteIconClick = () => {
    this.setState({
      visiblePopconfirm: true
    })
  }

  handleOnConfirmDelete = () => {
    this.props.onDeleteClick(this.props.service)
    this.setState({
      visiblePopconfirm: false
    })
  }

  handleOnCancelDelete = () => {
    this.setState({
      visiblePopconfirm: false
    })
  }

  handleEditIconClick = () => {
    this.props.onEditClick(this.props.service)
  }

  handleViewIconClick = () => {
    this.props.onViewClick(this.props.service)
  }

  render () {
    return (
      <Card
        className='service-card'
        actions={[
          <Popconfirm
            key='setting'
            title='Are you sure to delete this?'
            onConfirm={this.handleOnConfirmDelete}
            onCancel={this.handleOnCancelDelete}
            okText='Yes'
            cancelText='No'
            visible={this.state.visiblePopconfirm}
          >
            <DeleteOutlined key='setting' onClick={this.handleDeleteIconClick} />
          </Popconfirm>,
          <EditOutlined key='edit' onClick={this.handleEditIconClick} />,
          <InfoCircleOutlined key='view' onClick={this.handleViewIconClick} />
        ]}
      >
        <Meta
          avatar={
            this.props.service.status
              ? <CheckCircleTwoTone twoToneColor='#52c41a' />
              : <ExclamationCircleTwoTone twoToneColor='#eb2f96' />
          }
          title={this.props.service.name}
          description={(
            <div>
              <div>{this.props.service.endpoint}</div>
              <div>Created: {new Date(this.props.service.createdAt).toLocaleString()}</div>
              <div>Updated: {new Date(this.props.service.updatedAt).toLocaleString()}</div>
            </div>
          )}
        />
        <div>
          {this.props.service.description}
        </div>
      </Card>
    )
  }
}

export default ServiceInfo
