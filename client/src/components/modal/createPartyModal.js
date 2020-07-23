import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addParty } from '../../actions/partyActions';

class CreatePartyModal extends Component {
    state = {
        modal: false,
        raidType: '',
        clanChat: '',
        users: []
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
            users: this.state.users
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
                                placeholder="Add party"
                                onChange={this.onChange}
                                />
                                <Label for="clanChat">Clan Chat</Label>
                                <Input
                                type="text"
                                name="clanChat"
                                id="clanChat"
                                placeholder="Clan Chat"
                                onChange={this.onChange}
                                />
                                <Label for="users">Users</Label>
                                <Input
                                type="text"
                                id="users"
                                placeholder="Your RSN"
                                disabled />
                                {/* The users field should just be the user logged in at this point since this is a new party.
                                I think we need to fetch this from the backend with the authenticated jwt to retrieve the usersname. The field
                                should remain disabled. */}
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

const mapStateToProps = state => ({
    party: state.party
})

export default connect(mapStateToProps, { addParty })(CreatePartyModal);