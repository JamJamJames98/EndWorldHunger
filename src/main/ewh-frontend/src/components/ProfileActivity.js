import React from "react";
import {Card} from "react-bootstrap";

class ProfileActivity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                ["1 hr ago", "You rated Maccas 5 stars for Oder XXXX."],
                ["2 hrs ago", "You placed an order at Maccas - Order XXXX."],
                ["3 hrs ago", "You left a review at James Gyros for Order XXXX."]
            ]
        }
    }
    //http://localhost:9090/api/userlogs/provider/1
    componentDidMount() {
      let endpoint = ""
      if (this.props.userType == "P") {
          endpoint = `http://localhost:9090/api/userlogs/provider/${this.props.userId}`
      } else {
          endpoint = `http://localhost:9090/api/userlogs/user/${this.props.userId}`
      }

      fetch(endpoint)
      .then(response => {
          if(response.status != 200) {
              this.setState({placeholder: "ERROR: An error occured."});
              return null;
          }
          return response.json();
      })
      .then(data => {
          if(data) {
            let table = [];
            for (let i = 0; i < data.length; i++) {
              table.push([data[i].logTime, data[i].activity]);
            }
            this.setState({data:table})
          }
      })

    }

    generateList = () => {
        let list = [];
        let key = 0;
        for(let entry in this.state.data){
          var date = new Date(this.state.data[entry][0]).toString().substring(4,15);
          var time = new Date(this.state.data[entry][0]).toString().substring(15,21);
            list.push(
                <Card key={key} className="profile-activity-card">
                    <Card.Body>
                        <p><i>{time+" "+date}</i></p>
                        <p>{this.state.data[entry][1]}</p>
                    </Card.Body>
                </Card>
            );
            key++;
        }
        return list;
    }

    render() {
        return (
            <div>
                {this.generateList()}
            </div>
        )
    }
}

export default ProfileActivity;
