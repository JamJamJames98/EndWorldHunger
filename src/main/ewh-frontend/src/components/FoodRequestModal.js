import React from "react";
import { Link } from "react-router-dom";
import {Table, Form, Container, Row, Col, Button, OverlayTrigger, Popover, Modal} from "react-bootstrap";
import Slider from '@material-ui/core/Slider';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css";
// var DatePicker = require("react-bootstrap-date-picker");
import DatePicker from "react-datepicker";
// import {registerLocale, setDefaultLocale} from "react-datepicker";
// import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
// import Moment from 'react-moment';

const startDate = new Date().toLocaleDateString();


class FoodRequestModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFood: 0,
            foodAmount: 1,
            pickUpDate: new Date(),
            noteText: "",
            //userDailyLimit: 0,
            foodModel: "",
            hasFetched: false,
        }
    }

    handleFoodAmountChange = (event, newValue) => {this.setState({foodAmount: newValue});}

    componentDidUpdate() {
        if (this.props.selectedFood != this.state.selectedFood){
          this.setState({selectedFood: this.props.selectedFood});
        }
    }

    handleOrderSubmit = (event) => {

      var ret_val = {
        "foodItem": this.props.selectedFood,
        "orderTime": this.state.pickUpDate.toISOString(),
        "orderStatus": "Pending",
        "quantity": this.state.foodAmount,
      }
      //console.log(ret_val)
      let endpoint = `http://localhost:9090/api/foodorder/provider/${this.props.selectedFood.provider.id}/${this.props.userId}/`;
      axios.post(endpoint, ret_val)
      .then(res => {
        //console.log("ORDERING FOOD");
        //console.log(res);
        //console.log(res.data);
        //console.log("HIHIHIHI");
      })
    }
    handleNoteChange = (event, newValue) => {
      this.setState({noteText: newValue});
    }

    handlePickUpDateChange = (date) => {
      //console.log(date.toISOString());
      this.setState({pickUpDate: date});
    }

    getMax = () => {
      //console.log("-------")
      //console.log(this.props.selectedFood.quantity);
      //console.log(this.props.userDailyLimit);
      const max = Math.min(this.props.selectedFood.quantity, this.props.userDailyLimit);
      //console.log("Max:", max);
      if (max) {
        return max;
      } else {
        return 10;
      }
    }

    render() {
        return (
            <div>
            {this.props.userDailyLimit >= 0?
                <>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                  <Form onSubmit={this.handleOrderSubmit}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <h3>Pick-Up Food</h3>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>{this.props.selectedFood.name}</h4>
                          <p>{`Quantity: ${this.state.foodAmount} serving${
                            this.state.foodAmount != 1 ? "s" : ""
                          }`}</p>
                          <Form.Label>Specify Quantity</Form.Label>
                          <Slider
                              className="order-slider"
                              value={this.state.foodAmount}
                              onChange={this.handleFoodAmountChange}
                              valueLabelDisplay="auto"
                              min={0}
                              max={this.getMax()}
                          />

                            <Form.Label>Pick Up By</Form.Label>
                            <p>
                              <DatePicker showTimeSelect 
                                dateFormat="dd/MM/yyyy p" 
                                selected={this.state.pickUpDate} 
                                onChange={this.handlePickUpDateChange} 
                                className="request-datepicker"></DatePicker>
                            </p>
                            <Form.Label>Notes for Food Provider</Form.Label>
                            <Form.Control placeholder="(Optional)"
                              value={this.state.noteText} onChange={this.handleNoteChange} as="textarea" type="text" rows="5"/>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                          </Button>
                          <Button variant="primary" type="submit">
                            Submit Order
                          </Button>
                        </Modal.Footer>
                    </Form>
                  </Modal>
                  </>
                  :
                  <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h1>Error:</h1>
                      </Modal.Title>
                      <Modal.Body>
                        <p>User Daily Limit Exceeded :(</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                          Go Back
                        </Button>
                      </Modal.Footer>
                    </Modal.Header>
                  </Modal>

            }
            </div>
        )
    }
}

export default FoodRequestModal;
