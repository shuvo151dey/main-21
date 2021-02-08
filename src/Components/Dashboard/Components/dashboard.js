import React from 'react';
import Container from "../Store/store.js";
import { makeStyles, Grid } from '@material-ui/core';
import {deregisterMember, deregisterTeam} from "../../../Services/services.js";
import {toast} from "react-toastify";
import history from "../../../routerHistory.js";

const useStyles = makeStyles(
    (theme) => ({
        root: {
            flexGrow: 1,
            justifyContent: 'center'
        },
        control: {
            padding: theme.spacing(2)
        },
        grid: {
            '& .MuiGrid-root': {
                justifyContent: 'center'
            }
        }
    })
);

const Dashboard = ({closeModal}) => {
    const Store = Container.useContainer();
    const classes = useStyles();

    const deregister = async (eventID, e) => {
        if(!localStorage.getItem("token")){
            closeModal();
            toast.error("session expired");
            return;
        }
        e.preventDefault();
        let data = {
            event_id: eventID,
            token: Store.token,
            type: "solo"
        };
        const res = await deregisterMember(data);
        if(res === "error"){
            toast.error("could not deregister. try again!", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        toast.success("successfully deregistered", {position: toast.POSITION.TOP_RIGHT})
        Store.loadEvents();
    }

    const deregisterSelf = async (eventID, groupID, e) => {
        if(!localStorage.getItem("token")){
            closeModal();
            toast.error("session expired");
            return;
        }
        e.preventDefault();
        let data = {
            event_id: eventID,
            token: Store.token,
            type: "group",
            group_id: groupID
        };
        const res = await deregisterMember(data);
        if(res === "error"){
            toast.error("could not deregister. try again!",{position: toast.POSITION.TOP_RIGHT});
            return;
        }
        toast.success("successfully deregistered", {position: toast.POSITION.TOP_RIGHT})
        Store.loadEvents();
    }

    const deregisterTeam = async (eventID, groupID, e) => {
        if(!localStorage.getItem("token")){
            closeModal();
            toast.error("session expired");
            return;
        }
        e.preventDefault();
        let data = {
            event_id: eventID,
            token: Store.token,
            type: "group",
            group_id: groupID
        };
        const res = await deregisterTeam(data);
        if(res === "error"){
            toast.error("could not deregister team. try again!", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        toast.success("successfully deregistered team", {position: toast.POSITION.TOP_RIGHT})
        Store.loadEvents();
    }

    const RegCard = ({name, events, type}) => {
        return (
            <div className="dashboard-regevent">
                <h1>{name}</h1>
                {events === "" || events === undefined || events===null || !Array.isArray(events[type]) ?
                    "loading events":
                    <div>
                        {
                            events[type].length === 0 ?
                            "No Registered Events" :
                            events[type].map((event, index) => (
                                <div className="dashboard-regevent-list" style={{display: type==="group" ? "flex" : "flex"}}>
                                    <span>{event.event_name}</span>
                                    {type === "group" ? 
                                        <div style={{display: "grid"}}>
                                            <button style={{width: "100%"}} onClick={deregisterSelf.bind(this, event.event_id, event.group_id)}>Deregister Myself</button>
                                            <button style={{width: "100%"}} onClick={deregisterTeam.bind(this, event.event_id, event.group_id)}>Deregister Team</button>
                                        </div>
                                        :
                                        <button onClick={deregister.bind(this, event.event_id)}>Deregister</button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="mainpanel-wrapper">
            <h1>REGISTERED EVENTS</h1>
            <Grid container spacing={3} className={classes.root}>
                <Grid item className={classes.grid} key={0}>
                    <RegCard name={"Solo Events"} type={"solo"} events={Store.regEvents} />
                </Grid>
                <Grid item className={classes.grid} key={1}>
                    <RegCard name={"Probable Events"} type={"probable"} events={Store.regEvents} />
                </Grid>
                <Grid item className={classes.grid} key={2}>
                    <RegCard name={"Group Events"} type={"group"} events={Store.regEvents} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;