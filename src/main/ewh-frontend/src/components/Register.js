import React from "react";
import { Link } from "react-router-dom";
import {Form, Button, Card, Row, Col} from "react-bootstrap";
import axios from 'axios';

class Register extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        location: "",


        isShortName:false,
        isShortUsername:false,
        isShortPassword:false,
        isInvalidEmail:false,
        isInvalidPhone:false,
        isInvalidLocation:false,
        usernameTaken:false,

        isConsumer: false,
        hasChosen: false,
        isProvider: false,
        userType: "",
        type: "Choose...",
      }
    }
    getUserFromDB = () => {



    }
    handleSubmit = () => {
      if (this.validateInput()) {
        let endpoint = ''
        let ret_content = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phoneNumber: this.state.phone,
          status: "active"
        };
        if (this.state.isProvider) {
          endpoint = `http://localhost:9090/api/provider`;
          ret_content.providerName = this.state.name;
          ret_content.location = this.state.location;
          ret_content.providerType = this.state.type;
        } else {
          endpoint = `http://localhost:9090/api/user`;
          ret_content.name = this.state.name;
          ret_content.consumerType = this.state.type;
        }
        //console.log(ret_content);

        //ADDING USER
        let result = ""
        axios.post(endpoint, ret_content)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          //this.props.updateUser(res.data, this.state.userType);
          //console.log("HIHIHIHI");
          result = res.data;
          //console.log(result);
          this.props.updateAppStatus({
              isLoggedIn:true,
              user: this.state.name,
              userType: this.state.userType,
              userSubtype: this.state.type[0],
              userId: res.data.id,
          });
        })

        this.props.history.push('/');
      }
    }

    validateInput = () => {
      let valid = true;
      if (8 > this.state.password.length) {
        this.setState({password: "", isShortPassword: true});
        valid = false;
      }
      if (8 > this.state.username.length) {
        this.setState({username: "", isShortUsername: true});
        valid = false;
      }
      if (2 > this.state.name.length) {
        this.setState({name: "", isShortName: true});
        valid = false;
      }
      var regex = /[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9]*/;
      if (!regex.test(this.state.email)) {
        this.setState({email: "", isInvalidEmail: true});
        valid = false;
      }
      var regex1 = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
      if (!regex1.test(this.state.phone)) {
        this.setState({phone: "", isInvalidPhone: true});
        valid = false;
      }

      //Check if username is taken
      let endpoint = '';
      if (this.state.isConsumer) {
        this.setState({userType: "C"})
        endpoint = `http://localhost:9090/api/user/`;
      } else {
        this.setState({userType: "P"})
        endpoint = `http://localhost:9090/api/provider`;
      }
      fetch(endpoint)
      .then(response => {
        if(response.status !== 200) {
          //console.log("Something went wrong");
          return null;
        }
        return response.json();
      })
      .then(data => {
          if(data) {
            //console.log("data is being fetched")
            //console.log(data);
            let isSuccessful = false;
            for(var i = 0; i < data.length; i++){
              if (data[i].username == this.state.username) {
                //console.log("USERNAME TAKEN")
                this.setState({usernameTaken:true});
                valid = false;
                break;
              }
            }
          }
      })
      return valid;
    }

    handleUsernameChange = (event) => {
      this.setState({username: event.target.value});
      this.setState({isShortUsername: false, usernameTaken: false});
    }

    handlePassword = (event) => {
      this.setState({password: event.target.value});
      this.setState({isShortPassword: false});
    }

    handleClickType = (newValue) => {
      this.setState({isConsumer: newValue});
      this.setState({isProvider: !newValue});
      this.setState({hasChosen: true});
      this.setState({type: "Choose..."});
      if (newValue) {
        this.setState({userType: "C"});
      } else {
        this.setState({userType: "P"});
      }
    }

    handleChooseSubType = (event) => {
      this.setState({type: event.target.value});
    }

    handleNameChange = (event) => {
      this.setState({name: event.target.value});
      this.setState({isShortName: false});
    }

    handleEmailChange = (event) => {
      this.setState({email: event.target.value});
      this.setState({isInvalidEmail: false});
    }

    handlePhoneChange = (event) => {
      this.setState({phone: event.target.value});
      this.setState({isInvalidPhone: false});
    }

    handleLocationChange = (event) => {
      this.setState({location: event.target.value});
      this.setState({isInvalidLocation: false});
    }


    render() {
        return (
            <div>
            <Card style={{width: '30rem', margin: 'auto'}}>
            <Card.Header>
              Register
            </Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>I am a</Form.Label>
                    <Row className= "ml-auto">
                    <Col>
                        <Form.Check
                          type="radio"
                          label="Consumer"
                          checked={this.state.isConsumer}
                          onClick={()=>this.handleClickType(true)}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Provider"
                          checked={this.state.isProvider}
                          onClick={()=>this.handleClickType(false)}
                        />
                      </Col>
                    </Row>
                    </Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={this.state.name} onChange={this.handleNameChange} type="text" rows="1"/>
                    {this.state.isShortName?<div className="Register-Login-error">Name must be more than 2 characters</div>:""}

                  <Form.Label>Email</Form.Label>
                  <Form.Control value={this.state.email} onChange={this.handleEmailChange} type="text" rows="1"/>
                    {this.state.isInvalidEmail?<div className="Register-Login-error">Email must be in valid format</div>:""}

                  <Form.Label>Phone</Form.Label>
                  <Form.Control value={this.state.phone} onChange={this.handlePhoneChange} type="text" rows="1"/>
                    {this.state.isInvalidPhone?<div className="Register-Login-error">Phone must be in valid format +61400000000</div>:""}

                  {this.state.isProvider&&
                    <>
                    <Form.Label>Location</Form.Label>
                    <Form.Control value={this.state.location} onChange={this.handleLocationChange} type="text" rows="1"/>
                      {this.state.isInvalidLocation?<div className="Register-Login-error">Location must be in valid format</div>:""}
                    </>
                  }


                  <Form.Label>Username</Form.Label>
                  <Form.Control value={this.state.username} onChange={this.handleUsernameChange} type="text" rows="1"/>
                    {this.state.isShortUsername?<div className="Register-Login-error">Username must be more than 8 characters</div>:""}
                    {this.state.usernameTaken?<div className="Register-Login-error">Username is taken. Please choose another username.</div>:""}

                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={this.handlePassword}  type="password" rows="1"/>
                    {this.state.isShortPassword?<div className="Register-Login-error">Password must be more than 8 characters</div>:""}


                  

                  {this.state.hasChosen?
                    <>
                        {this.state.isConsumer?
                            <div>
                              <br/>
                            <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>Consumer Type</Form.Label>
                              <Form.Control as="select" value={this.state.type} onChange={this.handleChooseSubType}>
                                <option>Choose...</option>
                                <option>Individual</option>
                                <option>Charity</option>
                                <option>Organisation</option>
                              </Form.Control>
                            </Form.Group>
                            </div>
                        :
                          <div>
                            <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>Provider Type</Form.Label>
                              <Form.Control as="select" value={this.state.type} onChange={this.handleChooseSubType}>
                                <option>Choose...</option>
                                <option>Restaurant</option>
                                <option>Supermarket</option>
                              </Form.Control>
                            </Form.Group>
                            </div>
                        }
                      </>
                    :
                        ""
                    }

                          <Button className="float-right" variant="primary"  onClick={this.handleSubmit}>
                            Register
                          </Button>

              </Form>
            </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Register;
