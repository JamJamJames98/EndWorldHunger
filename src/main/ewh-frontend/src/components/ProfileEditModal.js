import React from "react";
import {Button, Modal, Form} from "react-bootstrap";
import axios from "axios";
//import { MDBFileInput } from "mdbreact";

class ProfileEditModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phone:"",
            email:"",
        }
    }

    handlePhoneChange = (event) => {
      this.setState({phone: event.target.value});
    }

    handleEmailChange = (event) => {
      this.setState({email: event.target.value});
    }

    handleSubmit = () => {
      if (this.props.email != this.state.email || this.props.phone != this.state.phone) {
        let user = this.props.user;
        user.phoneNumber = this.state.phone;
        user.email = this.state.email;

        axios.put(`http://localhost:9090/api/user/${user.id}`, user)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        // this.props.history.push('/profile')
      }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                  <Modal.Body>
                      <Form>
                          <Form.Group controlId="formName">

                              <Form.Label>Edit Phone Number</Form.Label>
                              <Form.Control placeholder="e.g. +61400000000"
                                value={this.state.phone} onChange={this.handlePhoneChange} type="text" rows="1"/>

                              <Form.Label>Edit Email</Form.Label>
                              <Form.Control placeholder="e.g. abc@gmail.com"
                                value={this.state.email} onChange={this.handleEmailChange} type="text" rows="1"/>

                          </Form.Group>
                      </Form>
                  </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={this.props.onHide}>
                      Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                      Save
                  </Button>
                  </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ProfileEditModal;
