import React, {useState} from 'react';
import GenreBG from "../../Assets/Images/back-ground.png";
import Shop1 from "../../Assets/Images/shop1.png";
import Shop2 from "../../Assets/Images/shop2.png";
import Shop3 from "../../Assets/Images/shop3.png";
import Text1 from "../../Assets/Images/about-us-text.png";
import Text2 from "../../Assets/Images/events-text.png";
import Text3 from "../../Assets/Images/testimonials-text.png";
import Board1 from "../../Assets/Images/board.png";
import Board2 from "../../Assets/Images/testimonial-board.png"
import "../../Styles/shops.sass";
import history from "../../routerHistory";
import cloud from "../../Assets/Images/cloud.png";
import { Modal } from 'react-responsive-modal';

const customStyles={
    position: "fixed",
    width: "80%",
    height: "90%",
    left: "10%",
    top: "5%"
}

const Shops = () => {
    const [aboutModal, setAboutModal] = useState(false);
    const [testiModal, setTestiModal] = useState(false);
    const animateAboutUs = () => {
        let leftStall = document.getElementById("events-stall-left")
        let middleStall = document.getElementById("events-stall");
        let rightStall = document.getElementById("events-stall-right");

        let leftStallBanner = document.getElementById("events-stall-banner-left")
        let middleStallBanner = document.getElementById("events-stall-banner");
        let rightStallBanner = document.getElementById("events-stall-banner-right");

        
        middleStall.classList.add("aboutus-animation-middle-stall");
        rightStall.classList.add("aboutus-animation-right-stall");
        leftStall.classList.add("aboutus-animation-left-stall");
        middleStall.classList.remove("aboutus-animation-middle-stall-rev");
        rightStall.classList.remove("aboutus-animation-right-stall-rev");
        leftStall.classList.remove("aboutus-animation-left-stall-rev");

        
        leftStallBanner.classList.add('aboutus-animation-left-stall-banner');
        middleStallBanner.classList.add("aboutus-animation-middle-stall-banner");
        rightStallBanner.classList.add("aboutus-animation-right-stall-banner");
        leftStallBanner.classList.remove('aboutus-animation-left-stall-banner-rev');
        middleStallBanner.classList.remove("aboutus-animation-middle-stall-banner-rev");
        rightStallBanner.classList.remove("aboutus-animation-right-stall-banner-rev");
        setTimeout(function(){
            setAboutModal(true);
        }, 2000);
    }

    const undoAboutUs = () => {
        setAboutModal(false);
        let leftStall = document.getElementById("events-stall-left")
        let middleStall = document.getElementById("events-stall");
        let rightStall = document.getElementById("events-stall-right");

        let leftStallBanner = document.getElementById("events-stall-banner-left")
        let middleStallBanner = document.getElementById("events-stall-banner");
        let rightStallBanner = document.getElementById("events-stall-banner-right");

        middleStall.classList.remove("aboutus-animation-middle-stall");
        rightStall.classList.remove("aboutus-animation-right-stall");
        leftStall.classList.remove("aboutus-animation-left-stall");
        middleStall.classList.add("aboutus-animation-middle-stall-rev");
        rightStall.classList.add("aboutus-animation-right-stall-rev");
        leftStall.classList.add("aboutus-animation-left-stall-rev");

        leftStallBanner.classList.remove('aboutus-animation-left-stall-banner');
        middleStallBanner.classList.remove("aboutus-animation-middle-stall-banner");
        rightStallBanner.classList.remove("aboutus-animation-right-stall-banner");
        leftStallBanner.classList.add('aboutus-animation-left-stall-banner-rev');
        middleStallBanner.classList.add("aboutus-animation-middle-stall-banner-rev");
        rightStallBanner.classList.add("aboutus-animation-right-stall-banner-rev");
    }

    const animateTestimonial = () => {
        let leftStall = document.getElementById("events-stall-left")
        let middleStall = document.getElementById("events-stall");
        let rightStall = document.getElementById("events-stall-right");

        let leftStallBanner = document.getElementById("events-stall-banner-left")
        let middleStallBanner = document.getElementById("events-stall-banner");
        let rightStallBanner = document.getElementById("events-stall-banner-right");

        leftStall.classList.remove("testimonial-animation-left-stall-rev");
        middleStall.classList.remove("testimonial-animation-middle-stall-rev");
        rightStall.classList.remove("testimonial-animation-right-stall-rev")
        leftStall.classList.add("testimonial-animation-left-stall");
        middleStall.classList.add("testimonial-animation-middle-stall");
        rightStall.classList.add("testimonial-animation-right-stall")

        leftStallBanner.classList.remove("testimonial-animation-left-stall-banner-rev");
        middleStallBanner.classList.remove("testimonial-animation-middle-stall-banner-rev");
        rightStallBanner.classList.remove("testimonial-animation-right-stall-banner-rev");
        leftStallBanner.classList.add("testimonial-animation-left-stall-banner");
        middleStallBanner.classList.add("testimonial-animation-middle-stall-banner");
        rightStallBanner.classList.add("testimonial-animation-right-stall-banner");
        setTimeout(function(){
            setTestiModal(true)
        }, 2000);
    }

    const undoTestimonial = () => {
        setTestiModal(false);
        let leftStall = document.getElementById("events-stall-left")
        let middleStall = document.getElementById("events-stall");
        let rightStall = document.getElementById("events-stall-right");

        let leftStallBanner = document.getElementById("events-stall-banner-left")
        let middleStallBanner = document.getElementById("events-stall-banner");
        let rightStallBanner = document.getElementById("events-stall-banner-right");

        leftStall.classList.remove("testimonial-animation-left-stall");
        middleStall.classList.remove("testimonial-animation-middle-stall");
        rightStall.classList.remove("testimonial-animation-right-stall")
        leftStall.classList.add("testimonial-animation-left-stall-rev");
        middleStall.classList.add("testimonial-animation-middle-stall-rev");
        rightStall.classList.add("testimonial-animation-right-stall-rev")

        leftStallBanner.classList.remove("testimonial-animation-left-stall-banner");
        middleStallBanner.classList.remove("testimonial-animation-middle-stall-banner");
        rightStallBanner.classList.remove("testimonial-animation-right-stall-banner");
        leftStallBanner.classList.add("testimonial-animation-left-stall-banner-rev");
        middleStallBanner.classList.add("testimonial-animation-middle-stall-banner-rev");
        rightStallBanner.classList.add("testimonial-animation-right-stall-banner-rev");
    }

    return (
        <div className="shops-wrapper">
            <div className="genre-wrapper-bg"  style={{backgroundImage: `url(${GenreBG})`}}></div>
            <div className="shops-cloud"><img src={cloud} width="160px" /></div>
            <img className="genre-wrapper-stall" id="events-stall-left" src={Shop1} />
            <img className="genre-wrapper-stall" id="events-stall-right" src={Shop3} />
            <img className="genre-wrapper-stall" id="events-stall" src={Shop2} />
            <img className="events-stall-banner" id="events-stall-banner-left" src={Text1} width="260px" onClick={animateAboutUs} />
            <img className="events-stall-banner" id="events-stall-banner-right" src={Text3} width="340px" onClick={animateTestimonial} />
            <img className="events-stall-banner" id="events-stall-banner" src={Text2} width="190px" onClick={() => history.push("/events")} />
            <Modal
                open={aboutModal}
                center
                closeOnEsc
                closeOnOverlayClick
                showCloseIcon={true}
                styles={customStyles}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                onClose={undoAboutUs}
            >
                <div className="aboutus-board" style={{backgroundImage: `url(${Board1})`}}>
                    <p>
                        Spring Fest is the annual social and cultural festival of IIT Kharagpur, 
                        a pioneer in the elite institutions. It marks days of absolute ecstasy, 
                        providing the budding artists a competing platform in diverse fields 
                        such as music, dance, theatre, photography, literature, fine arts, 
                        quizzing and debating. It is an avenue to be comforted from the routine 
                        life and to embrace the fun and frolic embedded with tantalizing professional
                        performances from India and abroad along with an addressal to the social
                        responsibility with its underlying social theme.
                    </p>
                </div>
            </Modal>
            <Modal
                open={testiModal}
                center
                closeOnEsc
                closeOnOverlayClick
                showCloseIcon={true}
                styles={customStyles}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                onClose={undoTestimonial}
            >
                <div className="testi-board" style={{backgroundImage: `url(${Board2})`}}>
                    
                </div>
            </Modal>
        </div>
    )
}

export default Shops;