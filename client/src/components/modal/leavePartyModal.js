import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Alert, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromParty, deleteParty, changeLeader } from '../../actions/partyActions';

class LeavePartyModal extends Component {
    state = {
        modal: false,
        partyLeader: ""
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onLeaveClick = (id) => {
        this.props.removeFromParty(id, this.props.user._id);
        this.toggle();
    };

    onDeleteClick = (id) => {
        this.props.deleteParty(id);
        this.toggle();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const partyLeader = this.state.partyLeader;
        //  Make an action to modify the party leader
        if(!partyLeader) {
            alert("You must select a user!");
            return;
        }
        
        this.props.changeLeader(this.props.party.parties[this.props.index]._id,
            this.props.user._id, partyLeader);
            
        this.toggle();
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {

        const party = this.props.party.parties[this.props.index];
        const { user } = this.props;
        if(party) {
        return (
            <div>
                <Button color="danger"
                    style={{margin: ".5rem"}}
                    onClick={this.toggle}>Leave Party</Button>
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>Leave Party?</ModalHeader>
                        <ModalBody>
                            {party.users.length === 1 &&
                                <React.Fragment>
                                <Alert color="warning">The party will be disbanded if you leave the party.</Alert>
                                <Button 
                                    onClick={this.onDeleteClick.bind(this, party._id)}
                                    color="danger"
                                    style={{margin: ".5rem"}}
                                >Leave Party</Button>
                                </React.Fragment>
                            }
                            {party.partyLeader === user.rsn && party.users.length !== 1 &&
                                <React.Fragment>
                                    <Alert color="warning">Since you are the party leader and there are others still in 
                                    the party, you must assign someone as the party leader.</Alert>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Label for="partyLeader">New Leader</Label>
                                            <Input type="select" name="partyLeader" id="partyLeader" 
                                            onChange={this.onChange}
                                            value={this.state.partyLeader}
                                            >
                                                {/* Have a blank option so the user must change it. */}
                                                <option></option>
                                                {party.users.map(({_id, rsn}) => (
                                                    <option key={_id} disabled={rsn===party.partyLeader} value={rsn}>{rsn}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <Button type="submit" color="danger">Leave Party</Button>
                                    </Form>
                                </React.Fragment>
                            }
                            {party.partyLeader !== user.rsn &&
                                <React.Fragment>
                                    <Alert color="primary">Confirm Leave Party.</Alert>
                                    <Button onClick={this.onLeaveClick.bind(this, party._id)} color="danger">Leave Party</Button>
                                </React.Fragment>
                            }
                                    <Button 
                                    onClick={this.toggle.bind(this)} 
                                    color="secondary"
                                    style={{margin: ".5rem"}}
                                    >Cancel</Button>
                        </ModalBody>
                    </Modal>
            </div>
        );
        }
        else {
            return(<div></div>);
        }
    }
}

LeavePartyModal.propTypes = {
    user: PropTypes.object.isRequired,
    party: PropTypes.object.isRequired,
    removeFromParty: PropTypes.func.isRequired,
    deleteParty: PropTypes.func.isRequired,
    changeLeader: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    party: state.party
});

export default connect(mapStateToProps, { removeFromParty, deleteParty, changeLeader })(LeavePartyModal);