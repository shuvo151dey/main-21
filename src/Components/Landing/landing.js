import React, {useState} from 'react';
import "../../Styles/landing.sass";
import bg from "../../Assets/Images/back-ground.png";
import LoginStall from "../../Assets/Images/loginreg stall.png";
import SponsStall from "../../Assets/Images/van.png"
import Residue from "../../Assets/Images/THEneededLANDINGPAGE.png";
import SF from "../../Assets/Images/SPRING FEST.png";
import LoginBoard from "../../Assets/Images/loginreg board.png";
import SponsBoard from "../../Assets/Images/3.png";
import ClickHere from "../../Assets/Images/clickhere typo.png"
import NavigateBoard from "../../Assets/Images/2.png";
import { Modal } from 'react-responsive-modal';
import AuthModal from "../Registration/index.js";
import Dashboard from "../Dashboard/dashboard.js";
import history from "../../routerHistory.js";
import CloseIcon from '@material-ui/icons/Close';

const customStyles={
    position: "fixed",
    width: "80%",
    height: "90%",
    left: "10%",
    top: "5%"
}

const Landing = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [dashboardModal, setDashboardModal] = useState(false);
    const closeIcon = (<CloseIcon style={{position: "absolute", top: "12px", color: "white", right: "20px", fontSize: "30px"}} />)

    return (
        <div className="landing-wrapper">
            <div className="landing-wrapper-bg"  style={{backgroundImage: `url(${Residue})`}}></div>
            <img src={SF} id="landing-page-sf" width="600px"/>
            <a target="_blank" href="https://sponsors.springfest.in/" rel="noopener"><img src={SponsBoard} id="landing-page-spons-board" /></a>
            <div 
                id="landing-page-login-board"
                onClick={() => {localStorage.getItem("token") ? setDashboardModal(true) : setLoginModal(true)}}
            >
                <img src={LoginBoard} />
                <span
                    style={{
                        fontSize: "34px",
                        zIndex: 4000,
                        display: "block",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -56%)",
                        position: "absolute",
                        fontWeight: "bolder",
                        fontFamily: "Antipasto"
                    }}
                >
                    {localStorage.getItem("token") ? "Dashboard" : "Login/Register"}
                </span>
            </div>
            <img src={ClickHere} id="landing-page-click-here" />
            <img src={NavigateBoard} id="landing-page-navigate" onClick={() => history.push("/shops")} />
            <Modal
                open={loginModal}
                center
                closeOnEsc
                closeOnOverlayClick
                showCloseIcon={true}
                closeIcon={closeIcon}
                styles={customStyles}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                onClose={() => setLoginModal(false)}
            >
                <AuthModal 
                    handleClose={() => setLoginModal(false)} 
                    openDashboard={() => {setDashboardModal(true); setLoginModal(false);}} 
                />
            </Modal>
            <Modal
                open={dashboardModal}
                center
                closeOnEsc
                closeOnOverlayClick={true}
                showCloseIcon={true}
                closeIcon={closeIcon}
                styles={customStyles}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                onClose={() => {setDashboardModal(false)}}
            >
                <Dashboard handleClose={() => setDashboardModal(false)} />
            </Modal>
        </div>
    )
}

export default Landing;