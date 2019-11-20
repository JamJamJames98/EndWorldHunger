import React from "react";
import {Form, Container, Row, Col, Button, OverlayTrigger, Popover, Modal} from "react-bootstrap";
import Slider from '@material-ui/core/Slider';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"
import Autocomplete from 'react-google-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

import SearchFoodList from './SearchFoodList';
import SearchRestaurantList from './SearchRestaurantList';

const getConsumerType = (userType, userSubtype) => {
    if(userType == "P"){
        return "Organisation";
    } else if (userSubtype == "I") {
        return "Individual";
    } else if (userSubtype == "C") {
        return "Charity";
    } else if (userSubtype == "O") {
        return "Organisation";
    }
}

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            placeholder: "Getting current location...",
            tempSearchString: "",
            searchString: "",
            placeString: "",
            searchFromCurLoc: true,
            consumerType: getConsumerType(this.props.userType, this.props.userSubtype),
            searchForFood: true,
            distance: [0,100],
            amount: [0,100],
            time: [0,100],
            distanceLim: [0,0],
            amountLim: [0,0],
            timeLim: [0,0],
            restaurantTypes: [
                {id: 0, label: "Restaurant"},
                {id: 1, label: "Supermarket"}
            ],
            selectedRestaurantTypes: [
                {id: 0, label: "Restaurant"},
                {id: 1, label: "Supermarket"}
            ],
        }
    }

    handleDistanceChange = (event, newValue) => {this.setState({distance: newValue});};
    handleAmountChange = (event, newValue) => {this.setState({amount: newValue});};
    handleTimeChange = (event, newValue) => {this.setState({time: newValue});};
    handleRestaurantTypeChange = (selectedRestaurantTypes) => {this.setState({ selectedRestaurantTypes });};
    handleClear = () => {
        this.setState({
            distance: this.state.distanceLim,
            amount: this.state.amountLim,
            time: this.state.timeLim,
            selectedRestaurantTypes: [
                {id: 0, label: "Restaurant"},
                {id: 1, label: "Supermarket"}
            ],
        })
    }
    handleSearchForChange = (event) => {
        this.setState({
            searchForFood: !this.state.searchForFood,
            tempSearchString: "",
            searchString: "",
            //placeString: "",
            //latitude: this.state.currentLat,
            //longitude: this.state.currentLong,
        });};


    handleSearchStringChange = (event) => {
        this.setState({tempSearchString: event.target.value})
    }

    handleSubmit = (event) => {
        this.setState({searchString: this.state.tempSearchString});
        event.preventDefault();
    }

    handlePlaceSelect = (place) => {
        //console.log(place);
        if(place.geometry) {
            this.setState({
                searchFromCurLoc: false,
                placeString: place.formatted_address,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
            })}
    }

    handlePlaceChange = (event) => {
        this.setState({placeString: event.target.value});
    }

    handleSearchFromCurLoca = () => {
        this.setState({
            searchFromCurLoc: true,
            placeString: "",
            latitude: this.state.currentLat,
            longitude: this.state.currentLong,
        })
    }

    updateAdvancedSearch = (distance,amount,time) => {
        this.setState({
            distanceLim: distance,
            distance: distance,
            amountLim: amount,
            amount: amount,
            timeLim: time,
            time: time,
        });
    }

    componentDidMount() {
    	var errorCoor;
    	navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
    	navigator.geolocation.getCurrentPosition((position)=>{
    		this.setState({
                currentLat: position.coords.latitude,
                currentLong: position.coords.longitude,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                loaded: true,
            });
        }, ()=>{
            this.setState({
                loaded:true,
                placeholder: "Location time out",
            })
        }, {maximumAge:60000, timeout:100, enableHighAccuracy:true});
    }

    render() {
        return (
            <div>
                { this.state.loaded ? <>
                <Container fluid={true}>
                    <Row>
                        <Col md="2"><h2>Search</h2></Col>
                        <Col>
                                <Row className="search-radio">
                                    <Form.Check inline label="Food" type='radio'
                                        onChange={this.handleSearchForChange}
                                        checked={this.state.searchForFood}/>
                                    <Form.Check inline label="Restaurant" type='radio'
                                        onChange={this.handleSearchForChange}
                                        checked={!this.state.searchForFood}/>
                                </Row>
                                <Row>
                                    <Col md="8">
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formSearchbar" id="searchbar">
                                        { this.state.searchForFood ?
                                            <Form.Control as="input" placeholder="Find food"
                                                name="q" value={this.state.tempSearchString}
                                                onChange={this.handleSearchStringChange}/> :
                                            <Form.Control as="input" placeholder="Find a restaurant"
                                                name="q" value={this.state.tempSearchString}
                                                onChange={this.handleSearchStringChange}/>
                                        }
                                    </Form.Group>
                                    </Form>
                                    <Autocomplete
                                        value={this.state.placeString}
                                        onChange={this.handlePlaceChange}
                                        className="search-autocomplete"
                                        onPlaceSelected={this.handlePlaceSelect}
                                        types={['(regions)']}
                                        componentRestrictions={{country: "au"}}
                                    />
                                    <Button variant="link" disabled={this.state.searchFromCurLoc}
                                        className="search-curloc-button"
                                        onClick={this.handleSearchFromCurLoca}>
                                        {this.state.searchFromCurLoc
                                        ? <>Searching from current location</>
                                        : <>Search from current location</>}
                                        </Button>
                                    </Col>
                                    <Col md="4">
                                        <Button variant="secondary"
                                            onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                        <OverlayTrigger
                                            rootClose
                                            trigger="click"
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Popover id={`popover-positioned-bottom`}>
                                                <Popover.Title>
                                                    <Button size="sm" variant="secondary" onClick={this.handleClear}>Clear</Button>
                                                </Popover.Title>
                                                <Popover.Content>
                                                    <p className="adv-search-label">Distance (Km)</p>
                                                    <div className="search-slider">
                                                        <Slider
                                                            value={this.state.distance}
                                                            onChange={this.handleDistanceChange}
                                                            valueLabelDisplay="auto"
                                                            min={this.state.distanceLim[0]}
                                                            max={this.state.distanceLim[1]}
                                                        />
                                                    </div>
                                                    <p className="adv-search-label">Amount (servings)</p>
                                                    <div className="search-slider">
                                                        <Slider
                                                            className="search-slider"
                                                            value={this.state.amount}
                                                            onChange={this.handleAmountChange}
                                                            valueLabelDisplay="auto"
                                                            min={this.state.amountLim[0]}
                                                            max={this.state.amountLim[1]}
                                                        />
                                                    </div>
                                                    <p className="adv-search-label">Time (days)</p>
                                                    <div className="search-slider">
                                                        <Slider
                                                            className="search-slider"
                                                            value={this.state.time}
                                                            onChange={this.handleTimeChange}
                                                            valueLabelDisplay="auto"
                                                            min={this.state.timeLim[0]}
                                                            max={this.state.timeLim[1]}
                                                        />
                                                    </div>
                                                    <p className="adv-search-label">Types</p>
                                                    <div className="search-multiselect">
                                                    <MultiSelect
                                                        items={this.state.restaurantTypes}
                                                        responsiveHeight="122px"
                                                        selectedItems={this.state.selectedRestaurantTypes}
                                                        onChange={this.handleRestaurantTypeChange}
                                                        showSearch={false}
                                                        showSelectedItems={false}
                                                    />
                                                    </div>
                                                </Popover.Content>
                                                </Popover>
                                            }
                                            >
                                                <Button variant="light" style={{float:"right"}}>Advanced search</Button>
                                            </OverlayTrigger>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                </Container>

                { this.state.searchForFood
                    ? <SearchFoodList
                        userId={this.props.userId}
                        consumerType={this.state.consumerType}
                        searchString={this.state.searchString}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        distance = {this.state.distance}
                        amount = {this.state.amount}
                        time = {this.state.time}
                        selectedRestaurantTypes = {this.state.selectedRestaurantTypes}
                        updateAdvancedSearch={this.updateAdvancedSearch}/>
                    : <SearchRestaurantList
                        consumerType={this.state.consumerType}
                        searchString={this.state.searchString}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        distance = {this.state.distance}
                        amount = {this.state.amount}
                        time = {this.state.time}
                        selectedRestaurantTypes = {this.state.selectedRestaurantTypes}
                        updateAdvancedSearch={this.updateAdvancedSearch}/>
                }
                </>
                :
                <>
                <h2>Search</h2>
                <div className="placeholder">
                <p>{this.state.placeholder}</p>
                <FontAwesomeIcon icon={faSpinner} spin size="2x"/>
                </div>
                </>}
            </div>
        )
    }
}

export default SearchResults;
