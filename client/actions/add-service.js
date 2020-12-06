import axios from 'axios'
import { getToken } from '../services/utils'

export function addService (service, history) {
  return function (dispatch) {
    dispatch(addServiceRequest())
    return axios({
      method: 'POST',
      url: '/api/services',
      headers: { Authorization: getToken() },
      data: {
        name: service.name,
        endpoint: service.endpoint,
        description: service.description
      }
    }).then(response => {
      const service = response.data.payload
      dispatch(addServiceSuccess(service))
      history.push('/')
    }).catch(error => {
      dispatch(addServiceFailure(error, service))
    })
  }
}

export function addServiceRequest () {
  return {
    type: 'ADD_SERVICE_REQUEST'
  }
}

export function addServiceSuccess (service) {
  return {
    type: 'ADD_SERVICE_SUCCESS',
    service: service
  }
}

export function addServiceFailure (error, service) {
  return {
    type: 'ADD_SERVICE_FAILURE',
    error: error,
    service: service
  }
}
