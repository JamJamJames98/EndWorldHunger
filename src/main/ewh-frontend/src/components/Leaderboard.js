import React from "react";
import {Table, ButtonGroup, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

class Leaderboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            placeholder: "Loading...",
            rows: [],
            viewPoints: true,
            pointData: [
                ["Maccas", 100], 
                ["KFC", 99], 
                ["James Gyros", 90], 
                ["Smiths", 80], 
                ["Oporto", 70], 
                ["GYG's", 60], 
                ["Subway", 60], 
                ["Chatime", 54], 
                ["Easyway", 53], 
                ["Blah", 52],
            ],
            streakData: [
                ["Maccas", 57], 
                ["KFC", 56], 
                ["James Gyros", 55], 
                ["Smiths", 54], 
                ["Oporto", 53], 
                ["GYG's", 52], 
                ["Subway", 51], 
                ["Chatime", 50], 
                ["Easyway", 49], 
                ["Blah", 48],
            ]
        }
    }

    createTable = () => {
        let data = []
        if(this.state.viewPoints) 
            {data = this.state.pointData;} 
        else {data = this.state.streakData}
        let rows = [];
        let rank = 1;
        for(let row in data) {
            let providerLink = `/provider/${data[row].id}`
            rows.push(<tr key={row}>
                <td>{rank}</td>
                <td><Link to={providerLink}>{data[row].providerName}</Link></td>
                <td>{ this.state.viewPoints
                ? data[row].points
                : data[row].streak}</td>
            </tr>)
            rank++;
        }
        return rows;
    };

    handleButtonClick = () => {
        this.setState({viewPoints: !this.state.viewPoints});
    }

    componentDidMount() {
        const endpointPoints = "http://localhost:9090/api/provider/leaderboard/points";
        const endpointStreak = "http://localhost:9090/api/provider/leaderboard/streak";


        fetch(endpointPoints)
        .then(response => {
            if(response.status != 200) {
                this.setState({placeholder: "ERROR: An error occured."});
                return null;
            }
            return response.json();
        })
        .then(data => {
            if(data) {
                this.setState({
                    pointData: data,
                })
            }
        });

        fetch(endpointStreak)
        .then(response => {
            if(response.status != 200) {
                this.setState({placeholder: "ERROR: An error occured."});
                return null;
            }
            return response.json();
        })
        .then(data => {
            if(data) {
                this.setState({
                    streakData: data,
                })
            }
        });

        this.createTable();
    }
    
    render() {
        return (
            <div>
              {/*ALL HTML MUST BE WITHIN THIS DIV*/}
              <h2 style={{display:"inline"}}>Leaderboard</h2>
              <ButtonGroup className="leaderboard-buttongroup">
                <Button size="xs" onClick={() => this.handleButtonClick()} variant={this.state.viewPoints?"secondary":"outline-secondary"}>Points</Button>
                <Button size="xs" onClick={() => this.handleButtonClick()} variant={!this.state.viewPoints?"secondary":"outline-secondary"}>Streak</Button>
              </ButtonGroup>
              <Table hover style={{textAlign: "center"}}>
                  <thead>
                      <tr>
                          <th>Rank</th>
                          <th>Provider</th>
                          {this.state.viewPoints
                          ? <th>Points</th>
                          : <th>Streak</th>}
                      </tr>
                  </thead>
                  <tbody>
                      {this.createTable()}
                  </tbody>
              </Table>

            </div>
        )
    }
}

export default Leaderboard;