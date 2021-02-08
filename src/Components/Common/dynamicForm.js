import React, {useState, useEffect} from 'react';
import {Formik, Form, ErrorMessage, FieldArray} from "formik";
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from "@material-ui/core";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 380,
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
            width: 380,
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

const DynamicForm = ({count, members, handleSubmit}) => {
    const classes = useStyles();
    const [values, setValues] = useState([]);

    const loadMembers = () => {
        let fields = [];
        let col = count - members.length;
        console.log(members, count);
        members.map((member, index) => {
            fields.push({
                sf_id: member.sf_id,
                email: member.email
            })
        })
        for (let i = 0; i < col; i++){
            fields.push({
                sf_id: "",
                email: ""
            })
        }
        console.log(fields);
        setValues(fields);
    }
    useEffect(() => {
        loadMembers();
    }, [count])
    
    return (
        <Formik
            initialValues={{event_reg: values}}
            enableReinitialize
            validationSchema={Yup.object().shape({
                event_reg: Yup.array().of(
                    Yup.object().shape({
                        sf_id: Yup.string().required("Required"),
                        email: Yup.string().email("invalid email").required("Required")
                    })
                )
            })}
            onSubmit={(values, {setSubmitting}) => {
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {props => {
                let { values, handleChange, handleBlur, isSubmitting } = props;
                return (
                    <Form className={classes.root} style={{marginTop: 20}}>
                        <FieldArray
                            name="event_reg"
                            render={arrayHelpers => (
                                <div className="dynamic-form">
                                    {values.event_reg.map((x, index) => (
                                        <div key={index} style={{width: "100%", display: "flex", marginBottom: "20px", justifyContent: "space-around"}}>
                                            <div style={{width: "48%"}}>
                                                <TextField 
                                                    name={`event_reg.${index}.sf_id`}
                                                    variant='outlined'
                                                    label={"sf id of participant " + (index+1)}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={x.sf_id}
                                                />
                                                <ErrorMessage
                                                    name={`event_reg.${index}.sf_id`}
                                                    component="div"
                                                    className={"form_error"}
                                                />
                                            </div>
                                            <div style={{width: "48%"}}>
                                                <TextField 
                                                    name={`event_reg.${index}.email`}
                                                    variant='outlined'
                                                    label={"email of participant " + (index+1)}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={x.email}
                                                />
                                                <ErrorMessage
                                                    name={`event_reg.${index}.email`}
                                                    component="div"
                                                    className={"form_error"}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained" 
                            color="primary"
                            style={{marginBottom: 30, height: 50}}
                        >   
                            {isSubmitting ? "SUBMITTING" : "SUBMIT"}
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default DynamicForm;