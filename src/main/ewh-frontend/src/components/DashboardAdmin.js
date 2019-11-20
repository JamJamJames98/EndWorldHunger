import React from "react";
import {Button, ButtonGroup, Form, Table, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminActiveSwitch from "./AdminActiveSwitch";

class DashboardAdmin extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isViewAll:true,
        users:[
          {
            id: 0,
            username: "",
            name: "",
            email: "",
            phone: "",
            type: "",
            isActive: true,
          }
        ],
         // ID | Type | Name | Email | Phone | REPORT MESSAGE | ReportedBy | ReportedAt | State {isActive}
        reported: [
          [2, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", "Did not pick up food", "Maccas", "2019-10-22", true],
          [3, "Provider", "McDonalds", "maccas@maccas.com", "123456789", "Yuck", "Alvin Ho", "2019-10-22", true],
          [4, "Organisation", "Darlington Public School", "darlington@det.nsw.edu.au", "90080809", "Disgusting pick up person", "KFC", "2019-10-22", true],
          [6, "Provider", "KFC", "kfc@kfc.com", "123456789", "Peepeepoo", "Alvin Ho", "2019-10-22", true],
        ],
        // ID | Type | Name | Email | Phone | Ban MESSAGE | Bannedby | BannedAt | State {isActive}
        banned: [
          [7, "Organisation", "Westmead Hospial", "westmead@hospital.nsw.edu.au", "90080809", "Reported", "System", "2019-10-22", false],
          [8, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", "Fraud", "2019-10-22", "Admin", false],
          [9, "Provider", "GYG", "gyg@gyg.com", "123456789", "Low Rating", "2019-10-22", "System", false]
        ],
        filter:"Search",
        searchText:"",
        search_results:"",
        isConsumer:true,
        isProvider:false,
        providers: [
          {
            id: 0,
            username: "",
            name: "",
            email: "",
            phone: "",
            type: "",
            isActive: true,
          }
        ],
        reported_users: [{
          id: 0,
          username: "",
          name: "",
          email: "",
          phone: "",
          type: "",
          isActive: true,
          reportReason: "",
          reportTime: "",
          reportedBy: ""
        }],
        reported_providers: [{
          id: 0,
          username: "",
          name: "",
          email: "",
          phone: "",
          type: "",
          isActive: true,
          reportReason: "",
          reportTime: "",
          reportedBy: ""
        }],
        banned_users: [{
          id: 0,
          username: "",
          name: "",
          email: "",
          phone: "",
          type: "",
          isActive: true,
          banReason: "",
          banTime: "",
          bannedBy: ""
        }],
        banned_providers: [{
          id: 0,
          username: "",
          name: "",
          email: "",
          phone: "",
          type: "",
          isActive: true,
          banReason: "",
          banTime: "",
          bannedBy: ""
        }],
      }
      this.handleButtonClick = this.handleButtonClick.bind(this);
    }


    componentDidMount() {
      this.fetchUsers();
      this.fetchBanned();
      this.fetchReported();
    }

    fetchUsers = () => {
      console.log("hello");
      let endpoint = `http://localhost:9090/api/user`;
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
          console.log("data is being fetched")
          console.log(data);
          let users = [];
          for(var i = 0; i < data.length; i++){
            let user = {};
            user.id = data[i].id;
            user.username = data[i].username;
            user.name = data[i].name;
            user.email = data[i].email;
            user.phone = data[i].phoneNumber;
            user.type = data[i].consumerType;
            if (data[i].status == "active"){
              user.isActive = true;
            } else {
              user.isActive = false;
            }
            users.push(user);
          }
          this.setState({users:users})
          console.log(users)
        }
      }).then(this.fetchProvider).then(() => this.updateSearchResults(true))

    }

    fetchProvider = () => {
      let endpoint = `http://localhost:9090/api/provider`;
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
          console.log("data is being fetched")
          console.log(data);
          let providers = [];
          for(var i = 0; i < data.length; i++){
            let provider = {};
            provider.id = data[i].id;
            provider.username = data[i].username;
            provider.name = data[i].name;
            provider.email = data[i].email;
            provider.phone = data[i].phoneNumber;
            provider.type = data[i].consumerType;
            if (data[i].status == "active"){
              provider.isActive = true;
            } else {
              provider.isActive = false;
            }
            providers.push(provider);
          }
          this.setState({providers:providers})
          console.log(providers)
        }
      })
    }

    fetchReported = () => {
      let endpoint = "http://localhost:9090/api/report/user"
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
          console.log("data is being fetched")
          console.log(data);
          let users = [];
          for(var i = 0; i < data.length; i++){
            let user = {};
            user.reportId = data[i].id;
            user.id = data[i].userId.id;
            user.type = data[i].userId.consumerType;
            user.username = data[i].userId.username;
            user.name = data[i].userId.name;
            user.email = data[i].userId.email;
            user.phone = data[i].userId.phoneNumber;
            user.reportReason = data[i].reason;
            user.reportTime = data[i].reportTime.substring(0,10);
            user.reportedBy = data[i].reportedBy;
            if (data[i].status == "active"){
              user.isActive = true;
            } else {
              user.isActive = false;
            }
            users.push(user);
          }
          this.setState({reported_users:users})
          console.log(users)
        }
      }).then(this.fetchReportedProviders)
    }

    fetchReportedProviders = () => {
      let endpoint = "http://localhost:9090/api/report/provider"
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
          console.log("data is being fetched")
          console.log(data);
          let users = [];
          for(var i = 0; i < data.length; i++){
            let user = {};
            user.reportId = data[i].id;
            user.id = data[i].providerId.id;
            user.type = data[i].providerId.consumerType;
            user.username = data[i].providerId.username;
            user.name = data[i].providerId.name;
            user.email = data[i].providerId.email;
            user.phone = data[i].providerId.phoneNumber;
            user.reportReason = data[i].reason;
            user.reportTime = data[i].reportTime.substring(0,10);
            user.reportedBy = data[i].reportedBy;
            if (data[i].status == "active"){
              user.isActive = true;
            } else {
              user.isActive = false;
            }
            users.push(user);
          }
          this.setState({reported_providers:users})
          console.log(users)
        }
      })
    }

    fetchBanned = () => {
      let endpoint = "http://localhost:9090/api/ban/user"
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
          console.log("data is being fetched")
          console.log(data);
          let users = [];
          for(var i = 0; i < data.length; i++){
            let user = {};
            user.banId = data[i].id;
            user.id = data[i].userId.id;
            user.type = data[i].userId.consumerType;
            user.username = data[i].userId.username;
            user.name = data[i].userId.name;
            user.email = data[i].userId.email;
            user.phone = data[i].userId.phoneNumber;
            user.banReason = data[i].reason;
            user.banTime = data[i].banTime.substring(0,10);
            user.bannedBy = data[i].bannedBy;
            if (data[i].status == "active"){
              user.isActive = true;
            } else {
              user.isActive = false;
            }
            users.push(user);
          }
          this.setState({banned_users:users})
          console.log(users)
        }
      }).then(this.fetchBannedProviders)
    }

    fetchBannedProviders = () => {
      let endpoint = "http://localhost:9090/api/ban/provider"
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
          console.log("data is being fetched")
          console.log(data);
          let users = [];
          for(var i = 0; i < data.length; i++){
            let user = {};
            user.banId = data[i].id;
            user.id = data[i].providerId.id;
            user.type = data[i].providerId.consumerType;
            user.username = data[i].providerId.username;
            user.name = data[i].providerId.name;
            user.email = data[i].providerId.email;
            user.phone = data[i].providerId.phoneNumber;
            user.banReason = data[i].reason;
            user.banTime = data[i].banTime.substring(0,10);
            user.bannedBy = data[i].bannedBy;
            if (data[i].status == "active"){
              user.isActive = true;
            } else {
              user.isActive = false;
            }
            users.push(user);
          }
          this.setState({banned_providers:users})
          console.log(users)
        }
      })
    }

    handleButtonClick = (newFilter) => {
      this.setState({filter:newFilter});
    }

    createTableHead = () => {
      let table = [];
      if (this.state.filter == "Search") {
        table.push(<tr><th>ID</th><th>User Type</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th></tr>);
      } else if (this.state.filter == "Reported") {
        table.push(<tr><th>ID</th><th>User Type</th><th>Name</th><th>Email</th><th>Phone</th><th>Report Message</th><th>Reported By</th><th>Report Date</th><th>Status</th></tr>);
      } else if (this.state.filter == "Banned") {
        table.push(<tr><th>ID</th><th>User Type</th><th>Name</th><th>Email</th><th>Phone</th><th>Ban Message</th><th>Banned By</th><th>Ban Date</th><th>Status</th></tr>);
      }
      return table;
    }

    createColumns = (x, list) => {
      let columns = [];
      for (let i = 0; i < x; i++) {
        columns.push(<td>{list[i]}</td>);
      }
      return columns
    }

    createSearchColumns = (user) => {
      return (
        <>
        <td>{user.id}</td>
        <td>{user.type}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        </>
      )
    }

    createReportedColumns = (row) => {
      let columns = [];
      // ID | Type | Name | Email | Phone | REPORT MESSAGE | ReportedBy | ReportedAt | State {isActive}
      console.log(row)
      return (
        <>
        <td>{row.id}</td>
        <td>{row.type}</td>
        <td>{row.username}</td>
        <td>{row.email}</td>
        <td>{row.phone}</td>
        <td>{row.reportReason}</td>
        <td>{row.reportedBy}</td>
        <td>{row.reportTime}</td>
        </>
      )
    }

    createBannedColumns = (row) => {
      let columns = [];
      // ID | Type | Name | Email | Phone | REPORT MESSAGE | ReportedBy | ReportedAt | State {isActive}
      console.log(row)
      return (
        <>
        <td>{row.id}</td>
        <td>{row.type}</td>
        <td>{row.username}</td>
        <td>{row.email}</td>
        <td>{row.phone}</td>
        <td>{row.banReason}</td>
        <td>{row.bannedBy}</td>
        <td>{row.banTime}</td>
        </>
      )
    }



    createForm = (hasResolve, user, filter) => {
      return (
        <td>
          <AdminActiveSwitch user={user} filter={filter} isConsumer={this.state.isConsumer}/>
        </td>
      )
    }

    //Creates
    createTable = () => {
      let table = [];
      if (this.state.filter == "Reported") {
        let target = "";
        if (this.state.isConsumer) {
          target = this.state.reported_users;
        } else {
          target = this.state.reported_providers;
        }
        for (let i = 0; i < target.length; i++) {
          let user = target[i];
          table.push(<tr>{this.createReportedColumns(user)}{this.createForm(true, user, "Reported")}</tr>);
        }
      } else if (this.state.filter == "Banned") {
        let target = "";
        if (this.state.isConsumer) {
          target = this.state.banned_users;
        } else {
          target = this.state.banned_providers;
        }
        for (let i = 0; i < target.length; i++) {
          let user = target[i];
          table.push(<tr>{this.createBannedColumns(user)}{this.createForm(false, user, "Banned")}</tr>);
        }
      }
      if (table.length == 0) {
        return <p className="placeholder">No Results</p>
      }
      return table;
    }

    updateSearchResults = (bool) => {
      let target = ""
      // if (this.state.isConsumer) {
      //   target = this.state.users;
      // } else if (this.state.isProvider) {
      //   target = this.state.providers;
      // }
      if (bool) {
        target = this.state.users;
      } else {
        target = this.state.providers;
      }
      let results = [];
      var length = this.state.searchText.length;
      for (let i = 0; i < target.length; i++) {
        let user = target[i];
        if (user.username.substring(0,length).toLowerCase() == this.state.searchText.toLowerCase() || this.state.searchText == "" || user.id == this.state.searchText) {
          results.push(
            <tr>
              {this.createSearchColumns(user)}
              {this.createForm(false, user, "Search")}
            </tr>
          );
        }
      }
      if (results.length == 0) {
        results.push(
          <h1>No Results Found</h1>
        )
      }
      this.setState({search_results:results});
    }

    handleSearchForChange = (event) => {
      // this.setState({searchText:event.target.value});
      // this.updateSearchResults();
      var hello = event.target.value;
      this.setState((state, props) => ({
         searchText: hello
      }), ()=>{
        if (this.state.isConsumer) {
          this.updateSearchResults(true);
        } else {
          this.updateSearchResults(false);
        }
      });
    }

    handleClickType = (bool) => {
      if (bool == true) {
        this.setState({isConsumer:true, isProvider:false});
      } else {
        this.setState({isConsumer:false, isProvider:true});
      }
      this.updateSearchResults(bool);
    }

    handleClickConsumer = () => {
      this.setState({isConsumer:true, isProvider:false});
      this.updateSearchResults(true);
    }
    handleClickProvider = () => {
      this.setState({isConsumer:false, isProvider:true});
      this.updateSearchResults(false);
    }

    createSearchBar = () => {
      if (this.state.filter == "Search") {
        return (
          <Col className="DashboardAdmin-SearchBar" sm={5}>
            <Form>
              <Form.Control onChange={this.handleSearchForChange} inline type="text" placeholder="Search For Users" />
            </Form>
          </Col>
        )
      }
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <h2>Admin Dashboard</h2>
              <ButtonGroup>
                <Button size="lg" onClick={() => this.handleButtonClick("Search")} variant={this.state.filter=="Search"?"secondary":"outline-secondary"}>Search</Button>
                <Button size="lg" onClick={() => this.handleButtonClick("Reported")} variant={this.state.filter=="Reported"?"secondary":"outline-secondary"}>Reported</Button>
                <Button size="lg" onClick={() => this.handleButtonClick("Banned")} variant={this.state.filter=="Banned"?"secondary":"outline-secondary"}>Banned</Button>
              </ButtonGroup>

              {this.createSearchBar()}

              <Form.Group>
              <Row className= "float-right mt-1 mr-3">
              <Col>
                  <Form.Check
                    type="radio"
                    label="Consumer"
                    checked={this.state.isConsumer}
                    onClick={this.handleClickConsumer}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Provider"
                    checked={this.state.isProvider}
                    onClick={this.handleClickProvider}
                  />
                </Col>
              </Row>
              </Form.Group>

              <div className="Dashboard-table">
                <Table striped bordered hover>
                  <thead>
                    {this.createTableHead()}
                  </thead>
                  <tbody>
                    {this.state.filter=="Search"?this.state.search_results:this.createTable()}
                    {this.state.search_results.length==0&&
                      <p className="placeholder">No Results</p>
                    }
                  </tbody>
                </Table>
              </div>
            </div>
        )
    }
}

export default DashboardAdmin;
