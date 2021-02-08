import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, InputAdornment, InputLabel, Select, FormControl, MenuItem} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Formik} from "formik";
import Recaptcha from "react-google-recaptcha";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import * as moment from 'moment';
import * as Yup from "yup";
import Container from "../Store/store";
import { toast } from 'react-toastify';
import {OptionField} from "../../Common/optionField.js"

const filter = createFilterOptions();

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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 340,
        textAlign: "left"
    }
}));

const Signup = () => {
    const Store = Container.useContainer();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [cpasswordVisible, setCPasswordVisible] = useState(false);
    const classes = useStyles();
    const date = new Date();
    const initialValues = {
        name: "",
        email: "",
        alt_email: "",
        password: "",
        cpassword: "",
        mobile: "",
        addr: "",
        city: "",
        refer: "",
        gender: "",
        state: "",
        yop: "",
        college: {},
        dob: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
        captcha: ""
    }
    const errMsg = "required field";
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


    const CreatableOptionField = ({value, setFieldValue, handleChange, handleBlur, options=[], name, label, error}) => {
        return (
            <Autocomplete 
                name={name}
                value={value}
                onBlur={handleBlur}
                onChange = {(event, newValue) => {
                    if(typeof newValue === "string"){
                        setFieldValue({label: newValue, value: newValue})
                    }
                    handleChange(event);
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    console.log(filtered);
                    if (params.inputValue !== '') {
                        filtered.push({
                            value: params.inputValue,
                            label: `Add "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.value) {
                        return option.value;
                    }
                    if(option.label) return option.label;
                    return "options loading";
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.label}
                freeSolo
                options={options}
                renderInput={(params) => (
                    <TextField error={error} {...params} label={label} variant="outlined" />
                )}
            />
        )
    }

    const register = async (values) => {
        
    }
    
    return (
        <div className="regModal_signup">
            <h2>SIGN UP</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(
                    {
                        email: Yup.string().email("invalid email").required(errMsg),
                        alt_email: Yup.string().email("invalid email"),
                        name: Yup.string().required(errMsg),
                        college: Yup.string().required(errMsg),
                        mobile: Yup.string().min(10).max(10).matches(phoneRegExp, "invalid mobile number").required(errMsg),
                        gender: Yup.string().required(errMsg),
                        dob: Yup.date().required(errMsg),
                        yop: Yup.string().required(errMsg),
                        por: Yup.string().required(errMsg),
                        addr: Yup.string().required(errMsg),
                        city: Yup.string().required(errMsg),
                        state: Yup.string().required(errMsg),
                        password: Yup.string().required(errMsg),
                        cpassword: Yup.string().required(errMsg).oneOf([Yup.ref('password'), null], "passwords do not match"),
                        captcha: Yup.string().required("captcha required")
                    }
                )}
                handleSubmit = {async (values, { props, setSubmitting, resetForm }) => {
                    register(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {props => {
                    const {values, touched, errors, isSubmitting, handleChange, handleBlur, setFieldValue, setFieldTouched} = props;
                    return (
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField 
                                name="name"
                                label = "Name"
                                variant = "outlined"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {!!errors.name && !!touched.name && <div className="signup_error">{errors.name}</div>}
                            <TextField 
                                name="email"
                                label = "email"
                                variant = "outlined"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.email && !!touched.email}
                            />
                            {!!errors.email && !!touched.email && <div className="signup_error">{errors.email}</div>}
                            <TextField 
                                name="alt_email"
                                label = "alternate email"
                                variant = "outlined"
                                value={values.alt_email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {!!errors.alt_email && !!touched.alt_email && <div className="signup_error">{errors.alt_email}</div>}
                            <TextField 
                                name="password"
                                label = "password"
                                variant = "outlined"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.password && !!touched.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <button
                                                className="password_toggle_icon"
                                                aria-label="toggle password visibility"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {!!errors.password && !!touched.password && <div className="signup_error">{errors.password}</div>}
                            <TextField 
                                name="cpassword"
                                label = "confirm password"
                                variant = "outlined"
                                value={values.cpassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.cpassword && !!touched.cpassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <button
                                                className="password_toggle_icon"
                                                aria-label="toggle password visibility"
                                                onClick={() => setCPasswordVisible(!cpasswordVisible)}
                                            >
                                                {cpasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {!!errors.cpassword && !!touched.cpassword && <div className="signup_error">{errors.cpassword}</div>}
                            <TextField 
                                name="mobile"
                                label = "mobile number"
                                variant = "outlined"
                                value={values.mobile}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.mobile && !!touched.mobile}
                            />
                            {!!errors.mobile && !!touched.mobile && <div className="signup_error">{errors.mobile}</div>}
                            <TextField 
                                name="addr"
                                label = "address"
                                variant = "outlined"
                                value={values.addr}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.addr && !!touched.addr}
                            />
                            {!!errors.addr && !!touched.addr && <div className="signup_error">{errors.addr}</div>}
                            <TextField 
                                name="city"
                                label = "city"
                                variant = "outlined"
                                value={values.city}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.city && !!touched.city}
                            />
                            {!!errors.city && !!touched.city && <div className="signup_error">{errors.city}</div>}
                            <TextField 
                                name="refer"
                                label = "referral code (if any)"
                                variant = "outlined"
                                value={values.refer}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!errors.refer && !!touched.refer}
                            />
                            {!!errors.refer && !!touched.refer && <div className="signup_error">{errors.refer}</div>}
                            <TextField 
                                name="dob"
                                label = "date of birth"
                                variant = "outlined"
                                value={values.dob}
                                onBlur={handleBlur}
                                error={!!errors.dob && !!touched.dob}
                                onChange={event => {
                                    console.log(event);
                                    handleChange(event);
                                }}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputComponent: ({value, ...props}) => {
                                        return (
                                            <input {...props} type="date" />
                                        )
                                    }
                                }}
                            />
                            {!!errors.dob && !!touched.dob && <div className="signup_error">{errors.dob}</div>}
                            <OptionField 
                                name="gender"
                                label="gender"
                                value={values.gender}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                options={Store.options.gender_options}
                                error={!!errors.gender && !!touched.gender}
                                className={classes.formControl}
                            />
                            {!!errors.gender && !!touched.gender && <div className="signup_error">{errors.gender}</div>}
                            <OptionField 
                                name="state"
                                label="state"
                                value={values.state}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                options={Store.options.state_options}
                                error={!!errors.state && !!touched.state}
                                className={classes.formControl}
                            />
                            {!!errors.state && !!touched.state && <div className="signup_error">{errors.state}</div>}
                            <OptionField 
                                name="yop"
                                label="year of graduation"
                                value={values.yop}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                options={Store.options.yop_options}
                                error={!!errors.yop && !!touched.yop}
                                className={classes.formControl}
                            />
                            {!!errors.yop && !!touched.yop && <div className="signup_error">{errors.yop}</div>}
                            <CreatableOptionField 
                                name="college"
                                label="college"
                                value={values.college}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                options={Store.options.college_options}
                                error={!!errors.college && !!touched.college}
                            />
                            {!!errors.college && !!touched.college && <div className="signup_error">{errors.college}</div>}
                            <div className="register-form-recaptcha">
                                <Recaptcha 
                                    sitekey="6Ldpbz0UAAAAAHWONmYJCv8nbMwG4w-htCr8iC1p"
                                    render="explicit"
                                    theme="dark"
                                    onChange={response => setFieldValue("captcha", response)}
                                    onExpired={() => toast.error("recaptcha expired", {position: toast.POSITION.TOP_RIGHT})}
                                />
                            </div>
                            {!!errors.captcha && !!touched.captcha && <div className="signup_error">{errors.captcha}</div>}
                            <Button className="reg_button" variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? "SIGNING UP" : "SIGN UP"}
                            </Button>
                        </form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Signup;