import * as React from 'react'
import { hot } from 'react-hot-loader'
import {MainContainer} from './components/MainContainer'

import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

const App = () => (
  <MainContainer />
)

export default hot(module)(App)
