import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import AdminActiveSwitch from "./AdminActiveSwitch";

class AdminSearchResults extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isViewAll:true,
        users:[
          // ID | Type | Name | Email | Phone | State {Active, Lock}
          [1, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", true],
          [2, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", true],
          [3, "Provider", "McDonalds", "maccas@maccas.com", "123456789", true],
          [4, "Organisation", "Darlington Public School", "darlington@det.nsw.edu.au", "90080809", true],
          [5, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", true],
          [6, "Provider", "KFC", "kfc@kfc.com", "123456789", true],
          [7, "Organisation", "Westmead Hospial", "westmead@hospital.nsw.edu.au", "90080809", false],
          [8, "Individual", "Alvin Ho", "alv@hotmail.com", "123456789", false],
          [9, "Provider", "GYG", "gyg@gyg.com", "123456789", false]
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
      }
      this.handleButtonClick = this.handleButtonClick.bind(this);
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



    createForm = (hasResolve, user, filter) => {
      return (
        <td>
          <AdminActiveSwitch user={user} filter={filter}/>
        </td>
      )
    }

    createTable = () => {
      let table = [];
      if (this.state.filter == "Search") {
        for (let i = 0; i < this.state.users.length; i++) {
          let user = this.state.users[i];
          if (this.state.isViewAll==true || (this.state.isViewAll==false && user[2] == "PENDING") && user[3] == this.state.searchFor) {
            table.push(
              <tr>
                {this.createColumns(5, user)}
                {this.createForm(false, user, "Search")}
              </tr>);
          }
        }
      } else if (this.state.filter == "Reported") {
        for (let i = 0; i < this.state.reported.length; i++) {
          let user = this.state.reported[i];
          table.push(<tr>{this.createColumns(8, user)}{this.createForm(true, user, "Reported")}</tr>);
        }
      } else if (this.state.filter == "Banned") {
        for (let i = 0; i < this.state.banned.length; i++) {
          let user = this.state.banned[i];
          table.push(<tr>{this.createColumns(8, user)}{this.createForm(false, user, "Banned")}</tr>);
        }
      }
      return table;
    }

    handleSearchForChange = (event, newValue) => {
      this.setState({searchFor:newValue});
      console.log(newValue)
    }

    createSearchBar = () => {
      if (this.state.filter == "Search") {
        return (
          <Form>
            <Form.Control onChange={() => this.handleSearchForChange()} inline type="text" placeholder="Search For Users" />
          </Form>
        )
      }
    }

    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <h1>Admin Dashboard</h1>
              <ButtonGroup>
                <Button size="lg" onClick={() => this.handleButtonClick("Search")} variant={this.state.filter=="Search"?"secondary":"outline-secondary"}>Search</Button>
                <Button size="lg" onClick={() => this.handleButtonClick("Reported")} variant={this.state.filter=="Reported"?"secondary":"outline-secondary"}>Reported</Button>
                <Button size="lg" onClick={() => this.handleButtonClick("Banned")} variant={this.state.filter=="Banned"?"secondary":"outline-secondary"}>Banned</Button>
              </ButtonGroup>

              {this.createSearchBar()}

              <div className="Dashboard-table">
                <Table striped bordered hover>
                  <thead>
                    {this.createTableHead()}
                  </thead>
                  <tbody>
                    {this.createTable()}
                  </tbody>
                </Table>
              </div>
            </div>
        )
    }
}

export default AdminSearchResults;
