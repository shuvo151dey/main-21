import React from "react";
import '../../Styles/footer.css';
import ILU from "../../Assets/Images/ILU_Final_(White).png";
import CustomButton from "../../Utils/CustomButton";
import Shop1 from "../../Assets/Images/footer-shop1.png";
import Shop2 from "../../Assets/Images/footer-shop2.png";
import Shop3 from "../../Assets/Images/footer-shop3.png";
import Shop4 from "../../Assets/Images/footer-loginreg stall.png";

const Footer = () => {
    return (
        <div className="page footer_page_alt">
            <img src={ILU} className="footer_ilu" alt="ilu"/>
            <ul className="footer_leftflank">
                <li><CustomButton text="FAQ" /></li>
                <li><CustomButton text="Aftermovie" /></li>
                <li><CustomButton text="Events" /></li>
            </ul>
            <ul className="footer_rightflank">
                <li><CustomButton text="Sponsors" /></li>
                <li><CustomButton text="Our Team" /></li>
                <li><CustomButton text="Sponsors" /></li>
            </ul>
            <img style={{height: 300, position: 'absolute', bottom: 0}} src={Shop1} alt="Shop1" />
            <img style={{height: 300, position: 'absolute', bottom: 0, left: 300}} src={Shop2} alt="Shop2" />
            <img style={{height: 300, position: 'absolute', bottom: 0, right: 0}} src={Shop3} alt="Shop3" />
            <img style={{height: 300, position: 'absolute', bottom: 0, right: 370}} src={Shop4} alt="Shop4" />
        </div>
    );
}

export default Footer;
