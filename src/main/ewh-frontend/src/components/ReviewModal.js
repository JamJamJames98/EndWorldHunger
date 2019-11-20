import React from "react";
import { Link } from "react-router-dom";
import {Table, Form, Container, Row, Col, Button, Modal} from "react-bootstrap";
import Rating from "react-rating";
import axios from 'axios';



class ReviewModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFood: 0,
            foodAmount: 1,
            contactText:"",
            noteText: "",
            reviewText: "",
            rating: 0,
        }
    }

    // componentDidUpdate() {
    //   console.log(this.props.order);
    //   console.log(this.props.order[6]);
    //   console.log(this.props.userId)
    //   console.log(this.state.rating)
    //   console.log(this.state.reviewText)
    //   console.log(this.props.userType)
    //   //fetch
    // }
    handleReviewSubmit = () => {
      var ret_value = {
        "author": {
          "id": this.props.userId
        },
        "rating": this.state.rating,
        "comment": this.state.reviewText,
        "userType": this.props.userType
      }
      let endpoint = "";
      if (this.props.userType == "P") {
        endpoint = `http://localhost:9090/api/review/user/${this.props.forUser}`
      } else {
        endpoint = `http://localhost:9090/api/review/provider/${this.props.forUser}`
      }
      axios.post(endpoint, ret_value)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    handleReviewChange = (event) => {
      this.setState({reviewText: event.target.value});
    }

    handleRatingChange = (value) => {
      console.log(value);
      this.setState({rating: value});
    }


    render() {
        return (
            <div>
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Form onSubmit={this.handleReviewSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Rate & Review Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>{this.props.order[1]}</p>
                      <h2>{this.props.order[2]}</h2>
                      <div>
                        <Rating initialRating={this.state.rating} start={0} stop={5} onClick={(rate)=>this.handleRatingChange(rate)}/>
                      </div>
                      {/*------FORM------*/}
                        <Form.Label>Review</Form.Label>
                        <Form.Control placeholder="Please help others understand your rating by writing a short review"
                          placeholder="Write Review..." onChange={this.handleReviewChange} as="textarea" type="text" rows="6"/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Submit Review
                      </Button>
                    </Modal.Footer>
                </Form>
              </Modal>
            </div>
        )
    }
}

export default ReviewModal;
