import * as React from 'react'
import { hot } from 'react-hot-loader'
import {MainContainer} from './components/MainContainer'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <MainContainer techs={['hehe','haha']} />
)

export default hot(module)(App)
