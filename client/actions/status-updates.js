import axios from 'axios'
import { getToken } from '../services/utils'

export function getStatusUpdates (service) {
  return function (dispatch) {
    dispatch(getStatusUpdatesRequest())
    return axios({
      method: 'GET',
      url: `/api/services/${service.id}/status-updates`,
      headers: { Authorization: getToken() }
    }).then(response => {
      const statusUpdates = response.data.payload
      dispatch(getStatusUpdatesSuccess(service, statusUpdates))
    }).catch(error => {
      dispatch(getStatusUpdatesFailure(error))
    })
  }
}

export function getStatusUpdatesRequest (service) {
  return {
    type: 'SERVICE_UPDATES_REQUEST'
  }
}

export function getStatusUpdatesSuccess (service, statusUpdates) {
  return {
    type: 'SERVICE_UPDATES_SUCCESS',
    service: service,
    statusUpdates: statusUpdates
  }
}

export function getStatusUpdatesFailure (service, error) {
  return {
    type: 'SERVICE_UPDATES_FAILURE',
    error: error
  }
}
