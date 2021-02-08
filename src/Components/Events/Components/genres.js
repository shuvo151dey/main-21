import React, {useState} from 'react';
import Container from "../Store/store.js";
import GenreBG from "../../../Assets/Images/back-ground.png";
import Shop1 from "../../../Assets/Images/shop1.png";
import Shop2 from "../../../Assets/Images/shop2.png";
import Shop3 from "../../../Assets/Images/shop3.png";
import red_flag from "../../../Assets/Images/red-flag.png";
import yellow_flag from "../../../Assets/Images/yellow-flag.png";
import Text1 from "../../../Assets/Images/about-us-text.png";
import Text2 from "../../../Assets/Images/events-text.png";
import Text3 from "../../../Assets/Images/testimonials-text.png";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TeamForm from "./teamform.js";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 70,
        padding: '0',
        width: "100%",
        backgroundColor: "black",
        marginBottom: 20,
        fontSize: 20,
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
            height: 70,
            justifyContent: "left"
        },
        '& .MuiTouchRipple-root': {
            margin: 0,
            height: 70
        }
    },
    textPrimary: {
        color: "white"
    },
    textSecondary: {
        color: "blue"
    }
}))

const customStyles={
    position: "fixed",
    width: "80%",
    height: "90%",
    left: "10%",
    top: "5%"
}

const Genres = () => {
    const classes = useStyles();
    const [genreIndex, setGenreIndex] = useState(0);
    const [eventIndex, setEventIndex] = useState(0);
    const [modal, setModal] = useState(false);
    const Store = Container.useContainer();

    const About = ({data}) => {
        return (
            <div className="event-about">
                <p>{data}</p>
            </div>
        )
    }

    const Rules = ({rules}) => {
        return (
            <div className="event-rules">
                {rules.map((rule, index) => {
                    return (
                        <div key={index}>
                            <h3>{rule.type}</h3>
                            <ul>
                                {rule.rules.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })} 
            </div>
        )
    }

    const Register = ({data}) => {
        return (
            <div className="event-register">
                <TeamForm data={data} />
            </div>
        )
    }

    const TabComponent = () => {
        if(Store.eventGenresList){
            const data = Store.eventGenresList[genreIndex].events[eventIndex];
            return (
                <div style={{height: "calc(100% - 48px)", width: "70%", margin: "0 auto 60px auto"}}>
                    <div style={{width: "100%", textAlign: "center"}}>
                        <h1 style={{fontSize: "50px", letterSpacing: "2px"}}>{data.event}</h1>
                        <h1>{data.tagline}</h1>
                    </div>
                    <h2>About</h2>
                    <About data={data.writeup} />
                    <h2>Rules</h2>
                    <Rules rules={data.rules} />
                    <h2>Register</h2>
                    <Register data={data} />
                    <div style={{display: "block", height: "100px"}}></div>
                </div>
            )
        }
        else return "";
    }

    const closeIcon = (<CloseIcon style={{position: "absolute", top: "12px", color: "white", right: "20px", fontSize: "30px"}} />)

    return (
        <div className="genre-wrapper">
            <div className="genre-wrapper-bg"  style={{backgroundImage: `url(${GenreBG})`}}></div>
            <img className="genre-wrapper-stall" id="events-stall-left" src={Shop1} width="580px" />
            <img className="genre-wrapper-stall" id="events-stall-right" src={Shop3} />
            <img className="genre-wrapper-stall" id="events-stall" src={Shop2} />
            <img className="events-stall-banner" id="events-stall-banner-left" src={Text1} width="260px" />
            <img className="events-stall-banner" id="events-stall-banner-right" src={Text3} width="340px" />
            <img className="events-stall-banner" id="events-stall-banner" src={Text2} width="190px" />
            <div className="genre-flags-wrapper">
                {
                    Store.eventGenresList !== null && Store.eventGenresList !== undefined && Array.isArray(Store.eventGenresList) ? 
                    Store.eventGenresList.slice(0, 9).map((item, index) => {
                        return (
                            <div key={index} id={"flag-" + (index + 1)} className="genre-flags" onClick={() => {setGenreIndex(index); setModal(true)}}>
                                <img src={index < 5 ? red_flag : yellow_flag} width="97" />
                                <span>{item.category}</span>
                            </div>
                        )
                    })
                    :
                    ""
                }
            </div>
            <Modal
                open={modal}
                center
                closeOnEsc
                closeOnOverlayClick
                closeIcon={closeIcon}
                showCloseIcon={true}
                styles={customStyles}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                onClose={() => setModal(false)}
            >
                <div className="event-modal-wrapper">
                    <div className="event-modal-navbar">
                        <div style={{width: "100%", marginTop: "30%"}}>
                            {
                                Store.eventGenresList !== null && Store.eventGenresList !== undefined && Array.isArray(Store.eventGenresList) ?
                                Store.eventGenresList[genreIndex].events.map((event, index) => (
                                    <Button 
                                        key={index}
                                        className={classes.root} 
                                        onClick={() => setEventIndex(index)}
                                        style={{backgroundColor: (index === eventIndex) ? "#713BDB": "black"}}
                                    >
                                        <span style={{marginLeft: "20px"}}>{event.event}</span>
                                    </Button>
                                )):
                                ""
                            }
                        </div>
                    </div>
                    <div className="event-modal-mainbar">
                        <TabComponent />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Genres;