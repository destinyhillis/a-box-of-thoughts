import React, { Component } from 'react';
import { connect } from "react-redux";
import '../App.css';
import { Button } from 'reactstrap';
import BoardContainer from './BoardContainer/BoardContainer';
import UserContainer from './UserContainer/UserContainer';
import { handleRegister, handleLogin, logout } from '../actions/actions'

const mapDispatchToProps = (dispatch) => {
  return {
      handleRegister: user => dispatch(handleRegister(user)),
      handleLogin: user => dispatch(handleLogin(user)),
      logout: user => dispatch(logout(user)),
  }
};

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn, currentUser: state.currentUser };
};

class ConnectedApp extends Component {
  constructor(){
    super();
    this.state = {
      createBoardToggle: false,
    }
  }
  handleCreateClick = () => {
    this.setState(prevState => ({
      createBoardToggle: !prevState.createBoardToggle
    }));
  };

  createBoardToggleStateChange = () => {
    this.setState({
      createBoardToggle: false
    })
  };

  render(){
    return (
      <div className="App">

        <div className="header">
          <div className="row" id="blk-header">
            
            <div className="col-sm-8">
              <h4>a box of thoughts</h4>
            </div>
            {
              this.props.loggedIn ?
            <div className="col-sm-4">           
              <Button id="navi" outline color="light" onClick={ this.handleCreateClick}>Create Board</Button>
              <Button id="navi" outline color="light" onClick={ this.props.logout }>Logout</Button>
            </div>
            :
            null
            }

          </div>
        </div>

        {
          this.props.loggedIn ?
          <div>
            <BoardContainer currentUser={this.props.currentUser} createBoardToggle={this.state.createBoardToggle} createBoardToggleStateChange={this.createBoardToggleStateChange} />
          </div>

            :
            <div>
            <UserContainer />
            </div>
        }
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;