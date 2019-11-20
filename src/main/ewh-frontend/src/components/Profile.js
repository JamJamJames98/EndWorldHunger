import React from "react";
import {Image, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faPen} from '@fortawesome/free-solid-svg-icons';
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";


import ProfileActivity from './ProfileActivity';
import ProfileEditModal from './ProfileEditModal';

/*DUMMY IMAGE*/
import profileImage from '../img/profile.png';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            placeholder: "Loading...",
            image: profileImage,
            showEditModal: false,
            rating: 0,
        };
    }

    componentDidMount(){
        let userTypeString = "";
        if (this.props.userType == "C") {
            userTypeString = "user"
        } else {
            userTypeString = "provider"
        }

        let endpoint = `http://localhost:9090/api/${userTypeString}/${this.props.userId}`;

        fetch(endpoint)
        .then(response => {
            if(response.status != 200) {
                this.setState({placeholder: "ERROR: An error occured."});
                return null;
            }
            return response.json();
        })
        .then(data => {
            if(data) {
                console.log(data);
                let nameString="";
                if (this.props.userType == "C") {
                    nameString=data.name;
                } else {
                    nameString=data.providerName;
                }
                this.setState({
                    name: nameString,
                    username: data.username,
                    email: data.email,
                    phone: data.phoneNumber,
                    rating: data.rating,
                    loaded: true,
                    user: data,
                })
            }
        })
    }

    handleEditClose = () => {
      this.setState({showEditModal: false});
    }
    handleEditShow = () => {
      this.setState({showEditModal:true});
    }

    render() {
        const providerURL = `/provider/${this.props.userId}`
        return (
            <div>
                { this.state.loaded
                ?
                <>
                <Button variant="secondary" onClick={this.handleEditShow}><FontAwesomeIcon icon={faPen} size="sm" fixedWidth/> Edit Profile</Button>
                <div className="profile-image"><Image src={this.state.image} roundedCircle fluid/></div>
                <h2 style={{textAlign:"center"}}>
                    { this.props.userType == "P"
                    ? <Link to={providerURL}>{this.state.name}</Link>
                    : this.state.name}
                    </h2>
                <p style={{textAlign:"center", fontStyle:"italic"}}>@{this.state.username}</p>
                <p className="profile-rating" >
                <StarRatings starDimension="30px" starSpacing="1px" starRatedColor="black"
                        rating={Number(this.state.rating)} numberOfStars={5}/></p>
                <div style={{textAlign:"center"}}>
                    <p className="profile-contact"><FontAwesomeIcon icon={faPhone} size="sm" fixedWidth/> {this.state.phone}</p>
                    <p className="profile-contact"><FontAwesomeIcon icon={faEnvelope} size="sm" fixedWidth/> {this.state.email}</p>
                </div>
                <br/>
                <h3>Recent Activity</h3>
                <hr/>
                <ProfileActivity userType={this.props.userType} userId={this.props.userId}/>
                <ProfileEditModal userId={this.props.userId} show={this.state.showEditModal} onHide={this.handleEditClose}
                email={this.state.email} phone={this.state.phone} user={this.state.user}/>
                </>
                : <p className="placeholder">{this.state.placeholder}</p>
                }
            </div>
        )
    }
}

export default Profile;
