import axios from 'axios'
import { message } from 'antd'
import { getToken, setToken, removeToken } from '../services/utils'

export function loginUser (email, password, history) {
  return function (dispatch) {
    dispatch(loginUserRequest())
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password }
    }).then(response => {
      const user = response.data.payload
      setToken(user.jwt)
      dispatch(loginUserSuccess(user.jwt))
      message.success('Succesfully Logged In')
      history.push('/')
    }).catch(error => {
      console.log('error', error)
      message.error('Invalid Credentials')
      dispatch(loginUserFailure(error))
    })
  }
}

export function loginUserRequest () {
  return {
    type: 'LOGIN_USER_REQUEST'
  }
}

export function loginUserSuccess (token) {
  return {
    type: 'LOGIN_USER_SUCCESS',
    token: token
  }
}

export function loginUserFailure (error) {
  return {
    type: 'LOGIN_USER_FAILURE',
    error
  }
}

export function logoutUser () {
  return function (dispatch) {
    removeToken()
    dispatch(logoutUserSuccess())
  }
}

export function logoutUserSuccess () {
  return {
    type: 'LOGOUT_USER_SUCCESS'
  }
}

export function initializeAuth () {
  return function (dispatch) {
    try {
      const token = getToken()
      if (!token) throw new Error('No token')
      dispatch(loginUserSuccess(token))
    } catch (error) {
      dispatch(loginUserFailure(error))
    }
  }
}
