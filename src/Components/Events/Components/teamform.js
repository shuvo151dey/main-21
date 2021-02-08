import React, {useState, useEffect} from 'react';
import {Formik, Form} from "formik";
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from "@material-ui/core";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import {getMembers, eventRegister, probableRegister, deregisterMember, deregisterTeam, addMember, submitLink} from "../../../Services/services.js";
import DynamicForm from "../../Common/dynamicForm.js";
import Container from "../Store/store";
import history from "../../../routerHistory.js";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        '& > *': {
            margin: theme.spacing(1),
            width: '340px',
            color: "white"
        },
        '& .MuiTextField-root': {
            color: "white"
        },
        '& .MuiFormLabel-root': {
            color: "white"
        },
        '& .MuiInput-input': {
            color: "white",
            width: 340,
            fontSize: 18,
        },
        '& .MuiInputBase-root': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: '#3F51B5',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#3F51B5',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3F51B5',
            },
        },
        '& .MuiFormGroup-root': {
            position: "relative",
            left: "calc(50% - 170px)"
        },
        '& .MuiSvgIcon-root': {
            color: "white"
        },
        '& .MuiButton-label': {
            color: "white"
        }
    }
}));

const TeamForm = ({data}) => {
    const [memberCount, setMemberCount] = useState(0);
    const [members, setMembers] = useState(null);
    const [isSoloRegistered, setSoloRegistered] = useState(null);
    const [isGroupRegistered, setGroupRegistered] = useState(null);
    const [showGroupForm, setGroupForm] = useState(false);
    const [registeringSelf, setRegisteringSelf] = useState(false);
    const [registeringGroup, setRegisteringGroup] = useState(false);
    const [registerTeamMode, setRegTeamMode] = useState(null);
    const [submittingLink, setSubmittingLink] = useState(null);

    const classes = useStyles();
    const Store = Container.useContainer();

    const loadMembers = async () => {
        if(!localStorage.getItem("token")){
            return;
        }
        const userData = JSON.parse(localStorage.getItem("userData"));
        const reqData = {
            token: userData["token"],
            event_id: data.id
        }
        const res = await getMembers(reqData);
        if(res === "error"){
            setMembers([{sf_id: userData.sf_id, email: userData.email}]);
        }
        else setMembers(res);
    }

    useEffect(() => {
        if(members === null){
            loadMembers();
        }
        if(Store.registeredEvents != null && Store.registeredEvents != undefined){
            console.log(Store.registeredEvents);
            if(Store.registeredEvents.solo.includes(data.event) || Store.registeredEvents.probable.includes(data.event)){
                console.log("solo registered")
                setSoloRegistered(true);
            }
            else setSoloRegistered(false);
            if(Store.registeredEvents.group.includes(data.event)) {
                setGroupRegistered(true);
            }
            else{
                //setSoloRegistered(false);
                setGroupRegistered(false);
            }
        }
    })


    const registerSelf = async () => {
        if(!localStorage.getItem("token")){
            history.push("/");
            toast.error("session expired");
            return;
        }
        setRegisteringSelf(true);
        setGroupForm(false);
        let sent_data = {
            event_id: data.id,
            token: JSON.parse(localStorage.getItem("userData"))["token"]
        }
        let res;
        if(data.is_group === 1){
            res=await probableRegister(sent_data);
        }
        else{
            res = await eventRegister(sent_data);
        }
        if(res === "error"){
            setRegisteringSelf(false);
            setSoloRegistered(false);
        }
        else{
            setRegisteringSelf(false);
            setSoloRegistered(true);
        }
        Store.loadRegisteredEvents();
    }

    const deregisterSelf = async () => {
        if(!localStorage.getItem("token")){
            history.push("/");
            toast.error("session expired");
            return;
        }
        setRegisteringSelf(true);
        setGroupForm(false);
        let res;
        if(data.is_group === 1){
            if(!Store.registeredEvents.probable.includes(data.event)){
                let group_id;
                Store.registeredEvents.group_details.map((event, index) => {
                    if(event.event_id === data.id){
                        group_id = event.group_id;
                        return null;
                    }
                });
                let sent_data = {
                    event_id: data.id,
                    token: JSON.parse(localStorage.getItem("userData"))["token"],
                    type:"group",
                    group_id: group_id
                }
                res = await deregisterMember(sent_data);
            }
            else{
                let sent_data = {
                    event_id: data.id,
                    token: JSON.parse(localStorage.getItem("userData"))["token"],
                    type:"probable"
                }
                res = await deregisterMember(sent_data);
            }
        }
        else{
            let sent_data = {
                event_id: data.id,
                token: JSON.parse(localStorage.getItem("userData"))["token"],
                type:"probable"
            }
            res = await deregisterMember(sent_data);
        }
        if(res === "error"){
            setRegisteringSelf(false);
            setSoloRegistered(true);
        }
        else{
            setRegisteringSelf(false);
            setSoloRegistered(false);
        }
        Store.loadRegisteredEvents();
    }

    const regTeam = async (response) => {
        if(!localStorage.getItem("token")){
            history.push("/");
            toast.error("session expired");
            return;
        }
        var sent_values = JSON.parse(JSON.stringify(response));
        sent_values.token = JSON.parse(localStorage.getItem("userData"))["token"];
        sent_values.event_id = data.id
        let res;
        if(registerTeamMode === 1) res = await eventRegister(sent_values);
        else if(registerTeamMode === 1) res = await addMember(sent_values);
        else return;
        
        if(res === "error") return;
        setGroupForm(false);
        setGroupRegistered(true);
        setRegTeamMode(0);
        setSoloRegistered(true);
        Store.loadRegisteredEvents();
    }


    const deregTeam = async () => {
        if(!localStorage.getItem("token")){
            history.push("/");
            toast.error("session expired");
            return;
        }
        setRegisteringGroup(true);
        let group_id;
        Store.registeredEvents.group_details.map((event, index) => {
            if(event.event_id === data.id){
                group_id = event.group_id;
                return null;
            }
        });
        let sent_data = {
            event_id: data.id,
            token: JSON.parse(localStorage.getItem("userData"))["token"],
            group_id: group_id
        }
        let res = await deregisterTeam(sent_data)
        setGroupRegistered(false);
        setRegisteringGroup(false);
        setSoloRegistered(true);
        if(res === "error") return;
        Store.loadRegisteredEvents();
    }

    const Submission = () => {
        const urlRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
        return (
            <Formik
                initialValues={{link: ""}}
                validationSchema ={Yup.object().shape({
                    link: Yup.string().required("url is required").matches(urlRegex, "Invalid URL!!")
                })}
                onSubmit = {async (values, {setSubmitting}) => {
                    if(!localStorage.getItem("token")){
                        history.push("/");
                        toast.error("session expired");
                        return;
                    }
                    const sent_data = {
                        submit_link: values.link,
                        token: localStorage.getItem("token"),
                        event_id: data.id
                    }
                    const res = await submitLink(sent_data);
                    if(res === "error") {
                        toast.error("could not submit link");
                        return;
                    }
                    toast.success(res);
                    return;
                }}
            >
                {props => {
                    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                    return (
                        <Form style={{width: "100%", display:"flex"}} className={classes.root}>
                            <TextField 
                                name="link"
                                label = "paste URL"
                                variant = "outlined"
                                value={values.link}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.link && !!touched.link}
                            />
                            <Button
                                variant="contained" 
                                color="primary"
                                disabled={submittingLink}
                                style={{width: "30%"}}
                            >
                                {submittingLink ? "SUBMITTING" : "SUBMIT"}
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        )
    }

    return (
        <div className="event-register-form-wrapper">
            {((data.is_group && isGroupRegistered) || (!data.is_group && isSoloRegistered)) ? <Submission /> : ""}
            <div className={classes.root}>
                {isSoloRegistered ? (
                    <Button style={{backgroundColor: "#3f51b5", height: 50}} onClick={deregisterSelf} disabled={registeringSelf}>
                        {registeringSelf ? "DEREGISTERING" : "DEREGISTER MYSELF"}
                    </Button>
                ) : (
                    <Button style={{backgroundColor: "#3f51b5", height: 50}} onClick={registerSelf} disabled={registeringSelf}>
                        {registeringSelf ? "REGISTERING" : "REGISTER MYSELF"}
                    </Button>
                )}
            </div>
            <div className={classes.root} style={{marginBottom: "20px"}}>
                {!isGroupRegistered ? (
                    <Button style={{backgroundColor: "#3f51b5", height: 50}} onClick={() => {setGroupForm(true); setRegTeamMode(1)}}>
                        {registeringGroup ? "REGISTERING" : "REGISTER TEAM"}
                    </Button>
                ) : (
                    <div style={{display: "grid", textAlign: "center", margin: "10px auto"}}>
                        <Button style={{backgroundColor: "#3f51b5", height: 50, marginBottom: "15px"}} onClick={deregTeam}>
                            {registeringGroup ? "DEREGISTERING" : "DEREGISTER TEAM"}
                        </Button>
                        <Button style={{backgroundColor: "#3f51b5", height: 50, marginBottom: "20px"}} onClick={() => {setGroupForm(true); setRegTeamMode(2)}}>
                            ADD MEMBER
                        </Button>
                    </div>
                )}
            </div>
            {showGroupForm ? (
                <div>
                    <Formik
                        initialValues={{ no_of_participants: "" }}
                        validationSchema={Yup.object().shape({
                            no_of_participants: Yup.number()
                                .moreThan(
                                    data.min_participation - 1,
                                    `No of participants should be more than ${data.min_participation - 1}`
                                )
                                .required("Required")
                                .lessThan(
                                    data.max_participation + 1,
                                    `No of participants should be less than ${data.max_participation + 1}`
                                )
                        })}
                        onSubmit={values => {
                            setMemberCount(values.no_of_participants);
                            console.log(values);
                        }}
                    >
                        {props => {
                            const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
                            return (
                                <Form className={classes.root}>
                                    <TextField 
                                        id="no_of_participants"
                                        label="Enter no of participants (including you)"
                                        variant="outlined"
                                        type="number"
                                        name="no_of_participants"
                                        value={values.no_of_participants || ""}
                                        onChange={handleChange}
                                        onBlur={handleSubmit}
                                        error={errors.no_of_participants && touched.no_of_participants}
                                    />
                                    {errors.no_of_participants && touched.no_of_participants && (
                                        <div className="form_error" style={{color: "white"}}>
                                            {errors.no_of_participants}
                                        </div>
                                    )}
                                </Form>
                            )
                        }}
                    </Formik>
                    {memberCount > 0 ? (
                        <DynamicForm 
                            count={memberCount}
                            members={members || []}
                            handleSubmit={regTeam}
                        />
                    ): ""}
                </div>
            ): ""}
        </div>
    )
}

export default TeamForm;