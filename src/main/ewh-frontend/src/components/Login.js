import React from "react";
import { Link, Redirect } from "react-router-dom";
import {Form, Button, Card, Row, Col} from "react-bootstrap";

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        username: "",
        password: "",
        isIncorrect: false,
        user: "",
        isSuccessful: true,
        isConsumer:true,
        isProvider:false,
        isAdmin:false,
        type:"",
        lockedPlaceholder:"Account locked. Contact administrator for help.",
        isActive:true,
        //loggedIn: false,
      }
    }

    handleSubmit = () => {
      //FETCH
      let endpoint = '';
      if (this.state.isConsumer) {
        this.setState({type: "C"})
        endpoint = `http://localhost:9090/api/user`;
      } else {
        this.setState({type: "P"})
        endpoint = `http://localhost:9090/api/provider`;
      }
      fetch(endpoint)
      .then(response => {
        if(response.status !== 200) {
          console.log("Something went wrong");
          return null;
        }
        return response.json();
      })
      .then(data => {
        if(data) {
          let isSuccessful = false;
          //console.log(data);
          for(var i = 0; i < data.length; i++){
            if (data[i].username == this.state.username) {
              if (data[i].status != "active") {
                this.setState({isActive: false});
                break;
              }
              if (data[i].password == this.state.password) {
                let userType = "";
                let userSubtype = "";
                let name="";
                if(this.state.isConsumer){
                  if (this.state.username=="admin") {
                    userType = "A";
                    userSubtype = "Admin";
                    name = data[i].username;
                  } else {
                    userType = "C";
                    userSubtype = data[i].consumerType;
                    name = data[i].name;
                  }
                } else {
                  userType = "P";
                  userSubtype = data[i].providerType;
                  name = data[i].providerName
                }
                this.setState({user: data[i]});
                //this.props.updateUser(this.state.user, this.state.type);
                this.props.updateAppStatus({
                    isLoggedIn:true,
                    user: name,
                    userType: userType,
                    userSubtype: userSubtype[0],
                    userId: data[i].id,
                });
                isSuccessful = true;
                break;
              }
              break;
            }
          }
          this.setState({isIncorrect:!isSuccessful});
          if (isSuccessful) {
            this.props.history.push('/');
          }
        }
      })
      //For now: User is not successful:
      //this.setState({isIncorrect:true})
    }

    handleUsernameChange = (event) => {
      this.setState({username: event.target.value});
      this.setState({isIncorrect: false});
    }

    handlePassword = (event) => {
      this.setState({password: event.target.value});
      this.setState({isIncorrect: false});
    }

    handleClickType = (bool) => {
      this.setState({isConsumer: bool, isProvider: !bool});
    }



    render() {
        return (
            <div>
            <Card style={{width: '18rem', margin: 'auto'}}>
            <Card.Header>
              Log In
            </Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control value={this.state.username} onChange={this.handleUsernameChange} type="text" rows="1"/>
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={this.handlePassword}  type="password" rows="1"/>

                  <Form.Group>
                  <Row className= "ml-auto mt-3">
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

                  <div className="mt-1 float-right">
                    <Button variant="primary" onClick={this.handleSubmit}>
                      Log In
                    </Button>
                  </div>
                  {(this.state.isIncorrect && this.state.isActive)?<div className="Register-Login-error">Username and/or Password is incorrect</div>:""}
                  {!this.state.isActive?<div className="Register-Login-error">{this.state.lockedPlaceholder}</div>:""}
                {  // {this.state.isLoggedIn?<Redirect to='/dashboard'/>:""}
                }
              </Form>
            </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Login;
