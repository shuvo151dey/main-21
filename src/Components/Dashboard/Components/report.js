import React, {useState} from 'react';
import {Formik, Form} from "formik";
import {OptionField} from "../../Common/optionField.js";
import Container from "../Store/store.js";
import {makeStyles, TextField, Button, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import * as Yup from "yup";
import {submitComplaint, cancelComplaint} from "../../../Services/services.js";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '340px',
            color: "white"
        },
        '& .MuiAutocomplete-root': {
            display: "inline-flex",
            justifyContent: "center"
        }
        ,
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
            color: 'rgba(63, 184, 232, 0.9)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgba(63, 184, 232, 0.9)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(63, 184, 232, 0.9)',
            },
        },
        '& .MuiFormGroup-root': {
            position: "relative",
            left: "calc(50% - 170px)"
        },
        '& .MuiSvgIcon-root': {
            color: "white"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 380,
        textAlign: "left",
        color: "white",
        '& .MuiFormLabel-root': {
            color: "white"
        },
        '& .MuiSvgIcon-root': {
            color: "white"
        },
        '& .MuiInputBase-root': {
            color: "white"
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "white"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(63, 184, 232, 0.9)',
            },
        }
    }
}));

const Report = ({closeModal}) => {
    const [issue, setIssue] = useState("");
    const Store = Container.useContainer();
    const classes = useStyles();
    const issues = [
        {value: "Event Registration/Deregistration Issue", label: "Event Registration/Deregistration Issue"}, 
        {value: "Others", label:  "Others"}    
    ];

    const complaint = async (values) => {
        if(!localStorage.getItem("token")){
            closeModal();
            toast.error("session expired");
            return;
        }
        values = JSON.parse(JSON.stringify(values));
        values.complaint_nature = Store.issues[issue].nature;
        values.token=Store.token;
        const res = await submitComplaint(values);
        if(res === "error"){
            toast.error("failed submitting complaint", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        else toast.success("complaint registered successfully", {position: toast.POSITION.TOP_RIGHT});
        await Store.loadComplaints();
        return;
    }

    const deleteComplaint = async (id, e) => {
        if(!localStorage.getItem("token")){
            closeModal();
            toast.error("session expired");
            return;
        }
        e.preventDefault();
        const sf_id = JSON.parse(localStorage.getItem("userData"))["id"]
        const token = {token: Store.token};
        const res = await cancelComplaint(id, token, sf_id);
        if(res == "error"){
            toast.error("failed cancelling complaint", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        else toast.success("complaint cancelled successfully", {position: toast.POSITION.TOP_RIGHT});
        await Store.loadComplaints;
        return;
    }

    const ComplaintCard = ({data}) => {
        return (
            <div className="dashboard-complaint-card">
                <div style={{display: "block", width: "60%", textAlign: "left"}}>
                    <div>ID: {data.id}</div>
                    <div>Issue: {data.issue}</div>
                    <div>Status: {data.status}</div>
                </div>
                <div style={{textAlign: "right", width: "40%"}}>
                    <button onClick={deleteComplaint.bind(this, data.id)}>Cancel Complaint</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="mainpanel-wrapper">
            <h1>REPORT AN ISSUE</h1>
            <OptionField 
                label="Type of Issue"
                value={issue}
                handleChange={(e) => setIssue(e.target.value)}
                className={classes.formControl}
                options={issues}
            />
            {
                issue === "" ?
                <div></div> :
                <Formik
                    initialValues={Store.issues[issue].fields}
                    validationSchema={Yup.object().shape({
                        transaction_id: Yup.string().required("Event name Required"),
                        issue: Yup.string().required("Issue Required"),
                        registerEvent: Yup.string().required("Click on any of the two")
                    })}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        console.log(values);
                        await complaint(values);
                        setSubmitting(false);
                        resetForm({});
                    }}
                >
                    {props => {
                        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                        return (
                            issue === "Others" ?
                            <Form className={classes.root} noValidate autoComplete="off">
                                <TextField 
                                    name="issue"
                                    label = "State Issue"
                                    variant = "outlined"
                                    value={values.issue}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {!!errors.issue && !!touched.issue && <div className="form_error">{errors.issue}</div>}
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    {isSubmitting ? "SUBMITTING" : "SUBMIT"}
                                </Button>
                            </Form>
                            :
                            <Form className={classes.root} noValidate autoComplete="off">
                                <TextField 
                                    name="transaction_id"
                                    label = "Event Name"
                                    variant = "outlined"
                                    value={values.transaction_id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {!!errors.transaction_id && !!touched.transaction_id && <div className="form_error">{errors.transaction_id}</div>}
                                <RadioGroup 
                                    name="registerEvent" 
                                    value={values.registerEvent} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <FormControlLabel 
                                        value="Not able to register for this event." 
                                        control={<Radio />} 
                                        label="Not able to register for this event." 
                                    />
                                    <FormControlLabel 
                                        value="De-registration or other issues." 
                                        control={<Radio />} 
                                        label="De-registration or other issues." 
                                    />
                                </RadioGroup>
                                {!!errors.registerEvent && !!touched.registerEvent && <div className="form_error">{errors.registerEvent}</div>}
                                <TextField 
                                    name="issue"
                                    label = "State Issue"
                                    variant = "outlined"
                                    value={values.issue}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {!!errors.issue && !!touched.issue && <div className="form_error">{errors.issue}</div>}
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    {isSubmitting ? "SUBMITTING" : "SUBMIT"}
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            }
            <div className="complaint-wrapper">
                <h1>YOUR COMPLAINTS</h1>
                {Store.complaints === null || Store.complaints === undefined ?
                    "loading complaints":
                    (<div>
                        {Store.complaints.length === 0 ?
                            "No Complaints Registered":
                            Store.complaints.map((item, index) => (
                                <ComplaintCard key={index} data={item} />
                            ))
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

export default Report;