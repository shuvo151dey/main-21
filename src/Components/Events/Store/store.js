import React, {useEffect, useState} from 'react';
import {createContainer} from "unstated-next";
import {getAllEventDetails, getRegisteredEvents} from "../../../Services/services.js";
import {toast} from "react-toastify";

const useStore = () => {
    const [eventGenresList, setEventGenresList] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState(null);

    const loadGenresList = async () => {
        const res = await getAllEventDetails();
        setEventGenresList(res);
    }

    const loadRegisteredEvents = async () => {
        let group = [], solo = [], group_details = [], probable = [];
        let data = {
            token: localStorage.getItem("token")
        }
        let res = await getRegisteredEvents(data);
        console.log(res);
        if(res === "error"){
            //toast.error("error loading registered events");
            setRegisteredEvents(null);
            return;
        }
        res.group.map((event, index) => {
            group.push(event.event_name);
            group_details.push(event);
            return null;
        })
        res.solo.map((event, index) => {
            solo.push(event.event_name);
            return null;
        })
        res.probable.map((event, index) => {
            probable.push(event);
            return null;
        })
        setRegisteredEvents({
            group: group,
            solo: solo,
            group_details: group_details,
            probable: probable
        })
    }

    useEffect(() => {
        if(eventGenresList == null){
            loadGenresList();
        }
        if(registeredEvents == null){
            loadRegisteredEvents();
        }
    })

    return {eventGenresList, loadGenresList, registeredEvents, loadRegisteredEvents};
}

let Container = createContainer(useStore);
export default Container;