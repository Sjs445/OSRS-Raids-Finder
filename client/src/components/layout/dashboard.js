import React from 'react';
import { connect } from 'react-redux';
import { getParties, deleteParty } from '../../actions/partyActions';
import PropTypes from 'prop-types';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PartyModal from "../modal/partyModal";


class dashboard extends React.Component {
constructor(props) {
    super(props);
}

onDeleteClick = (id) => {
    this.props.deleteParty(id);
}

componentDidMount() {
    this.props.getParties();
}
    render() {
        const { parties } = this.props.party;
        return (<div>
            <h1>Welcome to the dashboard</h1>
            <Container>
                <PartyModal />              
                <ListGroup>
                    <TransitionGroup className="party-list">
                    {parties.map(({id, raidType, clanChat, users})=> (
                        <CSSTransition key={id} timeout={500} className="">
                            <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, id)}
                                    >&times;</Button>
                                <b>Raid Type:</b> {raidType} <b>Clan Chat:</b> { clanChat } <b>Users:</b> {users}
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
    party: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    party: state.party
})

export default connect(mapStateToProps, { getParties, deleteParty })(dashboard);