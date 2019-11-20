import React from "react";
import {Button, Modal, Form} from "react-bootstrap";
//import { MDBFileInput } from "mdbreact";
import axios from 'axios';

class AddFoodModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: "",
            foodName:"",
            notes: "",
        }
    }

    handleNameChange = (event) => {this.setState({foodName:event.target.value})}
    handleAmountChange = (event) => {this.setState({amount:event.target.value})}
    handleNotesChange = (event) => {this.setState({notes:event.target.value})}

    validateInput = () => {
      if (this.state.amount.length > 0 && this.state.foodName.length > 0 && this.state.notes.length > 0) {
        return true;
      }
      return false;
    }

    handleSubmit = () => {
      if (this.validateInput()) {
        /*
        {
        	"provider": {
        		"id": 1
        	},
        	"quantity": 10,
        	"name": "Hamesh's Vegetarian Pepperonis",
        	"timePosted": "2019-10-27T20:00:50.554Z",
        	"expiry": "2019-10-30T13:34:00.055Z",
        	"description": "Vegetarian friendly!",
        	"image": "A picture of pepperonis on a grass"
        }
        */
        var ret_val = {
          "provider": {
            "id": this.props.userId
          },
          "quantity": Number(this.state.amount),
          "name": this.state.foodName,
          "timePosted": new Date(),
          "expiry": "2020-10-30T13:34:00.055Z",
          "description": this.state.notes,
        }

        let endpoint = `http://localhost:9090/api/food`;
        axios.post(endpoint, ret_val)
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log("HIHIHIHI");
          // result = res.data;
        })
      }
      // this.props.submit();
    }


    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleClose}>
            <Form onSubmit={this.handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Have food to spare?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name of food</Form.Label>
                            <Form.Control type="input" placeholder="" onChange={this.handleNameChange} type="text" rows="1"/>
                        </Form.Group>

                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="input" placeholder="" onChange={this.handleAmountChange} type="text" rows="1"/>
                        </Form.Group>

                        <Form.Group controlId="formNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type="input" placeholder="" onChange={this.handleNotesChange} type="text" rows="1"/>
                        </Form.Group>

                        {/* Note: File input using mdbreact*/}
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                    Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choose file
                                    </label>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Add Food
                </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddFoodModal;
