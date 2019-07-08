import React, { Component } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

class UserContainer extends Component {
    constructor(){
        super();
        this.state = {
          registerToggle: false,
        }
    }
    
    render(){
        return(
            <div className="home">
                <div className="black-bkg">
                    <div className="col-sm-5 col-centered app-description">
                    Create your own collection of stunning mood and vision boards.
                    </div>
                    <div className="inline-block vertical-div-line">
                        <Login />
                    </div>
                    <div className="inline-block">
                        <Register />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserContainer;