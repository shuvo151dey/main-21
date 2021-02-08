import React, {useState} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import {withRouter} from 'react-router';
import SFLogo from "../../Assets/Logo/logo.png";
import {makeStyles} from "@material-ui/core/styles";
import {Button, InputAdornment} from "@material-ui/core";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import ReactImageFallback from "react-image-fallback";
import Avatar from "../../Assets/Images/avatar.png";
import "../../Styles/dashboard.sass";

import DashboardContainer from "./Store/store.js";

import Dashboard from "./Components/dashboard.js";
import Report from "./Components/report.js";
import Profile from "./Components/profile.js";

import history from "../../routerHistory.js";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 50,
        padding: '0',
        width: "100%",
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            color: "white"
        },
        '& .MuiButton-text': {
            padding: 0
        },
        '& .MuiButton-label': {
            margin: 0,
            height: 50,
            justifyContent: "left"
        },
        '& .MuiTouchRipple-root': {
            margin: 0,
            height: 50
        }
    },
    textPrimary: {
        color: "white"
    },
    textSecondary: {
        color: "blue"
    }
}))

const DashboardPanel = ({handleClose}) => {
    const classes = useStyles();
    const [currPage, setCurrPage] = useState("Dashboard")
    const addEvent = () => {
        var event = {
            'summary': 'Spring Fest 2021',
            'location': 'IIT Kharagpur',
            'description': 'A chance to reminisce the good ol\' days',
            'start': {
                'dateTime': '2021-01-30T07:20:50.52',
                'timeZone': 'Asia/Kolkata'
            },
            'end': {
                'dateTime': '2021-01-31T07:20:50.52',
                'timeZone': 'Asia/Kolkata'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'lpage@example.com'},
                {'email': 'sbrin@example.com'}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        ApiCalendar.createEvent(event, "primary")
            .then((data) => {console.log("successful", data)})
            .catch(err => {console.log("error", err.result.error.errors)});
    }
    const pages = ["Dashboard", "Profile", "Report", "Exclusive"]
    const icons = {
        "Dashboard" : DashboardRoundedIcon,
        "Profile": AccountBoxRoundedIcon,
        "Report": ReportRoundedIcon,
        "Exclusive": LoyaltyRoundedIcon
    }
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    let sf_id;
    try{
        sf_id= JSON.parse(localStorage.getItem("userData"))["sf_id"];
    }
    catch{
        sf_id = "";
    }
    const imageUrl = localStorage.getItem("imageUrl");

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const date = new Date();

    const pageMap = {
        "Dashboard": Dashboard,
        "Profile": Profile,
        "Report": Report
    }

    const DashboardPage = () => {
        const Component = pageMap[currPage];
        return <Component closeModal={handleClose} />
    }

    const logout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("imageUrl");
        handleClose();
        toast.success("logged out successfully");
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-navbar">
                <div style={{width: "100%", display: "flex"}}>
                    <img src={SFLogo} width="44" height="44" />
                    <span style={{height: "44px", lineHeight: "44px", marginLeft: "auto", fontSize: "28px", fontFamily: "inherit", marginRight: "10px"}}>Spring Fest</span>
                </div>
                <div className="navitem-wrapper">
                    {pages.map((page, index) => {
                        let Icon = icons[page];
                        return (
                            <Button onClick={() => setCurrPage(page)} className={classes.root} style={{backgroundColor: (currPage === page) ? "#713BDB" : "transparent"}}>
                                <Icon style={{color: "white"}} />
                                <span style={{color: "white"}}>{page}</span>
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="dashboard-mainbar">
                <div style={{width: "100%", display: "flex", maxHeight: "50px"}}>
                    <span style={{lineHeight: "50px", fontSize: "30px"}}>{currPage}</span>
                    <span style={{marginLeft: "auto", lineHeight: "50px"}}>
                        {days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}
                    </span>
                </div>
                <DashboardContainer.Provider>
                    <DashboardPage />
                </DashboardContainer.Provider>
            </div>
            <div className="dashboard-eventbar">
                <div style={{width: "80%", display: "flex", padding: "12px", position: "relative", top: "45px", margin: "0 auto"}} onClick={logout}>
                    <span style={{lineHeight: "26px"}}>Logout</span>
                    <span style={{marginLeft: "auto", marginRight: "30px"}}>
                        <ExitToAppRoundedIcon />
                    </span>
                </div>
                <div className="profilebar">
                    <ReactImageFallback 
                        src={imageUrl || ""}
                        fallbackImage={Avatar}
                        initialImage={Avatar}
                        className="profilepic"
                    />
                    <span className="name">{name}</span>
                    <span className="email">{sf_id}</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(DashboardPanel);