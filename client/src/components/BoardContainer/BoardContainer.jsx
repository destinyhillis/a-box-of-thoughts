import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';
import { getUser, deleteBoard, editBoard, findEditBoard } from '../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: user => dispatch(getUser(user)),
        deleteBoard: board => dispatch(deleteBoard(board)),
        editBoard: board => dispatch(editBoard(board)),
        findEditBoard: board => dispatch(findEditBoard(board)),
    }
  };

const mapStateToProps = state => {
    return { 
        renderBoardDetail: state.renderBoardDetail, 
        boards: state.boards,
        selectedImage: state.selectedImage,
        editBoard: state.editBoard,
        loggedIn: state.loggedIn,
        currentUser: state.currentUser,
    }
};

class ConnectedBoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            modal: false,
            editModal: false,
            id: "",
            editBoardId: "",
            search: "",
            results: [],
            images: [],
            title: "",
            description: "",
            selectedImage: "",
            searchToggle: false,
        }
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.searchToggleStateChange = this.searchToggleStateChange.bind(this);
    }

    componentDidMount(){
        // if(!this.state.editModal){
            // console.log(this.state, 'component mount')
            if(this.props.loggedIn){
            this.props.getUser(this.state.currentUser);
        }
    };

    handleImageSubmit = ()=> {
        this.toggle();
        this.props.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
    }; 

    updateBoard = async (foundBoard, id) => {
        foundBoard.images.push(this.state.selectedImage);
        await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    handleImageClick = (e, image) => {
        this.setState({
            selectedImage: e
        })
    };

    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    };

    searchToggleStateChange(){
        this.setState(prevState => ({
            searchToggle: !prevState.searchToggle
        }));
    };

    toggleEdit(){
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    };

    addNewImageButtonClick = (e) => {
        this.setState({
            id: e.target.id,
            searchToggle: false
        })
        this.toggle();
    };

    deleteBoardButtonClick = (e, id) => {
        this.props.boards.map((board) => {
            if (board._id === e.target.id){
                this.props.deleteBoard(board._id)
            }
        })
    };

    deleteImageButtonClick = async (board, image, i) => {
        if(board.images[i] === image){
            board.images.splice(i, 1)
        };        
        this.props.editBoard(board)
    }; 

    editBoardButtonClick = (e) => {
        this.toggleEdit();
        this.setState({
            editBoardId: e.target.id,
        })
    };

    handleEditSubmit = (response) => {
        this.props.editBoard(response)
        this.toggleEdit();
    };

    render(){
        return (
            <div>
                {
                    this.props.createBoardToggle ?
                    <MakeBoard updateBoard={ this.updateBoard } 
                    search={this.state.search} results={this.state.results} images={this.state.images} title={this.state.title}
                    description={this.state.description} createBoardToggleStateChange={this.props.createBoardToggleStateChange}
                    
    
                    selectedImageStateChange={ this.selectedImageStateChange } 
                     imageStateChange={ this.imageStateChange } 
                      classChange={ this.state.classChange } 
                     />
                    :
                    null
                }   

                {
                    this.props.renderBoardDetail ?
                        <BoardDetail toggleEdit={ this.toggleEdit } editModal={ this.state.editModal } editBoardId={ this.state.editBoardId }
                        editBoardButtonClick={ this.editBoardButtonClick } handleEditSubmit={ this.handleEditSubmit } 
                        toggle={ this.toggle } modal={ this.state.modal } images={this.state.images} handleImageClick={ this.handleImageClick }
                        handleImageSubmit={ this.handleImageSubmit } searchToggleStateChange={this.searchToggleStateChange} searchToggle={this.state.searchToggle} 

                        
                        addNewImageButtonClick={ this.addNewImageButtonClick } 
                        deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick }
                        />
                    :
                    null
                }
                 
            </div>
        )
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoardContainer);

export default BoardContainer;