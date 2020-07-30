import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getParties, deleteParty, joinParty } from '../../actions/partyActions';
import PropTypes from 'prop-types';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CreatePartyModal from "../modal/createPartyModal";

import NavBar from './navbar';


class dashboard extends React.Component {
constructor(props) {
    super(props);
}

onDeleteClick = (id) => {
    this.props.deleteParty(id);
}

onJoinClick = (id) => {
    this.props.joinParty(id, this.props.user.rsn);
}

componentDidMount() {
    this.props.getParties();
}
    render() {
        if(!this.props.isAuthenticated)
        {
            return <Redirect to="/" />
        }
        
        const { parties } = this.props.party;
        return (<div>
            <NavBar />
        <h1 style={{textAlign: "center", margin: "1rem"}}>Welcome to the dashboard {this.props.user.name}</h1>
            <Container>
                <CreatePartyModal />              
                <ListGroup>
                    <TransitionGroup className="party-list">
                    {parties.map(({_id, raidType, clanChat, users, partyLeader})=> (
                        <CSSTransition key={_id} timeout={500} className="">
                            <ListGroupItem>
                                {/* We should only be able to delete the party if the user logged in, is the owner of the party. I.E. whoever
                                created the party. We should be able to use the first user in the users arr since they are the creator. */}
                                <Button color="primary"
                                onClick={this.onJoinClick.bind(this, _id)}>Join Party</Button>
                                <Button
                                    style={{margin: ".5rem"}}
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                <b>Raid Type:</b> {raidType} <b>Clan Chat:</b> { clanChat } <b>Users:</b> {users} <b>Party Leader:</b> {partyLeader}
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
    user: PropTypes.object.isRequired,
    joinParty: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    party: state.party,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { getParties, deleteParty, joinParty })(dashboard);