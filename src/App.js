import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Registration from "./Components/Registration/index";
import Dashboard from "./Components/Dashboard/dashboard.js";
import Events from "./Components/Events/events.js";
import Shops from "./Components/Shops/shops.js";
import Landing from "./Components/Landing/landing.js";
import Footer from "./Components/Footer/footer.js";
import PrivateRoute from "./Utils/privateRoute.js"

const App = () => {
	return (
		<div className="App">
			<ToastContainer autoClose={2000} />
			<Switch>	
				<Route exact path="/" component={withRouter(Landing)} />
				<Route exact path="/events" component={withRouter(Events)} />
				<Route exact path="/shops" component={withRouter(Shops)} />
				<Route exact path="/footer" component={withRouter(Footer)} />
			</Switch>
		</div>
	)
}

export default App;
