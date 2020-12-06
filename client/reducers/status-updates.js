const initialState = {
  statusUpdates: {},
  isLoadingStatusUpdates: false
}

export default function (state = initialState, action) {
  let newUpdates = {}

  switch (action.type) {
    case 'SERVICE_UPDATES_REQUEST':
      return Object.assign({}, state, {
        isLoadingStatusUpdates: true
      })
    case 'SERVICE_UPDATES_SUCCESS':
      newUpdates = {}
      newUpdates[action.service.id] = action.statusUpdates
      return Object.assign({}, state, {
        isLoadingStatusUpdates: false,
        statusUpdates: Object.assign({}, state.statusUpdates, newUpdates)
      })
    case 'SERVICE_UPDATES_FAILURE':
      return Object.assign({}, state, {
        isLoadingStatusUpdates: false
      })
    default:
      return state
  }
}
