import React from 'react'
import ReactDOM from 'react-dom'
import './Layout/global.scss'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/configureStore'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
