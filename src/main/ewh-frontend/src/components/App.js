import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import '../css/App.css';

// IMPORT COMPONENTS
import Home from './Home';
import Dashboard from './Dashboard';
import OrderDetails from './OrderDetails';
import Provider from './Provider';
import Profile from './Profile';
import SearchResults from './SearchResults';
import MyNavbar from './Navbar';
import AboutUs from './AboutUs';
import Login from './Login';
import Register from './Register';
import Leaderboard from './Leaderboard';

import Test from './Test'; {/* Don't forget to delete this */}

class App extends React.Component {
  constructor(props){
    super(props);
    const loggedIn = localStorage.isLoggedIn ? localStorage.isLoggedIn : false;

    this.state = {
      //CHANGE THIS BACK TO ""
      isLoggedIn: loggedIn,
      //username: localStorage.username? localStorage.username : "Log In",
      userType: localStorage.userType? localStorage.userType : "",    // Admin, Consumer or Provider
      userSubtype: localStorage.userSubtype? localStorage.userSubtype : "",  // Restaurant, Supermarket or Individual, Charity, Organisation
      user: localStorage.user? localStorage.user : "",
      userId: localStorage.userId? localStorage.userId : "",
    }
  }

  /* updateUser = (user, type) => {
    console.log("entering updateUser");
    console.log(user);
    this.setState({userId: user.id, userType: type, isLoggedIn: true});
  } */

  updateStatus = (option) => {
    this.setState(option);
    if (!option.isLoggedIn) {
      localStorage.clear("isLoggedIn");
      localStorage.clear("user");
      localStorage.clear("userType");
      localStorage.clear("userSubtype");
      localStorage.clear("userId");
    } else {
      localStorage.isLoggedIn = option.isLoggedIn;
      localStorage.user = option.user;
      localStorage.userType = option.userType;
      localStorage.userSubtype = option.userSubtype;
      localStorage.userId = option.userId;

    }

  }

  logout = () => {
    this.updateStatus({
      isLoggedIn:false,
  });
    window.location = "/login";
  }

  render(){
    return (
        <BrowserRouter>
          <MyNavbar
            isLoggedIn={this.state.isLoggedIn}
            userType={this.state.userType}
            logout={this.logout}
            userId={this.state.userId}/>
          <div className="main-container">
            <Switch>
              {this.state.isLoggedIn ?
              <div>
                {/*ADD NEW ROUTES HERE*/}
                <Route path="/" render={(props) => {return <Home user={this.state.user} userType={this.state.userType}/>}} exact />
                <Route path="/dashboard" render={(props) => {return <Dashboard userId = {this.state.userId} userType = {this.state.userType}/>}}/>
                <Route path="/provider/:id" render={(props) => {return <Provider userId = {this.state.userId} userType={this.state.userType} userSubtype={this.state.userSubtype}{...props}/>}}/>
                <Route path="/order_detail/:id" render={(props) => {return <OrderDetails userType={this.state.userType} userId={this.state.userId} {...props}/>}}/>
                <Route path="/profile" render={(props) => {return <Profile userId = {this.state.userId} userType={this.state.userType}/>}}/>
                <Route path="/search" render={(props) => {return <SearchResults userId={this.state.userId} userType={this.state.userType} userSubtype={this.state.userSubtype}/>}}/>
                <Route path="/about_us" render={(props) => {return <AboutUs user={this.state.user} isLoggedIn={this.state.isLoggedIn}/>}}/>
                <Route path="/leaderboard" render={(props) => {return <Leaderboard/>}}/>
                <Route path="/test" render={(props) => {return <Test/>}}/> {/* Don't forget to delete this */}
              </div>
              :
              <div>
                You are not logged in
                <Route path="/" render={(props) => {return <Home user={this.state.user} userType={this.state.userType}/>}} exact />
                <Route path="/leaderboard" render={(props) => {return <Leaderboard/>}}/>
                <Route path="/about_us" render={(props) => {return <AboutUs/>}}/>
                <Route path="/login" render={(props) => {return <Login updateAppStatus={this.updateStatus} {...props}/>}}/>
                <Route path="/register" render={(props) => {return <Register updateAppStatus={this.updateStatus} {...props}/>}}/>
              </div>
              }
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
};

export default App;
