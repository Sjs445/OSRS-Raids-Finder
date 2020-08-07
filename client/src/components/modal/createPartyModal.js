import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { addParty } from '../../actions/partyActions';
import PropTypes from 'prop-types';

class CreatePartyModal extends Component {
    state = {
        modal: false,
        raidType: '',
        clanChat: '',
        partyLeader: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newParty = {
            raidType: this.state.raidType,
            clanChat: this.state.clanChat,
            partyLeader: this.props.user.rsn,
            userid: this.props.user._id
        }

        //  Add party via addParty action
        this.props.addParty(newParty);

        //  Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Party</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>New Party</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="raidType">Raid Type</Label>
                                <Input 
                                type="text"
                                name="raidType"
                                id="raidType"
                                placeholder="Chambers of Xeric"
                                onChange={this.onChange}
                                />
                                <Label for="clanChat">Clan Chat</Label>
                                <Input
                                type="text"
                                name="clanChat"
                                id="clanChat"
                                placeholder={this.props.user.rsn}
                                onChange={this.onChange}
                                />
                                <Label for="partyLeader">Party Leader</Label>
                                <Input
                                type="text"
                                id="partyLeader"
                                placeholder={this.props.user.rsn}
                                value={this.props.user.rsn}
                                disabled />
                                <Button color="dark" type="submit"
                                style={{marginTop: '2rem'}} block
                                >Create Party</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

CreatePartyModal.propTypes = {
    party: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    party: state.party,
    user: state.auth.user
});

export default connect(mapStateToProps, { addParty })(CreatePartyModal);