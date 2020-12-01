import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Providers from './pages/Providers'
import Fabrics from './pages/Fabrics'

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Home} />
			<Route path="/providers" exact component={Providers} />
			<Route path="/fabrics" exact component={Fabrics} />
		</BrowserRouter>
	)
}

export default Routes