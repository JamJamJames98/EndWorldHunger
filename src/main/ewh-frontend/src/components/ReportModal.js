import React from "react";
import { Link } from "react-router-dom";
import {Table, Form, Container, Row, Col, Button, Modal} from "react-bootstrap";
import axios from 'axios';


class ReportModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFood: 0,
            foodAmount: 1,
            contactText:"",
            noteText: "",
        }
    }




    handleSubmit = (event) => {
      // TO DO: POST REPORT DETAILS
      let ret_val = {}
      let date = new Date();
      let endpoint = "http://localhost:9090/api/report/user"

      if (this.props.userType == "P") {
        endpoint = "http://localhost:9090/api/report/user";
        ret_val = {
          "userId" : {
            "id":this.props.forUser
          },
          "reason": this.state.noteText,
          "reportTime": date.toISOString(),
          "reportedBy": this.props.selfUsername
        }
      } else {
        endpoint = "http://localhost:9090/api/report/provider"
        ret_val = {
          "providerId" : {
            "id":this.props.forUser
          },
          "reason": this.state.noteText,
          "reportTime": date.toISOString(),
          "reportedBy": this.props.selfUsername
        }
      }
      console.log(ret_val);
      axios.post(endpoint, ret_val)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log("HIHIHIHI");
        // result = res.data;
      })
    }

    handleNoteChange = (event) => {
      this.setState({noteText: event.target.value});
    }


    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                  <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <h2>Report {this.props.pageUsername}</h2>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Please explain why you are reporting this user</Form.Label>
                            <Form.Control placeholder="Reason"
                              value={this.state.noteText} onChange={this.handleNoteChange} as="textarea" type="text" rows="5"/>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                          </Button>
                          <Button variant="primary" type="submit">
                            Submit Report
                          </Button>
                        </Modal.Footer>
                    </Form>
                  </Modal>



            </div>
        )
    }
}

export default ReportModal;
