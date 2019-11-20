import React from "react";
import { Link } from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

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

class SearchRestaurantList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            placeholder: "Loading...",
            lastColPressed: null,
            currentSort: ['default', 'default', 'default', 'default', 'default', 'default'],
            rows: [],
            restaurantData: [],
        }
    }

    calculateDays = (date) => {
        const currentDate = Date.now();
        const Difference_In_Time = currentDate - new Date(date).getTime();
        const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

        return Difference_In_Days;
    }

    getTimePostedString = (days) => {
        if (days == Number.MAX_SAFE_INTEGER)
            return "No current listing"
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

        currentSort=['default', 'default', 'default', 'default', 'default', 'default'];

        currentSort[colNumber] = nextSort;

		this.setState({
            currentSort: currentSort,
            lastColPressed: lastColPressed,
		});
    }

    getData = (searchString, long, lat) => {
        const endpoint = `http://localhost:9090/api/search/providers?searchString=${searchString}&longitude=${long}&latitude=${lat}&consumerType=${this.props.consumerType}`;
        //console.log(endpoint);

        fetch(endpoint)
        .then(response => {
            if (response.status != 200) {
                this.setState({placeholder: "ERROR: Could not complete search."})
                return null;
            }
            return response.json();
        })
        .then(data => {
            if(data){
            if(data.data) {
                //Update min/max values
                this.props.updateAdvancedSearch(
                    [0,50], //distance
                    [0,data.largestQuantity], //amount
                    [0,this.calculateDays(data.oldestMostRecentListing)] //time
                    );

                let dataArray = data.data.map((item)=>{
                    if(item.timePosted == "")
                        item.timePosted = Number.MAX_SAFE_INTEGER;
                    else item.timePosted = this.calculateDays(item.timePosted);
                    return [
                        item.providerName,
                        item.location,
                        item.distance,
                        item.providerType,
                        item.quantity,
                        item.timePosted,
                        item.id]
                });

                this.setState({
                    restaurantData: dataArray,
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
        const headers = ["Provider", "Location", "Distance", "Type", "Total Servings", "Last Posted"];

        return (
            <div>
              {
                  this.state.loaded ?
                  <Table hover>
                        <thead>
                            <tr>
                                {headers.map((column, index)=>{
                                    return <th key={index}>{column} <Link className="sort-buttons" onClick={()=>this.onSortChange(index)}>
                                        <FontAwesomeIcon icon={sortTypes[currentSort[index]].icon}/>
                                    </Link></th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {[...this.state.restaurantData]
                                .sort((a,b)=>{
                                    if(lastColPressed != null){
                                        if(lastColPressed == 2 || lastColPressed == 4 || lastColPressed == 5){
                                            return (Number(a[lastColPressed]) - Number(b[lastColPressed]))*sortTypes[currentSort[lastColPressed]].multiplier;
                                        } else {
                                            return (String(a[lastColPressed]).localeCompare(String(b[lastColPressed])))*sortTypes[currentSort[lastColPressed]].multiplier;
                                        }
                                    } else return a;
                                })
                                .map(item => {
                                    let providerLink = `/provider/${item[6]}`
                                    if ( this.props.selectedRestaurantTypes.length > 0
                                        && this.props.selectedRestaurantTypes.map(a=>a.label)
                                        .includes(item[3])
                                        && Number(item[2]) >= this.props.distance[0]
                                        && Number(item[2]) <= this.props.distance[1]
                                        && Number(item[4]) >= this.props.amount[0]
                                        && Number(item[4]) <= this.props.amount[1]
                                        && Number(item[5]) >= this.props.time[0]
                                        && Number(item[5]) <= this.props.time[1]
                                        || Number(item[5]) == Number.MAX_SAFE_INTEGER){
                                    return <tr key={item[6]}>
                                        <td><Link to={providerLink}>{item[0]}</Link></td>
                                        <td>{item[1]}</td>
                                        <td>{`${item[2].toFixed(2)} km`}</td>
                                        <td>{item[3]}</td>
                                        <td>{`${item[4]} serving${item[5] != 1 ? 's' : ''}`}</td>
                                        <td>{this.getTimePostedString(item[5])}</td>
                                    </tr>}
                                    return;
                                })}
                        </tbody>
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

export default SearchRestaurantList;
