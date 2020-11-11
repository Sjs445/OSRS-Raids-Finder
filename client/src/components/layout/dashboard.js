import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getParties, deleteParty, joinParty, removeFromParty } from '../../actions/partyActions';
import PropTypes from 'prop-types';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CreatePartyModal from "../modal/createPartyModal";
import RemovePartyModal from "../modal/removePartyModal";
import LeavePartyModal from "../modal/leavePartyModal";
import ViewUserModal from "../modal/viewUserModal";
import store from '../../store';
import { loadUser } from '../../actions/authActions';

import NavBar from './navbar';


class dashboard extends React.Component {

    intervalID;

onDeleteClick = (id) => {
    this.props.deleteParty(id);
}

onJoinClick = (id) => {
    this.props.joinParty(id, this.props.user.rsn, this.props.user._id);
}

onLeaveClick = (id, index) => {
    //  If the party only has 1 user delete the party.
    if(this.props.party.parties[index].users.length === 1) {
        this.props.deleteParty(id);
    }
    else {
        //  Remove the one user from the party
        this.props.removeFromParty(id, this.props.user._id);
    }
}

componentDidUpdate(prevProps) {
    if(this.props.party.parties !== prevProps.party.parties) {
        store.dispatch(loadUser());
    }
}

componentDidMount() {
    this.getData();
}

componentWillUnmount() {
    clearTimeout(this.intervalID);
}

getData = () => {
    store.dispatch(loadUser());
    this.props.getParties();

    this.intervalID = setTimeout(this.getData.bind(this), 5000);
}

    render() {
        if(!this.props.isAuthenticated)
        {
            return <Redirect to="/" />
        }
        
        const { parties } = this.props.party;
        const { user } = this.props;
        return (
        <div>
            <NavBar />
        <h1 style={{textAlign: "center", margin: "1rem"}}>Welcome to the dashboard {this.props.user.name}</h1>
            <Container>
                {!user.party &&
                <CreatePartyModal />
                }              
                <ListGroup>
                    <TransitionGroup className="party-list">
                    {parties.map(({_id, raidType, clanChat, users, partyLeader}, index)=> (
                        <CSSTransition key={_id} timeout={500} className="">
                            <ListGroupItem>
                                {!user.party &&
                                <Button color="primary"
                                style={{margin: ".5rem"}}
                                onClick={this.onJoinClick.bind(this, _id)}>Join Party</Button>
                                }
                                {user.party === _id &&
                                    <LeavePartyModal index={index} />
                                }
                                {user.rsn === partyLeader &&
                                <RemovePartyModal partyid={_id} />
                                }
                                    <b>Raid Type:</b> {raidType} <b>Clan Chat:</b> { clanChat } <b>Party Leader:</b> {partyLeader}
                                    <br /><b>Users:</b>
                                {users.map(({_id, rsn}, index) => (
                                <CSSTransition key={_id} timeout={500} className="">
                                    <ListGroupItem>
                                     <b>{index+1}.</b> <ViewUserModal rsn={rsn} userid={_id}/>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        </div>
        );
    }
}

dashboard.propTypes = {
    getParties: PropTypes.func.isRequired,
    party: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    joinParty: PropTypes.func.isRequired,
    removeFromParty: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    party: state.party,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { getParties, deleteParty, joinParty, removeFromParty })(dashboard);