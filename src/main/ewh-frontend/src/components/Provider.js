import React from "react";
import StarRatings from "react-star-ratings";
import {Image, Container, Row, Col, Card, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faTrophy, faFireAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import ProviderReviews from "./ProviderReviews";
import ProviderFoodTable from './ProviderFoodTable';
import ProviderBadge from './ProviderBadge';

/*DUMMY IMAGE*/
import resaurantImage from '../img/Restaurant.jpg';
import supermarketImage from '../img/Supermarket.jpg'

class Provider extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        placeholder: "Loading...",
        isViewAll:true,
        // INDEX 0: MONDAY
        hours: [
          ["0900", "2200"], //MON
          ["0900", "2200"], //TUE
          ["0900", "2200"], //WED
          ["0900", "2200"], //THU
          ["0900", "2200"], //FRI
          ["0900", "2200"], //SAT
          ["CLOSED", "CLOSED"] //SUN
        ],
        image:supermarketImage,
      }

      this.createHours = this.createHours.bind(this);
    }


    /*Creates Markup for hours table*/
    createHours = () => {
      let table = [];
      let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      for (let i = 0; i < this.state.hours.length; i++) {
        let time = "";
        //If closed, only shows closed. Else, shows opening & closing
        if (this.state.hours[i][0] == "CLOSED") {
          time = "CLOSED";
        } else {
          time = this.state.hours[i][0] + "-" + this.state.hours[i][1];
        }
        table.push(
          <Col md={1.5}>
            <Card style={{width:'150px'}}>
              <Card.Body>
                <Card.Title>{days[i]}</Card.Title>
                <Card.Text>{time}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      }
      return table;
    }

    componentDidMount() {
      let providerId = this.props.match.params.id;
      let endpoint = `http://localhost:9090/api/provider/${providerId}`;

      fetch(endpoint)
      .then(response => {
        if(response.status != 200) {
          this.setState({placeholder: "ERROR: This provider could not be found."})
          return null;
        }
        return response.json();
      })
      .then(data => {
        if(data){
          console.log(data);
          console.log(data.providerName);
          this.setState({
            name: data.providerName,
            rating: data.rating,
            address: data.location,
            points: data.points,
            streak: data.streak,
            phone: data.phoneNumber,
            loaded: true,
          })
          if (data.providerType=="Supermarket") {
            this.setState({image:supermarketImage});
          } else {
            this.setState({image:resaurantImage});
          }
        }
      })
    }

    getLocationRedirectLink = (location) => {
      let location_search = "";
      if (location){
        location_search = "https://www.google.com/maps/search/" + location.replace(/\s+/g, '+');
      }
      return location_search;
    }

    render() {
        return (
            <div>
              {this.state.loaded
              ?
              <>
              {/* Provider Info */}
              <Container fluid className="provider-info">
                <Row>
                  <Col md="5">
                  <Row>
                  <Col><h2>{this.state.name}</h2></Col>
                  <Col style={{alignSelf:"center", textAlign:"right"}}>
                    <StarRatings starDimension="30px" starSpacing="1px" starRatedColor="black"
                        rating={Number(this.state.rating)} numberOfStars={5}/>
                  </Col>
                  </Row>
                    <Image src={this.state.image} fluid />
                  </Col>

                  <Col>
                    <br/>
                    <p>
                      <p className="provider-points"><FontAwesomeIcon icon={faTrophy} size="sm" fixedWidth/> {this.state.points}</p>
                      <p className="provider-points"><FontAwesomeIcon icon={faFireAlt} size="sm" fixedWidth/> {this.state.streak}</p>
                      <ProviderBadge points={this.state.points} streak={this.state.streak}/>
                    </p>
                    <p><FontAwesomeIcon icon={faPhone} fixedWidth/> {this.state.phone}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth/>
                      <a href={this.getLocationRedirectLink(this.state.address)}
                      target="_blank"> {this.state.address}</a>
                    </p>
                    <br/>

                  <p><FontAwesomeIcon icon={faClock} fixedWidth/> Hours</p>
                  <Row>
                  {this.createHours()}
                  </Row>
                  </Col>
                </Row>
              </Container>
              <br/>

              {/* Provider Reviews*/}
              <div className="provider-reviews">
                <h4>Reviews</h4>
                <hr/>
                <ProviderReviews providerId={this.props.match.params.id}/>
                <br/>
              </div>

              {/*Provider Listings*/}
              <div className="provider-listings">
                <h4>Food Listings</h4>
                <ProviderFoodTable userType={this.props.userType} userId={this.props.userId} providerId={this.props.match.params.id}/>
              </div>
              </>
              : <p className="placeholder">{this.state.placeholder}</p>}

            </div>
        )
    }
}

export default Provider;
