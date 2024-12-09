import React from "react";
// import {  Button } from 'react-bootstrap';
// import { Nav } from "react-bootstrap";
import '../styling/AppImage.css'
import { Link } from "react-router-dom";
// import ProfileImage from '../Images/Profile.jpg';

function AppBanner(){
    return (
        <div className="career-start-section">
        <h1>AI-Driven Resume Generation</h1>
        <h1>Job Matching Platform</h1>
        <div className="image-container">
        </div>
            <div className="button-group">
                <Link to="./LoginPage" className="btn btn-outline-warning me-2">Login</Link>
                <Link to="./RegisterPage" className="btn btn-outline-warning ">Register</Link>
            </div>
        </div>
    );
}

export default AppBanner;

