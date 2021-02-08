import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, InputAdornment} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GoogleIcon from "../../../Assets/Icons/google.svg";
import {googleLogin, facebookLogin, passwordLogin} from "../../../Services/services.js";
import {toast} from "react-toastify";
import history from "../../../routerHistory";
import Container from "../../Dashboard/Store/store.js";

const useStyles = makeStyles((theme) => ({
    root: {
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
        '& .MuiButtonBase-root': {
            width: 340,
            height: 60,
            borderRadius: 30,
            fontSize: 18,
            fontFamily: 'Helvetica',
            backgroundColor: 'rgba(63, 184, 232, 0.9)'
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
}));

const LoginForm = ({openDashboard}) => {
    const Store = Container.useContainer();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const classes = useStyles();

    const mailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const responseFacebook = async (response) => {
        if(!response.email){

        }
        else{
            let data = {
                email: response.email.trim(),
                token: response.accessToken,
                id: response.id
            }
            let userData = await facebookLogin(data);
            if(userData === "error"){
                toast.error("error signing in with facebook", {position: toast.POSITION.TOP_RIGHT});
                return;
            }
            console.log(userData);
            if(userData.message.reg_complete){
                await Store.setUserData(userData.message);
                toast.success("logged in successfully", {position: toast.POSITION.TOP_RIGHT});
                openDashboard();
            }
            else{
                toast.error("user registration not complete", {position: toast.POSITION.TOP_RIGHT})
            }
        }
    }

    const responseGoogle = async (response) => {
        console.log(response);
        let data = {token: response.tokenObj.id_token};
        const userData = await googleLogin(data);
        if(userData === "error"){
            toast.error("error signing in with google", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        console.log(userData);
        localStorage.setItem("userData", JSON.stringify(userData.message));
        if(userData.message.reg_complete){
            await Store.setUserData(userData.message, response.profileObj.name, response.profileObj.email, response.profileObj.imageUrl);
            toast.success("logged in successfully", {position: toast.POSITION.TOP_RIGHT});
            openDashboard();
        }
        else{
            toast.error("user registration not complete", {position: toast.POSITION.TOP_RIGHT})
        }
    }

    const handleLogin = async () => {
        setSubmitting(true);
        if(email.length === 0 || !email.match(mailRegEx) || password.length === 0){
            toast.error("email or passwords cannot be empty")
            setTimeout(function(){setSubmitting(false)}, 3000);
            setEmail("");
            setPassword("");
            return;
        }
        const userData = await passwordLogin({email: email, password: password});
        console.log(userData);
        setSubmitting(true);
        if(userData === "error"){
            toast.error("error signing in", {position: toast.POSITION.TOP_RIGHT});
            return;
        }
        if(userData.reg_complete === 1){
            await Store.setUserData(userData.message);
            toast.success("logged in successfully", {position: toast.POSITION.TOP_RIGHT});
            openDashboard();
        }
        else{
            toast.error("user registration not complete", {position: toast.POSITION.TOP_RIGHT})
        }
    }

    const handleLoginFailure = (type) => {
        toast.error("error signing in with " + type, {position: toast.POSITION.TOP_RIGHT})
    }

    const togglePassword = () => {setPasswordVisible(!passwordVisible)}

    return (
        <div className="regModal_login">
            <h2>LOG IN</h2>
            <div>
                <GoogleLogin
                    autoLoad={false}
                    clientId="1044912001209-9mrrflmkpiql43et0s3rivlcjbros1an.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps ) => (
                        <button onClick={renderProps.onClick} className="google_login">
                            <img src={GoogleIcon} width="30" alt="google icon" />
                            <span style={{lineHeight: "60px"}}>Login with Google</span>
                        </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={() => handleLoginFailure("google")}
                    isSignedIn={false}
                />
            </div>
            <div>
                <FacebookLogin
                    appId="1135456736527794"
                    autoLoad={false}
                    scope="name,email,picture.width(800).height(800)"
                    disableMobileRedirect={true}
                    onFailure={() => handleLoginFailure("facebook")}
                    callback={responseFacebook}
                    render={renderProps => (
                        <button className="facebook_login" onClick={renderProps.onClick}>
                            <i className="fa fa-facebook"></i>
                            <span>Login via Facebook</span>
                        </button>
                    )}
                />
            </div>
            <h3>EMAIL LOGIN</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    type="email"
                    label="Email" 
                    variant="outlined" 
                    error={!email.match(mailRegEx) && email.length > 0}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div 
                    className="signup_error" 
                    style={{display: (!email.match(mailRegEx) && email.length > 0) ? "inline-block" : "none"}}
                >
                    {(!email.match(mailRegEx) && email.length > 0) ? "Invalid Email" : ""}
                </div>
                <div 
                    className="signup_error"
                    style={{display: submitting && email.length === 0 ? "inline-block" : "none"}}
                >
                    {submitting && email.length === 0 ? "email cannot be empty" : ""}
                </div>
                <TextField
                    variant="outlined"
                    label="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <button
                                    className="password_toggle_icon"
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                >
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </InputAdornment>
                        )
                    }}
                />
                <div 
                    className="signup_error"
                >
                    {submitting && password.length === 0 ? "password can not be empty" : ""}
                </div>
                <Button onClick={handleLogin} disabled={submitting} variant="contained" color="primary">LOG IN</Button>
            </form>
        </div>
    )
}

export default LoginForm;