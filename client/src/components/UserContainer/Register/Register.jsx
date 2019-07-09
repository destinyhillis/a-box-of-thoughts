import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { handleRegister } from '../../../actions/actions';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state);
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    render(){
        return(
            <div>
                <h3>Create New Account</h3>
                <form onSubmit={ this.handleSubmit }>
                    <p className="input-title">*username</p> 
                    <input onChange={ this.handleChange } type="text" name="username" className="inputs home-inputs" />
                    <p className="input-title">*password:</p> 
                    <input onChange={ this.handleChange } type="password" name="password" className="inputs home-inputs" />
                    <div>
                    <Button id="home-buttons" color="secondary" type="submit">Register</Button>
                    </div>
                    <p className="input-title"><small>*required</small></p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: true,
    }
};

export default connect( mapStateToProps, { handleRegister })(Register);