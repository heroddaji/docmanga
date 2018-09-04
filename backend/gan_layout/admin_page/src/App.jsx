import * as React from 'react'
import { hot } from 'react-hot-loader'
import {MainContainer} from './components/MainContainer'
import {Store} from './services/Store'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <MainContainer store={new Store()}/>
)

export default hot(module)(App)
