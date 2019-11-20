import React from "react";
import { Link } from "react-router-dom";

class AboutUs extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        user: "",
      }
    }

    componentDidMount() {
      if (this.props.isLoggedIn) {
        this.setState({user: this.props.user});
      } else {
        this.setState({user:"Stranger"})
      }
    }
    render() {
        return (
            <div>
                <div className="AboutUs-content">
                <h1>Hello, {this.state.user}!</h1>
                <p>Welcome to <i>End World Hunger</i>!</p>
                <p><b>We are here to stay.</b></p>
                <p>One-third of the world’s food is either wasted or lost, adding up to 1.3 billion tonnes a year (Oz Harvest, 2019). <i>End World Hunger</i> aims to significantly reduce this figure by making use of this otherwise wasted food, which would also lessen other problems such as hunger, operating costs for charity organisations, and greenhouse gas effects. This project's model differs from other applications of the same market as we create free food exchanges.</p>
                <p>Charities will advantage from the food exchange as they can receive large batches of food to provide to hungry people. They also have the opportunity to operate more efficiently, potentially eradicating all costs attached to ingredients. </p>
                <p>In Australia alone, 5 million tonnes of food a year ends up in landfills (Oz Harvest, 2019). Decomposition of food releases a huge amount of methane and in a 100 year period, methane's effect on the atmosphere is 21 times worse than carbon dioxide's (Victorian State Government, 2019). Therefore, consuming a higher ratio of produced food would lessen the negative impact on the environment.</p>
                <p>There are existing services that stimulate consumption of excess food by reselling close-to-expiration food at a discount. <i>End World Hunger</i>  differs by encouraging gratuitous food. Even with no profits, food sellers would be motivated to partake in this service because it would promote social responsibility.</p>
                </div>
            </div>
        )
    }
}

export default AboutUs;
