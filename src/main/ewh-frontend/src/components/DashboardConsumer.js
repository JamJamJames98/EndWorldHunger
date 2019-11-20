import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import StarRatings from "react-star-ratings";

import ReviewModal from './ReviewModal';

class DashboardConsumer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        placeholder: "Loading...",
        isViewAll:false,
        reviewShow:false,
        reviewOrder:[null],
        reviews: [{"rating":0, "owner":{"id":0}}],
        orders:[
          [1, "10/09/2019", "Guzman y Gomez Broadway", "PENDING", "DXC1F2", "3"],
          [2, "09/09/2019", "McDonalds Broadway", "COMPLETE", "EF1OF2", "Review"],
          [3, "30/08/2019", "Lentil As Anything Newtown", "EXPIRED", "L5M8AO", "Invalid"]
        ],
        orders_formatted:[],
        isFetching:false,
        placeholder: "Loading...",
        forUser:""
      }
    }


    componentDidMount() {
      // console.log(this.props.userId);
      // this.setState({isFetching:true});
      this.fetchOrders();
      // // this.fetchReviews();
      // // this.combineOrdersReviews();
      // this.setState({isFetching:false});
      this.setState({orders_formatted: this.state.orders})
    }

    fetchOrders = () => {
      //Fetching all food orders attached to user ID
      let endpoint = `http://localhost:9090/api/foodorder/user/${this.props.userId}`;
      // let endpoint = `http://localhost:9090/api/foodorder/user/1`;
      fetch(endpoint)
      .then(response => {
      if(response.status !== 200) {
        //console.log("ERROR: Fetch foodOrder by ID not working");
        this.setState({placeholder: "ERROR: Could not connect to server."})
        return null;
      }
        return response.json();
      })
      .then(data => {
        if(data) {
          //console.log("Fetching foodOrder by ID")
          //console.log(data);
          this.setState({orders:data});
        }
      }).then(this.fetchReviews)
    }

    fetchReviews = () => {
      //FETCH BY AUTHOR
      let endpoint = `http://localhost:9090/api/review/by/user/${this.props.userId}`;
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
          this.setState({reviews:data, loaded:true});
        }
      }).then(this.combineOrdersReviews())
    }


    combineOrdersReviews = () => {
      let table = [];
      //console.log(this.state.orders);
      //console.log("---------")
      for (let i = 0; i < this.state.orders.length; i++) {
        let order = this.state.orders[i];
        let after_order = [];
        after_order[0] = order.foodItem.provider.id;
        var date = new Date(order.orderTime).toString().substring(4,15);
        after_order[1] = date;
        after_order[2] = order.foodItem.provider.providerName;
        after_order[3] = order.orderStatus;
        after_order[4] = order.id;
        if (this.state.orders.orderStatus == "Expired") {
          after_order[5] = "Invalid"
        } else if (this.state.orders.orderStatus == "Pending") {
          after_order[5] = "Pending"
        } else {
          after_order[5] = "Review";
          //console.log(this.state.reviews)
          //console.log("----")
          for (let j = 0; j < this.state.reviews.length; j++) {
            if (this.state.reviews[j].owner.id == order.providerId) {
              after_order[5] = this.state.reviews.rating;
            }
          }
          this.setState({forUser:order.providerId.id})
          table.push(after_order);
        }
      }
      //console.log(table);
      this.setState({orders_formatted: table});
      this.setState({isFetching:false})
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
              <td>
                  <Link to={`/provider/${order[0]}`}>{order[2]}</Link>
              </td>
              <td>{order[3]}</td>
              <td>{order[4]}<Link to={link} id={order[4]}><Button className="float-right" variant="link">Order Details</Button></Link></td>
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
              <h2>Consumer Orders</h2>
              <ButtonGroup>
                <Button size="lg" onClick={() => this.handleButtonClick(false)} variant={this.state.isViewAll?"outline-secondary":"secondary"}>Pending</Button>
                <Button size="lg" onClick={() => this.handleButtonClick(true)} variant={this.state.isViewAll?"secondary":"outline-secondary"}>All</Button>
              </ButtonGroup>
              { this.state.loaded ?
                <>
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
                    {this.state.isFetching?this.state.placeholder:this.createTable()}
                  </tbody>
                </Table>
              </div>
              </>
              : <p className="placeholder">{this.state.placeholder}</p>}
              {this.state.orders_formatted.length==0&&
                <p className="placeholder">No Results</p>
              }
              {/*Pop up for reviewing*/}
              <ReviewModal show={this.state.reviewShow} userSubtype={this.props.userSubtype} userType={this.props.userType}
              onHide={this.handleReviewClose} order={this.state.reviewOrder} userId={this.props.userId} forUser={this.state.forUser}/>
            </div>
        )
    }
}

export default DashboardConsumer;
