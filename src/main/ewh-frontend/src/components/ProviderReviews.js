import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

/*BOOTSTRAP*/
import {Button, ButtonGroup,
  Table,
  Container, Row, Col,
  Card} from "react-bootstrap";

class ProviderReviews extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        placeholder: "Loading...",
        reviews: [
          ["5", "Great food, great restaurant! Thanks for doing this!"],
          ["1", "Your food sucks!"]
        ]
      }
      this.createTable = this.createTable.bind(this);
    }


    createTable = () => {
      let table = [];
      for (let i = 0; i < this.state.reviews.length; i++) {
        let item = this.state.reviews[i];
        table.push(
          <Col md={3}>
            <Card style={{height:"150px", marginBottom:"15px"}}>
              <Card.Body>
                <Card.Title>
                <StarRatings starDimension="20px" starSpacing="1px" starRatedColor="black"
                  rating={Number(item[0])}/>
                </Card.Title>
                <Card.Text>{item[1]}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      }
      if (table.length == 0) {
        return (<p className="placeholder">No Results</p>);
      }
      return table;
    }

    getData = () => {
      let endpoint = `http://localhost:9090/api/review/for/provider/${this.props.providerId}`
      //console.log("FETCHING REVIEWS");

      fetch(endpoint)
      .then(response => {
        if(response.status != 200) {
          this.setState({
            loaded: true,
            placeholder: "ERROR: Could not get data"
          });
          return null;
        }
        return response.json();
      })
      .then(data => {
        if(data){
          let newData = data.sort((a,b)=>{
            return Number(b.id) - Number(a.id);
          })
          .map(review => {
            return [
              review.rating,
              review.comment,
            ]
          });

          this.setState({
            loaded: true,
            reviews: newData,
          });

        }
      })
    }

    componentDidMount() {
      this.getData();
    }

    render() {
        return (
            <div>
              { this.state.loaded ?
              <Container fluid>
                <Row>
                  {this.createTable()}
                </Row>
              </Container>
              : <p className="placeholder">{this.state.placeholder}</p>}
            </div>
        )
    }
}

export default ProviderReviews;
