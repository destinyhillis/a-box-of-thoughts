import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { createBoard } from '../../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        createBoard: board => dispatch(createBoard(board)),
    }
  };

class ConnectedMakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: [],
            selectedImage: {}
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    clearForm = () => { 
        document.getElementById("newBoard").reset();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createBoard(this.state);
        this.props.createBoardToggleStateChange();
        this.clearForm()
 
    };

    render(){
        return (
            <div className="col-sm-12">

            <div className="col-sm-6 col-centered" id="parent">
                <h2 id="grey-h3">Create a New Board</h2>
                <form onSubmit={ this.handleSubmit } id="newBoard">
                    <p className="input-title">*Title:</p> 
                    <input onChange={ this.handleChange } type="text" name="title" defaultValue="" className="inputs" />
                    <p className="input-title">Description:</p> 
                    <textarea onChange={ this.handleChange } type="text" name="description" defaultValue="" className="inputs" />
                    <div>
                        <Button className="button" color="secondary" type="submit">Create</Button>
                    </div>
                    </form>
                    <p className="input-title"><small>* required</small></p>
            </div>
                <hr />
            </div>
        )
    }

}

const MakeBoard = connect(null, mapDispatchToProps)(ConnectedMakeBoard);

export default MakeBoard;