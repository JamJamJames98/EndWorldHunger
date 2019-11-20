import React from "react";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

class Home extends React.Component {

    render() {
        return (
            <div>
                
                <br/>
                <br/>
                <h1 style={{textAlign: "center"}}>Hello, {this.props.user ? this.props.user : "Stranger"}!</h1>
                <br/>
                <h5 style={{textAlign: "center"}}>I would like to</h5>
                <div className="home-buttons">
                <Link to='/search'><Button
                    variant="outline-secondary" 
                    className="home-button">
                        Find Food
                </Button></Link>
                <Link to='/dashboard'><Button variant="outline-secondary" 
                    className="home-button">
                        { this.props.userType == "A"
                        ? 'Go to Dashboard'
                        : 'See My Orders'}
                </Button></Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="quote-box">
                    <br/>
                    <br/>
                    <h6>Encouragement of the day:</h6>
                    <h4 className="quote">"Encouragement after censure is as the sun after a shower."</h4>
                    <p className="quote-author">- Johann Wolfgang Von Goethe</p>
                    <br/>
                    <br/>
                </div>
                </div>
            </div>
        )
    }
}

export default Home;
