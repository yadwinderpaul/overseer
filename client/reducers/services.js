const initialState = {
  services: [],
  isLoadingServicesList: false,
  isAddingService: false,
  isUpdatingService: false,
  isDeletingService: false
}

export default function (state = initialState, action) {
  let tempServices

  switch (action.type) {
    // list services reducers
    case 'LIST_SERVICES_REQUEST':
      return Object.assign({}, state, {
        isLoadingServicesList: true
      })
    case 'LIST_SERVICES_SUCCESS':
      return Object.assign({}, state, {
        isLoadingServicesList: false,
        services: action.services
      })
    case 'LIST_SERVICES_FAILURE':
      return Object.assign({}, state, {
        isLoadingServicesList: false
      })

    // add services reducers
    case 'ADD_SERVICE_REQUEST':
      return Object.assign({}, state, {
        isAddingService: true
      })
    case 'ADD_SERVICE_SUCCESS':
      tempServices = state.services
      tempServices.push(action.service)
      return Object.assign({}, state, {
        isAddingService: false,
        services: [...tempServices]
      })
    case 'ADD_SERVICE_FAILURE':
      return Object.assign({}, state, {
        isAddingService: false
      })

    // update services reducers
    case 'UPDATE_SERVICE_REQUEST':
      return Object.assign({}, state, {
        isUpdatingService: true
      })
    case 'UPDATE_SERVICE_SUCCESS':
      tempServices = state.services
        .filter(svc => svc.id !== action.service.id)
      return Object.assign({}, state, {
        isUpdatingService: false,
        services: [...tempServices, action.service]
      })
    case 'UPDATE_SERVICE_FAILURE':
      return Object.assign({}, state, {
        isUpdatingService: false
      })

    // delete services reducers
    case 'DELETE_SERVICE_REQUEST':
      return Object.assign({}, state, {
        isDeletingService: true
      })
    case 'DELETE_SERVICE_SUCCESS':
      tempServices = state.services
        .filter(svc => svc.id !== action.service.id)
      return Object.assign({}, state, {
        isDeletingService: false,
        services: [...tempServices]
      })
    case 'DELETE_SERVICE_FAILURE':
      return Object.assign({}, state, {
        isDeletingService: false
      })

    default:
      return state
  }
}
