import React from "react";
import {Badge, Popover, OverlayTrigger} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

const badges = {
    bronze: {
        variant: "badge-bronze",
        label: "Bronze Provider",
        helpText: "This provider has been recognised as a Bronze Provider for achieving over 100 points.",
    },
    silver: {
        variant: "badge-silver",
        label: "Silver Provider",
        helpText: "This provider has been recognised as a Silver Provider for achieving over 300 points.",
    },
    gold: {
        variant: "badge-gold",
        label: "Gold Provider",
        helpText: "This provider has been recognised as a Gold Provider for achieving over 500 points.",
    },
    platinum: {
        variant: "badge-platinum",
        label: "Platinum Provider",
        helpText: "This provider has been recognised as a Platinum Provider for achieving over 500 points and maintaining a streak for over 100 days.",
    },
}

class ProviderBadge extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            badge: {
                variant: "",
                label: "",
            }
        }
    }

    componentDidMount(){
        if(this.props.points >= 500 && this.props.streak >= 100){
            this.setState({badge: badges.platinum});
        } else if (this.props.points >= 500) {
            this.setState({badge: badges.gold});
        } else if (this.props.points >= 300) {
            this.setState({badge: badges.silver});
        } else if (this.props.points >= 100) {
            this.setState({badge: badges.bronze});
        }
    }
    
    render() {
        return (
            <>
            <Badge pill variant="secondary" className={this.state.badge.variant}>
                {this.state.badge.label}
            </Badge>
            { this.state.badge.label &&
            <OverlayTrigger rootClose trigger="click" placement="right" 
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Title as="h3">What does this badge mean?</Popover.Title>
                        <Popover.Content>
                            <p>{this.state.badge.helpText}</p>
                        </Popover.Content>
                    </Popover>
                }>
                <FontAwesomeIcon 
                icon={faQuestionCircle} size="sm"
                className="badge-help"/>
            </OverlayTrigger>}
            </>
        )
    }
}

export default ProviderBadge;