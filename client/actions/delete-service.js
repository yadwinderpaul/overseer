import axios from 'axios'
import { getToken } from '../services/utils'

export function deleteService (service) {
  return function (dispatch) {
    dispatch(deleteServiceRequest())
    return axios({
      method: 'DELETE',
      url: `/api/services/${service.id}`,
      headers: { Authorization: getToken() }
    }).then(response => {
      const service = response.data.payload
      dispatch(deleteServiceSuccess(service))
    }).catch(error => {
      dispatch(deleteServiceFailure(error, service))
    })
  }
}

export function deleteServiceRequest () {
  return {
    type: 'DELETE_SERVICE_REQUEST'
  }
}

export function deleteServiceSuccess (service) {
  return {
    type: 'DELETE_SERVICE_SUCCESS',
    service: service
  }
}

export function deleteServiceFailure (error, service) {
  return {
    type: 'DELETE_SERVICE_FAILURE',
    error: error,
    service: service
  }
}
