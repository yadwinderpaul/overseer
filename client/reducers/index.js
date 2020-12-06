import { combineReducers } from 'redux'
import auth from './auth'
import services from './services'
import statusUpdates from './status-updates'

export default combineReducers({ auth, services, statusUpdates })
