import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddFoodModal from './AddFoodModal';

class MyNavbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            activeKey: "/"
        }
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    componentDidMount() {
        this.setState({activeKey: window.location.pathname});
    }

    componentDidUpdate(prevProps) {
        if(this.props.isLoggedIn != prevProps.isLoggedIn
            && this.props.isLoggedIn == true){
            this.setState({activeKey: "/"});
        }
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">End World Hunger</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="mr-auto"
                        activeKey={this.state.activeKey}>
                        <Nav.Link href="/" activeClassName="selected">Home</Nav.Link>
                        {this.props.isLoggedIn &&
                        <Nav.Link href="/search" activeClassName="selected">Find Food</Nav.Link>
                        }
                        <Nav.Link href="/leaderboard" activeClassName="selected">Leaderboard</Nav.Link>
                        <Nav.Link href="/about_us" activeClassName="selected">About Us</Nav.Link>
                    </Nav>
                    <Nav
                        className="justify-content-end"
                        activeKey={this.state.activeKey}
                        >
                            {this.props.isLoggedIn
                            ?   <>
                                {this.props.userType == "P" &&
                                <Button variant="secondary" size="sm" onClick={this.handleShow}><FontAwesomeIcon icon={faPlusCircle} /> Add Food</Button>}
                                <Nav.Link href="/dashboard" activeClassName="selected">Dashboard</Nav.Link>
                                {this.props.userType != "A" &&
                                <Nav.Link href="/profile">Profile</Nav.Link>}
                                <Nav.Link onClick={this.props.logout}>Log Out</Nav.Link>
                                </>
                            : <Nav activeKey={this.state.activeKey}>
                                <Nav.Link href="/login">Log In</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                            }
                    </Nav>
                </Navbar.Collapse>
                <AddFoodModal showModal={this.state.showModal}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow} userId={this.props.userId}/>
            </Navbar>

        )
    }
}


export default MyNavbar;
