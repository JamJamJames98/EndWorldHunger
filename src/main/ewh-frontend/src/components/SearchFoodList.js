import React from "react";
import { Link } from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

import FoodRequestModal from "./FoodRequestModal"

const sortTypes = {
	up: {
        icon: faSortUp,
        multiplier: 1
	},
	down: {
        icon: faSortDown,
        multiplier: -1
	},
	default: {
        icon: faSort,
        multiplier: 0
	}
};

class SearchFoodList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            placeholder: "Loading...",
            lastColPressed: null,
            rows: [],
            currentSort: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
            orderShow:false,
            selectedFood: 0,
            foodData: [],
            isFetching: true,
        }
    }

    getDailyLimit = () => {
        let endpoint = `http://localhost:9090/api/user/${this.props.userId}`;
        //console.log(this.props.userId)
        fetch(endpoint)
        .then(response => {
          if(response.status != 200) {
            this.setState({placeholder: "ERROR: This User could not be found."})
            return null;
          }
          return response.json();
        })
        .then(data => {
          //console.log("FETCHING AT FOODREQUESTMODAL");
          if(data){
            //console.log(data);
            //console.log("HIHISDIOAHSDOJASODH")
            console.log("Daily limit:", data.dailyLimit);
            this.setState({userDailyLimit: data.dailyLimit});
          }
          this.setState({isFetching:false});
        })
      }

    calculateDays = (date) => {
        const currentDate = Date.now();
        const Difference_In_Time = currentDate - date.getTime();
        const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

        return Difference_In_Days;
    }

    getTimePostedString = (days) => {
        if (days <= 0)
            return "Today";
        else if (days == 1)
            return "1 day ago";
        return `${days} days ago`;
    }

    onSortChange = (colNumber) => {
        let { currentSort } = this.state;
        let nextSort;
        let lastColPressed = colNumber;

		if (currentSort[colNumber] === 'up') nextSort = 'down';
		else if (currentSort[colNumber] === 'down') {
            nextSort = 'default';
            lastColPressed = null;
        } else if (currentSort[colNumber] === 'default') nextSort = 'up';

        currentSort=['default', 'default', 'default', 'default', 'default', 'default', 'default'];

        currentSort[colNumber] = nextSort;

		this.setState({
            currentSort: currentSort,
            lastColPressed: lastColPressed,
		});
    }

    handleOrderClose = (event) => {this.setState({orderShow: false});}
    handleOrderShow = (selectedFood) => {this.setState({selectedFood: selectedFood, orderShow: true});}

    getData = (searchString, long, lat) => {
        const endpoint = `http://localhost:9090/api/search/food?searchString=${searchString}&longitude=${long}&latitude=${lat}&consumerType=${this.props.consumerType}`;
        console.log(endpoint);

        fetch(endpoint)
        .then(response => {
            if (response.status != 200) {
                this.setState({placeholder: "ERROR: Could not complete search."})
                return null;
            }
            return response.json();
        })
        .then(data => {
            if(data) {
            if(data.data) {
                //console.log("Raw food data:", data.data);
                //Update min/max values
                this.props.updateAdvancedSearch(
                    [0,50], //distance
                    [0,data.largestQuantity], //amount
                    [0,this.calculateDays(new Date(data.oldestMostRecentListing))] //time
                    );
                
                //Map data to array for table body
                let dataArray = data.data.map((item)=>{
                    if(item.timePosted == "")
                        item.timePosted = "No current listings";
                    return [
                        item.foodItemData.name,
                        item.providerName,
                        item.location,
                        item.distance,
                        item.providerType,
                        item.foodItemData.quantity,
                        this.calculateDays(new Date(item.foodItemData.timePosted)),
                        item.providerId,
                        item.foodItemData.id,
                        item.foodItemData]
                });

                this.setState({
                    foodData: dataArray,
                    loaded: true,
                })
            } else {
                this.setState({
                    loaded:false,
                    placeholder: "No results found",
                })
            }}
        })

    }

    componentDidMount() {
        this.getDailyLimit();
        this.getData(this.props.searchString, this.props.longitude, this.props.latitude);
    }

    componentDidUpdate(prevProps) {
        if(this.props.searchString != prevProps.searchString
            || this.props.latitude != prevProps.latitude
            || this.props.longitude != prevProps.longitude){
            //console.log("Component did update");
            this.getData(this.props.searchString, this.props.longitude, this.props.latitude);
        }

    }

    render() {
        const { currentSort, lastColPressed } = this.state;
        const headers = ["Food", "Provider", "Location", "Distance", "Type", "Amount", "Posted"];

        return (
            <div>
              {
                  this.state.loaded && !this.state.isFetching ?
                  <Table hover>
                        <thead>
                            <tr>
                                {headers.map((column, index)=>{
                                    return <th key={index}>{column} <Link className="sort-buttons" onClick={()=>this.onSortChange(index)}>
                                        <FontAwesomeIcon icon={sortTypes[currentSort[index]].icon}/>
                                    </Link></th>
                                })}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...this.state.foodData]
                            .sort((a,b)=>{
                                if(lastColPressed != null){
                                    if(lastColPressed == 3 || lastColPressed == 5 || lastColPressed == 6){
                                        return (Number(a[lastColPressed]) - Number(b[lastColPressed]))*sortTypes[currentSort[lastColPressed]].multiplier;
                                    } else {
                                        return (String(a[lastColPressed]).localeCompare(String(b[lastColPressed])))*sortTypes[currentSort[lastColPressed]].multiplier;
                                    }
                                } else return a;
                            })
                            .map((item, index) => {
                                let providerLink = `/provider/${item[7]}`;
                                if ( this.props.selectedRestaurantTypes.length > 0
                                    && this.props.selectedRestaurantTypes.map(a=>a.label)
                                    .includes(item[4])
                                    && Number(item[3]) >= this.props.distance[0]
                                    && Number(item[3]) <= this.props.distance[1]
                                    && Number(item[5]) >= this.props.amount[0]
                                    && Number(item[5]) <= this.props.amount[1]
                                    && Number(item[6]) >= this.props.time[0]
                                    && Number(item[6]) <= this.props.time[1]){
                                return <tr key={item[8]}>
                                    <td>{item[0]}</td>
                                    <td><Link to={providerLink}>{item[1]}</Link></td>
                                    <td>{item[2]}</td>
                                    <td>{`${item[3].toFixed(2)} km`}</td>
                                    <td>{item[4]}</td>
                                    <td>{`${item[5]} serving${item[5] != 1 ? 's' : ''}`}</td>
                                    <td>{this.getTimePostedString(item[6])}</td>
                                    <td><Button onClick={()=>this.handleOrderShow(item[9])}>Order Now</Button></td>
                                </tr>}
                                return;
                            })}
                        </tbody>
                        <FoodRequestModal userId={this.props.userId} userDailyLimit = {this.state.userDailyLimit} selectedFood={this.state.selectedFood}
                                show={this.state.orderShow} onHide={this.handleOrderClose}/>
                    </Table>
                    :
										<>
										{this.state.rows.length!=0?
											<p className="placeholder">{this.state.placeholder}</p>
										:<p className="placeholder">No results</p>}
										</>
              }
              

            </div>
        )
    }
}

export default SearchFoodList;
