import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Sidebar from './components/Sidebar';
import Home from "./pages/Home";
import Products from './pages/Products'
import Providers from './pages/Providers'

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Sidebar />
			<Route path="/" exact component={Home} />
			<Route path="/products" exact component={Products.Home} />
			<Route path="/products/new" exact component={Products.New} />
			<Route path="/providers" exact component={Providers} />
		</BrowserRouter>
	);
};

export default Routes;