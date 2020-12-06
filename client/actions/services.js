import axios from 'axios'
import { getToken } from '../services/utils'

export function listServices () {
  return function (dispatch) {
    dispatch(listServicesRequest())
    return axios({
      method: 'GET',
      url: '/api/services',
      headers: { Authorization: getToken() }
    }).then(response => {
      const services = response.data.payload
      dispatch(listServicesSuccess(services))
    }).catch(error => {
      dispatch(listServicesFailure(error))
    })
  }
}

export function listServicesRequest (services) {
  return {
    type: 'LIST_SERVICES_REQUEST'
  }
}

export function listServicesSuccess (services) {
  return {
    type: 'LIST_SERVICES_SUCCESS',
    services: services
  }
}

export function listServicesFailure (services) {
  return {
    type: 'LIST_SERVICES_FAILURE',
    services: services
  }
}
