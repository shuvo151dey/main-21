import {HTTP} from './config.js';
import axios from 'axios';
import {toast} from "react-toastify";
const headers = {"Content-Type":"application/json"};

export const getCollegeOptions = () => HTTP.get(
    "api/get_colleges", 
    {headers : headers}).then(
        response => {return response.data; }
    ).catch(err => {
        console.log(err);
        return null;
    })

export const googleLogin = data => 
    HTTP.post("api/user/login/google", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        //console.log(res);
        return res.data;
    })
    .catch(error => {
        return "error";
    });

export const facebookLogin = data =>
    HTTP.post("api/user/login/facebook", JSON.stringify(data), {
      headers: headers
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
        return "error";
    });

export const passwordLogin = data =>
    HTTP.post("api/user/login/password", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        } else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const getRegisteredEvents = data =>
    HTTP.post("api/user/get_registered_events", JSON.stringify(data), {
        headers: headers
    })
      .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        } 
        else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const deregisterMember = data =>
    HTTP.post("api/event/deregister_member", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        } 
        else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const deregisterTeam = data =>
    HTTP.post("api/event/deregister_team", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        } else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const submitComplaint = data =>
    HTTP.post("api/complaint/submit_complaint", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        }
        else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });
  
export const getComplaints = data =>
    HTTP.post("api/user/get_complaints", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            return res.data.message;
        } else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const cancelComplaint = data =>
    HTTP.post("api/user/cancel_complaint", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
            return res.data.message;
        } 
        else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });


// APIs RELATED TO EVENTS PAGE
export const getAllEventDetails = () =>
    HTTP.get("api/event/get_all_event_details")
    .then(res => {
        if (res.data.code === 0) return res.data.message;
        else {
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const getMembers = data =>
    HTTP.post("api/event/get_members", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) return res.data.message;
        else if (res.data.code === -1) {
            //toast.error("You are not the leader! Only leader can add a new member.");
            return "error";
        } 
        else {
            //toast.error("Network error! Please try again.");
            return "error";
        }
    })
    .catch(error => {
        return "error";
    });

export const eventRegister = data =>
    HTTP.post("api/event/register", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            toast.success(res.data.message);
            return res.data.message;
        } else if (res.data.code === -4) {
            toast.error("Participant/s already registered For this event.");
            return "error";
        } else if (res.data.code === -5) {
            toast.error("Invalid member details. Enter valid SF ID - Email of members.");
            return "error";
        } else if (res.data.code === -2) {
            toast.error("Network error! Please try again.");
            return "error";
        } else {
            toast.error(res.data.message);
            return "error";
        }
    })
    .catch(error => {
        toast.error("Network error! Please try again.");
        return "error";
    });
  
export const probableRegister = data =>
    HTTP.post("api/event/probable_register", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            toast.success(res.data.message);
            return res.data.message;
        } else {
            toast.error(res.data.message);
            return "error";
        }
    })
    .catch(error => {
        toast.error(error);
        return "error";
    });

export const addMember = data =>
    HTTP.post("api/event/add_member", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if (res.data.code === 0) {
            toast.success(res.data.message);
            return res.data.message;
        } else if (res.data.code === -6) {
            toast.error("Team Size Requirement Not Fulfilled.");
            return "error";
        } else if (res.data.code === -8) {
            toast.error("You Need to be the Leader to Add Members.");
            return "error";
        } else if (res.data.code === -3) {
            toast.error(res.data.message);
            return "error";
        } else {
            toast.error("Network Error! Please try again.");
            return "error";
        }
    })
    .catch(error => {
        toast.error("Network Error! Please try again.");
        return "error";
    });

export const submitLink = data =>
    HTTP.post("api/user/submission", JSON.stringify(data), {
        headers: headers
    })
    .then(res => {
        if(res.data.code === 0){
            return res.data.message;
        }
        else return "error";
    })
    .catch(error => {
        return "error";
    })