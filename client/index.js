import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import store from './store'

function main () {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

main()

if (module.hot) {
  module.hot.accept('./App', main)
}
