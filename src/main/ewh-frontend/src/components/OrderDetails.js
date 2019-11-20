import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ReportModal from './ReportModal';
import ReviewModal from './ReviewModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope} from '@fortawesome/free-solid-svg-icons';

class OrderDetails extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        /*-----DUMMY DATA-----*/
        id:"DXC1F2",
        name:"Jeremy Irons",
        date:"10/09/2019",
        time:"9:30pm",
        phone:"0400000000",
        email:"john.smith@gmail.com",
        order_contents: [
          // ["Banana", "5"],
          // ["Tomato", "2"],
          // ["Spaghetti", "2"],
          // ["Lettuce", "1"]
        ],
        loaded: false,
        placeholder: "Loading...",
        status:"Completed",
        order: [],
        isFetching: false,
        placeholder: "Loading...",
        orderFrom: [],
        isProvider: false,
        isFound: true,
        showReport:false,
        showReview:false,
        selfUsername:"",
        forUser:"",
        // fetchedOnce:0,
        /*-----DUMMY DATA-----*/
      }

    }

    componentDidMount() {
      //FETCH ORDER DETAILS BASED ON this.props.match.params.id;
      console.log(this.props.match.params.id)
      this.setState({isFetching: true});
      let endpoint = "";
      if (this.props.userType == "P") {
        endpoint = `http://localhost:9090/api/foodorder/provider/${this.props.userId}`;
      } else {
        endpoint = `http://localhost:9090/api/foodorder/user/${this.props.userId}`;
      }
      fetch(endpoint)
      .then(response => {
      if(response.status !== 200) {
        console.log("ERROR: getFoodOrder in OrderDetails not working");
        return null;
      }
        return response.json();
      })
      .then(data => {
        if(data) {
          console.log("Fetching getFoodOrder in OrderDetails")
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            //Matches orderCode to url parameter
            if (data[i].id == this.props.match.params.id) {
              console.log(data[i])
              this.setState({isFound:true})
              if (this.props.userType == "P") {
                this.setUserIsProvider(data[i]);
                this.setState({isProvider:true});
              } else {
                this.setUserIsConsumer(data[i]);
              }
            } else {
              this.setState({
                placeholder: "ERROR: Order Not Found"})
            }
          }
          this.setState({isFetching: false, loaded: true});
        }
      }).then(this.createTable)
    }

    formatTime = (dT) => {
      var dateTime = new Date(dT).toString();
      var time = dateTime.substring(15,21);
      var ending = "am";
      if (Number(time.substring(0,3) > 11)) {
        ending = "pm";
        if (Number(time.substring(0,3)) != 12) {
          time = (Number(time.substring(0,3)) - 12);
        }
      }
      var fTime = time.toString() + ending;
      var date = dateTime.substring(4,15);
      return {
        time: fTime,
        date: date,
      }
    }


    setUserIsConsumer = (data) => {
      this.setState({order:data})
      this.setState({orderFrom:data.providerId})
      const provider = data.providerId;
      /*---------------FORMATTING DATE AND TIME---------------*/
      var dateTime = this.formatTime(data.orderTime);
      /*-------------------------------------------------------*/
      //Setting State
      this.setState({selfUsername:data.userId.username, location:data.providerId.location})
      this.setState({name:provider.providerName, date:dateTime.date,
      time:dateTime.time, phone:provider.phoneNumber, email:provider.email, id:this.props.match.params.id, status:data.orderStatus});
      this.setState({order_contents:[[data.foodItem.name, data.quantity]]});
      this.setState({forUser:provider.id})
    }

    setUserIsProvider = (data) => {
      this.setState({order:data})
      this.setState({orderFrom:data.userId})
      const consumer = data.userId;
      /*---------------FORMATTING DATE AND TIME---------------*/
      var dateTime = this.formatTime(data.orderTime);
      /*-------------------------------------------------------*/
      //Setting State
      this.setState({selfUsername:data.providerId.username, location:data.providerId.location})
      this.setState({name:consumer.name, date:dateTime.date,
      time:dateTime.time, phone:consumer.phoneNumber, email:consumer.email, id:this.props.match.params.id, status:data.orderStatus})
      this.setState({order_contents:[[data.foodItem.name, data.quantity]]});
      this.setState({forUser:consumer.id})
    }

    createTable = () => {
      let table = [];
      console.log(this.state.order_contents);
      for (let i = 0; i < this.state.order_contents.length; i++) {
        let order = this.state.order_contents[i];
          table.push(
            <tr>
              <td>{order[0]}</td>
              <td>{order[1]}</td>
            </tr>
          )
      }
      // return table;
      this.setState({table:table})
    }

    completeOrder = () => {
        //ADDING USER
        // let result = "";
        let endpoint = `http://localhost:9090/api/foodorder/${this.state.order.id}/Completed`;
        axios.put(endpoint)
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log("HIHIHIHI");
          // result = res.data;
        })
        // }).then(this.updateProvider)

        //UPDATE POINTS AND STREAKS
        // this.updateProvider();
      }
      //REALLY BAD!!!!
    updateProvider = () => {
      let endpoint = `http://localhost:9090/api/provider/${this.props.userId}`;
      axios.get(endpoint)
      .then(data => {
        let new_data = data.data;
        let points = new_data.points;
        new_data.points = points+1;
        console.log(new_data)
        console.log("askdjashd")
        axios.put(endpoint, new_data)
        .then(res => {
          console.log(res);
        })
      })
    }

    handleShowReport = () => {
      this.setState({showReport:true});
    }
    handleHideReport = () => {
      this.setState({showReport:false});
    }
    handleShowReview = () => {
      this.setState({showReview:true});
    }
    handleHideReview = () => {
      this.setState({showReview:false});
    }
    handleReportSubmit = () => {
      this.handleShowReview();
    }


    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              {// <h1>{this.props.id}</h1>
              // <h1>{this.props.location.state[0]}</h1>
              //<h1>{this.props.match.params}</h1>
              //<h1>{this.props.location.pathname}</h1>
              }
              { this.state.loaded && this.state.isFound ?
                <>
              <h2>Order Details</h2>
              <div className="OrderDetails-contact">
                <h4>{this.state.name}</h4>
                {this.state.status=="Completed"?<Button variant="outline-success" onClick={this.handleShowReview}>Review</Button>:""}
                <p><FontAwesomeIcon icon={faPhone} fixedWidth/> {this.state.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} fixedWidth/> {this.state.email}</p>
                { this.props.userType == "C" &&
                <p><FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth/> {this.state.location}</p>}
                <Button variant="outline-danger" onClick={this.handleShowReport}>Report</Button>

              </div>

              <div className="OrderDetails-order-details">
                <h3>Order ID: {this.state.id}</h3>
                <h4 style={{fontStyle:"italic"}}>{this.state.status}</h4>
                <h6>Pick Up Time: {this.state.date} {this.state.time}</h6>      
              </div>
              
              <div className="Order-table">
                <br/>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.table}
                  </tbody>
                </Table>
              </div>

              <div className="OrderDetails-buttons">
              <Form onSubmit={this.completeOrder}>
                <ButtonToolbar className="OrderDetails-buttons">
                  <Link to="/Dashboard"><Button variant="secondary">Back</Button></Link>
                  {(this.state.order.orderStatus=="Pending" && this.state.isProvider) ?
                  <Button variant="success" type="submit" onClick={this.completeOrder}>Complete</Button>:""
                  }
                </ButtonToolbar>
              </Form>
              <ReportModal show={this.state.showReport} onHide={this.handleHideReport} submit={this.handleReportSubmit} order={this.state.order} forUser={this.state.forUser}
              userId={this.props.userId} userType={this.props.userType} selfUsername={this.state.selfUsername}/>
              <ReviewModal show={this.state.showReview} order={this.state.order} onHide={this.handleHideReview} userId={this.props.userId}
              userType={this.props.userType} forUser={this.state.forUser}/>
              </div>
              </>: <p className="placeholder">{this.state.placeholder}</p>
            }
            </div>
        )
    }
}

export default OrderDetails;
