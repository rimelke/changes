import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Providers from './pages/Providers'

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Home} />
			<Route path="/providers" exact component={Providers} />
		</BrowserRouter>
	)
}

export default Routes