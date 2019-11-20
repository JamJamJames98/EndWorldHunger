import React from "react";
import {Button, Table} from "react-bootstrap";
import FoodRequestModal from "./FoodRequestModal";

class ProviderFoodTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings:[
              //Name, Description, Servings, when?
                ["Banana", "It's bananas!", "10 servings", "2hrs ago"],
                ["Orange", "Peepee", "40 servings", "2hrs ago"],
                ["Rat", "PEEEEPEEEE", "696969 servings", "2hrs ago"]
            ],
            selectedFood: {quantity:10, name:"hello"},
            orderShow: false,
            userId: 123,
            userDailyLimit:-1,
            foodModel:[{quantity:10, name:"hello"}],
            isFetching: false,
        }
    }

    componentDidMount() {
      this.setState({isFetching: true});
      /*
      {
        "id": 1
        "provider": {
          "id": 1
          ... other provider data
        },
        "quantity": 10,
        "name": "Hamesh's Vegetarian Pepperonis",
        "timePosted": "2019-10-27T20:00:50.554Z",
        "expiry": "2019-10-30T13:34:00.055Z",
        "description": "Vegetarian friendly!",
        "image": "A picture of pepperonis on a grass"
      }

      // Id, {Name, Description, Servings, when?}

      */
      let endpoint = `http://localhost:9090/api/provider/${this.props.providerId}/food`;

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
          let table = [];
          //console.log(data);
          //console.log(data.providerName);
          this.setState({listings:data});
          for (let i = 0; i < data.length; i++) {
            let row = [];
            let x = data[i];
            row[0] = x.id;
            row[1] = x.name;
            row[2] = x.description;
            row[3] = x.quantity;
            row[4] = x.timePosted;
            table.push(row);
          }
          this.setState({listings:table});
          this.setState({foodModel:data});
        }
      }).then(this.getDailyLimit())

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
          //console.log(data.dailyLimit);
          this.setState({userDailyLimit: data.dailyLimit});
        }
        this.setState({isFetching:false});
      })
    }

    // getFoodModel = (index) => {
    //   let endpoint = `http://localhost:9090/api/food/${foodId}`;
    //
    //   fetch(endpoint)
    //   .then(response => {
    //     if(response.status != 200) {
    //       this.setState({placeholder: "ERROR: This provider could not be found."})
    //       return null;
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     if(data){
    //       console.log(data);
    //       this.setState({foodModel: data});
    //       console.log("HIHIHI")
    //     }
    //   }).then(console.log(this.state.foodModel))
    // }

    handleOrderClose = (event) => {this.setState({orderShow: false});}
    handleOrderShow = (index) => {
      //console.log(index);
      //console.log(this.state.foodModel[index]);
      this.setState({selectedFood: this.state.foodModel[index], orderShow: true});
    }


    createTable = () => {
        let table = [];
        for (let i = 0; i < this.state.listings.length; i++) {
        let item = this.state.listings[i];
        var date = new Date(item[4]).toString().substring(4,15);

        table.push(
            <tr>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>{`${item[3]} serving${item[3] != 1 ? 's' : ''}`}</td>
            <td>{date}</td>
            {this.props.userType == "C" &&
            <td><Button onClick={()=>this.handleOrderShow(i)}>Order Now</Button></td>
            }
            </tr>
        )
        }
        if (table.length == 0) {
          return (<p className="placeholder">No Results</p>);
        }
        return table;
    }

    render() {
        return (
            <div className="Provider-food-table">
              <Table hover>
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.createTable()}
                </tbody>
              </Table>
                <FoodRequestModal userId={this.props.userId} userDailyLimit = {this.state.userDailyLimit} selectedFood={this.state.selectedFood}
                foodModel={this.state.foodModel} show={this.state.orderShow} onHide={this.handleOrderClose}/>
            </div>
        )
    }
}

export default ProviderFoodTable;
