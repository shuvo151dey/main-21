import React, {useState} from 'react';
import Modal from 'react-modal';
import "../../Styles/registration.sass";
import Login from "./Components/login";
import Signup from "./Components/signup";
import SignupContainer from "./Store/store";
import DashboardContainer from "../Dashboard/Store/store.js"

const AuthModal = ({handleClose, openDashboard}) => {
    const [mode, setMode] = useState("login");

    return (
        <div className="regModal">
            <h1>SPRING FEST 2021</h1>
            <div className="regModal_wrapper">
                <DashboardContainer.Provider>
                    <Login openDashboard={openDashboard} />
                </DashboardContainer.Provider>
                <SignupContainer.Provider>
                    <Signup openDashboard={openDashboard} />
                </SignupContainer.Provider>
            </div>
        </div>
    )
}

export default AuthModal;