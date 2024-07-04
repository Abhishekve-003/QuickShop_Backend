import React from 'react';
import "./Contact.css";
import { Button } from "@mui/material";
import MetaData from '../MetaData';

const Contact = () => {
    return(
        <div className='contactPage'>
            <MetaData title="Contact Page"/>
            <a className='mailBtn' href="mailto:abhishekve0010@gmail.com"  >
                <Button>Contact: abhishekve0010@gmail.com</Button>
            </a>
        </div>
    );
}

export default Contact;