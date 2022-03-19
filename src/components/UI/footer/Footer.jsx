import React from 'react';
import classes from "./Footer.module.css"

const Footer = () => {
    return (
        <div>
            <div className={classes.clear}/>
            <div style={{textAlign: "center"}} className={classes.footer}>
                2022, EXPEDIA Student
            </div>
        </div>
    );
};

export default Footer;