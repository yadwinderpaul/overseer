import axios from 'axios'
import { getToken } from '../services/utils'

export function updateService (service, history) {
  return function (dispatch) {
    dispatch(updateServiceRequest())
    return axios({
      method: 'PUT',
      url: `/api/services/${service.id}`,
      headers: { Authorization: getToken() },
      data: {
        name: service.name,
        endpoint: service.endpoint,
        description: service.description
      }
    }).then(response => {
      const service = response.data.payload
      dispatch(updateServiceSuccess(service))
      history.push('/')
    }).catch(error => {
      dispatch(updateServiceFailure(error, service))
    })
  }
}

export function updateServiceRequest () {
  return {
    type: 'UPDATE_SERVICE_REQUEST'
  }
}

export function updateServiceSuccess (service) {
  return {
    type: 'UPDATE_SERVICE_SUCCESS',
    service: service
  }
}

export function updateServiceFailure (error, service) {
  return {
    type: 'UPDATE_SERVICE_FAILURE',
    error: error,
    service: service
  }
}
