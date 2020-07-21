import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addParty } from '../../actions/partyActions';

class PartyModal extends Component {
    state = {
        modal: false,
        party: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.party]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newParty = {
            id: 2,
            party: this.state.party
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
                                <Label for="party">Party</Label>
                                <Input 
                                type="text"
                                name="party"
                                id="party"
                                placeholder="Add party"
                                onChange={this.onChange}
                                />
                                <Button color="dark" type="submit"
                                style={{marginTop: '2rem'}} block
                                >Add Party</Button>
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

export default connect(mapStateToProps, { addParty })(PartyModal);