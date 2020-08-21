import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { tokenConfig } from '../../actions/authActions';

import store from '../../store';

class ViewUserModal extends Component {
    state = {
        modal: false,
        user: {},
        errors: {},
        loading: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            loading: true
        }, () => {
            if(this.state.modal) {
               axios.get('/api/users/'+this.props.userid, tokenConfig(store.getState))
               .then(res => {
                   this.setState({
                       user: res.data,
                       loading: false
                   })
               })
               .catch(err => this.setState({
                   errors: err
               }))
            }
        })
    }


    render() {
        const { loading, user } = this.state;
        return (
            <div>
                <a href="#" onClick={this.toggle}>{this.props.rsn}</a>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                    <ModalHeader toggle={this.toggle}>User Profile</ModalHeader>
                    <ModalBody>
                    {loading &&
                        <Spinner color="dark" />
                    }
                    {user.skills &&
                        <h2>Total Level: {user.skills.overall.level}</h2>
                    }
                    </ModalBody>  
                    </Modal>
            </div>
        )
    }
}


ViewUserModal.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(ViewUserModal);