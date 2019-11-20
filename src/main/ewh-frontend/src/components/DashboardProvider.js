import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import ReviewModal from "./ReviewModal";
import StarRatings from "react-star-ratings";

class DashboardProvider extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        placeholder: "Loading...",
        isViewAll:false,
        orders:[[1, "10/09/2019", "Jeremy Irons", "Pending", "DXC1F2", "Review"],
        [2, "10/09/2019", "James Bond", "Complete", "0QA192" , "3"],
        [3, "10/09/2019", "Jina Bond", "Complete", "10FJA8" , "Review"],
        [3, "10/09/2019", "Hamesh Supre", "Pending", "300ASD" , "Review"]],
        placeholder_orders:[
          [1, "10/09/2019", "Jeremy Irons", "Pending", "DXC1F2", "Review"],
          [2, "10/09/2019", "James Bond", "Complete", "0QA192" , "3"],
          [3, "10/09/2019", "Jina Bond", "Complete", "10FJA8" , "Review"],
          [3, "10/09/2019", "Hamesh Supre", "Pending", "300ASD" , "Review"]
        ],
        reviewShow:false,
        reviewOrder:[null], //SELECTED ORDER
        reviews: [],
        orders_formatted:[
          [1, "10/09/2019", "Jeremy Irons", "Pending", "DXC1F2", "Review"],
          [2, "10/09/2019", "James Bond", "Complete", "0QA192" , "3"],
          [3, "10/09/2019", "Jina Bond", "Complete", "10FJA8" , "Review"],
          [3, "10/09/2019", "Hamesh Supre", "Pending", "300ASD" , "Review"]
        ],
        fetchFail: false,
        forUser: "",
      }
    }


    componentDidMount() {
      this.fetchOrders();
      if (this.state.fetchFail) {
        this.setState({orders_formatted:this.state.placeholder_orders});
      }
      // this.fetchReviews();
      // this.combineOrdersReviews();
    }

    fetchOrders = () => {
      //Fetching all food orders attached to provider ID
      let endpoint = `http://localhost:9090/api/foodorder/provider/${this.props.userId}`;
      fetch(endpoint)
      .then(response => {
      if(response.status !== 200) {
        //console.log("ERROR: Fetch foodOrder by ID not working");
        this.setState({placeholder: "ERROR: Could not connect to server."});
        return null;
        this.setState({orders:this.state.placeholder_orders})
        this.setState({fetchFail: true});
      }
        return response.json();
      })
      .then(data => {
        if(data) {
          //console.log("Fetching foodOrder by ID")
          //console.log(data);
          this.setState({
            orders:data,
          });
        }
      }).then(this.fetchReviews)
    }

    fetchReviews = () => {
      if (!this.state.fetchFail) {
        let endpoint = `http://localhost:9090/api/review/by/provider/${this.props.userId}`;
        fetch(endpoint)
        .then(response => {
        if(response.status !== 200) {
          //console.log("ERROR: Fetch review/byUser by ID not working");
          return null;
        }
          return response.json();
        })
        .then(data => {
          if(data) {
            //console.log("Fetching review/byUser by ID")
            //console.log(data);
            this.setState({reviews:data,
              loaded:true,
            });
          }
        }).then(this.combineOrdersReviews)
      }
      //FETCH BY AUTHOR
    }

    getNameFromId = (userId) => {
      let ret_val = ""
      let endpoint = `http://localhost:9090/api/user/${userId}`;
      fetch(endpoint)
      .then(response => {
      if(response.status !== 200) {
        //console.log("ERROR: getNameFroId not working");
        return null;
      }
        return response.json();
      })
      .then(data => {
        if(data) {
          //console.log("Fetching provider name by ID")
          //console.log(data);
          ret_val = data.name;
        }
      })
      return ret_val;
    }

    combineOrdersReviews = () => {
      let table = [];
      for (let i = 0; i < this.state.orders.length; i++) {
        let order = this.state.orders[i];
        let after_order = [];
        after_order[0] = order.userId;
        // after_order[1] = Date(order.orderTime.substring(0,10)).toString().substring(4,15);
        var date = new Date(order.orderTime).toString().substring(4,15);
        after_order[1] = date;
        after_order[2] = order.userId.name;
        after_order[3] = order.orderStatus;
        after_order[4] = order.id;
        if (this.state.orders.orderStatus == "Expired") {
          after_order[5] = "Invalid"
        } else if (this.state.orders.ordeStatus == "Pending") {
          after_order[5] = "Order Incomplete"
        } else {
          after_order[5] = "Review";
          console.log(this.state.reviews)
          for (let j = 0; j < this.state.reviews.length; j++) {
            if (this.state.reviews[j].owner.id == order.userId) {
              after_order[5] = this.state.reviews.rating;
            }
          }
          this.setState({forUser:order.userId.id})
          table.push(after_order);
        }
      }
      this.setState({orders_formatted: table});
    }

    handleButtonClick = (wantsAll) => {
      this.setState({isViewAll:wantsAll});
    }

    handleReviewShow = (currOrder) => {
      this.setState({reviewShow:true});
      this.setState({reviewOrder:currOrder});
    }

    handleReviewClose = () => {
      this.setState({reviewShow:false});
    }


    createTable = () => {
      let table = [];
      //console.log(this.state.orders_formatted);
      //console.log(this.state.isViewAll);
      for (let i = 0; i < this.state.orders_formatted.length; i++) {
        let order = this.state.orders_formatted[i];
        let reviewColumn = [];
        if (order[5] == "Review") {
          if (order[3]=="Completed") {
            reviewColumn.push(<Button onClick={()=>this.handleReviewShow(order)}>Review Now</Button>);
          } else {
            reviewColumn.push(<p><i>Order Incomplete</i></p>);
          }
        } else if (order[5] == "Invalid") {
          reviewColumn.push(order[5]);
        } else if (Number(order[5]) != null){
          reviewColumn.push(<StarRatings starDimension="30px" starSpacing="1px" starRatedColor="black"
            rating={Number(order[5])} numberOfStars={5}/>)
        }

        if (this.state.isViewAll==true || (this.state.isViewAll==false && order[3] == "Pending")) {
          let link = `/order_detail/${order[4]}`;
          table.push(
            <tr>
              <td>{order[1]}</td>
              <td>{order[2]}</td>
              <td>{order[3]}</td>
              <td>{order[4]} <Link to={link} id={order[4]}><Button className="float-right" variant="link">Order Details</Button></Link></td>
              <td>{reviewColumn}</td>
            </tr>
          )
        }
      }

      return table;
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <h2>Provider Orders</h2>
              <ButtonGroup>
                <Button size="lg" onClick={() => this.handleButtonClick(false)} variant={this.state.isViewAll?"outline-secondary":"secondary"}>Pending</Button>
                <Button size="lg" onClick={() => this.handleButtonClick(true)} variant={this.state.isViewAll?"secondary":"outline-secondary"}>All</Button>
              </ButtonGroup>

              { this.state.loaded ?
              <div className="Dashboard-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>ORDER ID</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.createTable()}
                  </tbody>
                </Table>
              </div>
              : <p className="placeholder">{this.state.placeholder}</p>}
              {this.state.orders_formatted.length==0&&
                <p className="placeholder">No Results</p>
              }
              <ReviewModal show={this.state.reviewShow} userSubtype={this.props.userSubtype} userType={this.props.userType}
              onHide={this.handleReviewClose} order={this.state.reviewOrder} userId={this.props.userId}/>
            </div>
        )
    }
}

export default DashboardProvider;
