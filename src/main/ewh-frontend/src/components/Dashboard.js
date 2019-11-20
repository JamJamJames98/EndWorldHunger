import React from "react";

import DashboardProvider from "./DashboardProvider";
import DashboardConsumer from "./DashboardConsumer";
import DashboardAdmin from "./DashboardAdmin";

class Dashboard extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isViewAll:true,
        orders:[
          ["10/09/2019", "Jeremy Irons", "PENDING", "DXC1F2"],
          ["10/09/2019", "James Bond", "COMPLETE", "0QA192"]
        ]
      }
      // this.handleButtonClick = this.handleButtonClick.bind(this);
      this.renderPage = this.renderPage.bind(this);
    }
    renderPage() {
      // console.log(this.state.finished);
      if (this.props.userType == "P") {
        return (<DashboardProvider userId={this.props.userId} userType={this.props.userType} userId={this.props.userId} userSubtype={this.props.userSubtype}/>);
      }
      else if (this.props.userType == "C") {
        return (<DashboardConsumer userId={this.props.userId} userType={this.props.userType} userId={this.props.userId} userSubtype={this.props.userSubtype}/>);
      }
      else if (this.props.userType == "A") {
        return (<DashboardAdmin userId={this.props.userId} userType={this.props.userType}/>);
      }
      else {
        return (<p>ERROR {this.props.userType} not found</p>)
      }
    }
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}

            {this.renderPage()}

            </div>
        )
    }
}

export default Dashboard;
