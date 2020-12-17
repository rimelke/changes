import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Providers from './pages/Providers'
import Fabrics from './pages/Fabrics'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import Groups from './pages/Groups'
import EditProduct from './pages/EditProduct'

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Home} />
			<Route path="/providers" exact component={Providers} />
			<Route path="/fabrics" exact component={Fabrics} />
			<Route path="/products" exact component={Products} />
			<Route path="/new/product" exact component={NewProduct} />
			<Route path="/products/:id" exact component={EditProduct} />
			<Route path="/groups" exact component={Groups} />
		</BrowserRouter>
	)
}

export default Routes