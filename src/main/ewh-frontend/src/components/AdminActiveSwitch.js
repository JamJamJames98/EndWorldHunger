import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from 'axios';

class AdminActiveSwitch extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        // userID: 0,
        // userType: "",
        // userName: "",
        // email: "",
        // phone: "",
        // reportInfo: [],
        // banInfo: [],
        // isActive:true,
        // filter:"",
        // name:"",
        userData: "",
      }
    }

    componentWillMount() {
      let endpoint = ""
      if (this.props.isConsumer) {
        endpoint = `http://localhost:9090/api/user/${this.props.user.id}`
      } else {
        endpoint = `http://localhost:9090/api/provider/${this.props.user.id}`
      }
      axios.get(endpoint)
      .then(res => {
        this.setState({userData:res.data})
      })
    }

    handleActiveClick = (hasActivated) => {
      this.setState({isActive:hasActivated});
    }

    handleResolveClick = () => {
      this.setState({filter:"Search", isActive:true})
      //POST THIS
      let endpoint = ""
      if (this.props.isConsumer) {
        endpoint = `http://localhost:9090/api/report/user/${this.props.user.reportId}`
      } else {
        endpoint = `http://localhost:9090/api/report/provider/${this.props.user.reportId}`
      }
      axios.delete(endpoint, {})
      .then(res => {
        console.log(res.data);
      })
    }

    handleBanClick = () => {
      this.setState({filter:"Search", isActive:true})
      //POST THIS
      let endpointBan = ""
      let retBan = ""
      if (this.props.isConsumer) {
        endpointBan = "http://localhost:9090/api/ban/user/";
        retBan = {
          	"userId": {
          		"id": this.props.user.id
          	},
          	"reason": "Reported",
          	"banTime": new Date().toISOString(),
          	"bannedBy": "admin"
          }
      } else {
        endpointBan = "http://localhost:9090/api/ban/provider/";
        retBan = {
            "providerId": {
              "id": this.props.user.id
            },
            "reason": "Reported",
            "banTime": new Date().toISOString(),
            "bannedBy": "admin"
          }
      }

      axios.post(endpointBan, retBan)
      .then(res => {
        console.log(res.data);
      }).then(this.handleResolveClick).then(this.updateUserLock)
    }

    handleActivateClick = () => {
      // this.setState({filter:"Search", isActive:true})
      //POST THIS
      let endpoint = ""
      if (this.props.isConsumer) {
        endpoint = `http://localhost:9090/api/ban/user/${this.props.user.banId}`
      } else {
        endpoint = `http://localhost:9090/api/ban/provider/${this.props.user.banId}`
      }
      axios.delete(endpoint, {})
      .then(res => {
        console.log(res.data);
      }).then(()=>this.updateUserActive())
    }

    updateUserActive = () => {
      let endpoint = "";
      if (this.props.isConsumer) {
        endpoint = `http://localhost:9090/api/user/${this.props.user.id}`
      } else {
        endpoint = `http://localhost:9090/api/provider/${this.props.user.id}`
      }
      let userData = this.state.userData;
      userData.status="active";
      axios.put(endpoint, userData)
      .then(res_t=> {
        console.log(res_t.data)
      })
    }
    updateUserLock = () => {
      let endpoint = ""
      if (this.props.isConsumer) {
        endpoint = `http://localhost:9090/api/user/${this.props.user.id}`
      } else {
        endpoint = `http://localhost:9090/api/provider/${this.props.user.id}`
      }
      let userData = this.state.userData;
      userData.status="locked";
      axios.put(endpoint, userData)
      .then(res_t=> {
        console.log(res_t.data)
      })
    }

    showReportButtons = () => {
      if (this.props.filter == "Reported") {
        return (
          <>
          <Button style={{float:"right"}} variant = "success" onClick={this.handleResolveClick} inline type = "submit" id={`inline-radio-3`}>
            Resolve
          </Button>
          <Button style={{float:"right"}} variant = "danger" onClick={this.handleBanClick} inline type = "submit" id={`inline-radio-3`}>
            Ban
          </Button>
          </>
        )
      }
    }

    showBanButtons = () => {
      if (this.props.filter == "Banned") {
        return (
          <>
          <Button style={{float:"right"}} variant="success" onClick={this.handleActivateClick} inline id={`inline-radio-3`}>
            Activate
          </Button>
          </>
        )
      }
    }
    showUserButtons = () => {
      if (this.props.filter == "Search") {
        return (
          <>
          {this.props.user.isActive&&
          <Button style={{float:"right"}} variant="danger" onClick={this.handleBanClick} inline  id={`inline-radio-3`}>
            Ban
          </Button>
        }
          </>
        )
      }
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <Form>
                  <div key={`inline-radio`} className="mb-3">
                  {this.props.user.isActive?"Active":"Locked"}
                    {// <Form.Check onClick={()=>this.handleActiveClick(true)} checked={this.state.isActive} inline label="Active" type="radio" id={`inline-radio-1`} />
                    // <Form.Check onClick={()=>this.handleActiveClick(false)} checked={!this.state.isActive} inline label="Lock" type="radio" id={`inline-radio-2`} />
                  }
                    {this.showReportButtons()}
                    {this.showBanButtons()}
                    {this.showUserButtons()}
                  </div>
              </Form>
            </div>
        )
    }
}

export default AdminActiveSwitch;
