import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteParty } from '../../actions/partyActions';
import PropTypes from 'prop-types';

class RemovePartyModal extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onDeleteClick = (id) => {
        this.props.deleteParty(id);
        this.toggle();
    };

    render() {
        return (
            <div>
                <Button
                color="danger"
                style={{margin: ".5rem"}}
                onClick={this.toggle}
                >
                    Disband Party
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>Disband Party?</ModalHeader>
                        <ModalBody>
                                    <Alert color="warning">Dispanding the party will remove everyone from the party and delete the party.
                                    </Alert>
                                    <Button 
                                    onClick={this.onDeleteClick.bind(this, this.props.partyid)}
                                    color="danger"
                                    style={{margin: ".5rem"}}
                                    >Disband Party</Button>
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
}

RemovePartyModal.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { deleteParty })(RemovePartyModal);