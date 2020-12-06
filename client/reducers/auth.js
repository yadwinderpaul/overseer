const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER_REQUEST':
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null
      })
    case 'LOGIN_USER_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token,
        statusText: 'Successfully logged in'
      })
    case 'LOGIN_USER_FAILURE':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        statusText: 'Authentication failure'
      })
    case 'LOGOUT_USER_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        statusText: 'Logged out'
      })
    default:
      return state
  }
}
