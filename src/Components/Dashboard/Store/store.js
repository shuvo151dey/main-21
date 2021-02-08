import React, {useState, useEffect} from "react";
import {createContainer} from "unstated-next";
import {getRegisteredEvents, getComplaints} from "../../../Services/services.js";

const useStore = () => {
    const [userData, setData] = useState();
    const [regEvents, setRegEvents] = useState(null);
    const [complaints, setComplaints] = useState(null);
    const [token, setToken] = useState(null);

    const issues= {
        "Event Registration/Deregistration Issue" :{
            name: "Event Registration/Deregistration Issue",
            fields: {
                transaction_id: "",
                registerEvent: "",
                issue: ""
            },
            nature: "eventReg|Dereg"
        },
        "Others": {
            name: "Others",
            fields: {
                issue: ""
            },
            nature: "other"
        }
    }

    const loadEvents = async () => {
        let jwtToken = localStorage.getItem("token");
        let auth = {token: jwtToken};
        setToken(jwtToken);
        const data = await getRegisteredEvents(auth);
        //console.log(data);
        if(data === "error") return;
        setRegEvents({...data});
    }

    const loadComplaints = async () => {
        let jwtToken = localStorage.getItem("token");
        let data = {token: jwtToken}
        const complaints = await getComplaints(data);
        console.log(complaints);
        setComplaints(complaints);
    }

    useEffect(() => {
        if(regEvents === null) loadEvents();
        if(complaints === null) loadComplaints();
    })
    
    const setUserData = (userData, name, email, imageUrl) => {
        setData(userData);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("imageUrl", imageUrl);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setTimeout(function(){
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("imageUrl");
        }, 3500000);
    }
    return {userData, setUserData, regEvents, setRegEvents, token, loadEvents, issues, loadComplaints, complaints};
}

let Container = createContainer(useStore);
export default Container;
