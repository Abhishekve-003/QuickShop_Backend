import React from 'react';
import "./About.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import { Avatar, Button, Typography } from '@mui/material';
import founder from "../../../images/founder.jpeg";

const About = () => {
    const visitUpwork = () => {
        window.location = "https://www.linkedin.com/in/abhishekverma001/";
    }
    return(
        <div>
        <div className='aboutPage'>
            <div></div>
            <div className='aboutPageGradient'></div>
            <div className='aboutPageContainer'>
                <Typography component="h1">About Us</Typography>
                <div>
                    <div>
                        <Avatar
                            style={{ width: "15rem", height: "15rem", margin: "3rem 0", marginBottom: "1.5rem" }} 
                            src={founder} 
                            alt='Founder'
                        />
                        <Typography>Abhishek Verma</Typography>
                        <Button onClick={visitUpwork}>Visit LinkedIn Profile</Button>
                        <span>This is a MERN Stack Ecommerce Responsive Website, that I have created using React for frontend, redux for state management, Mongodb as database, and Node Js and Express for backend. This app contains all the latest features. I have also integrated stripe payment gateway in this app.</span>
                    </div>
                    <div className='aboutPageContainer2'>
                        <Typography component="h2">Contact Links</Typography>
                        <a href='https://www.linkedin.com/in/abhishekverma001/' target='blank'><LinkedInIcon /></a>
                       <div className='insta'>
                       <a href='https://www.instagram.com/_abhishek_.verma._/'
                        target='blank'><Instagram/></a>
                       </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default About;