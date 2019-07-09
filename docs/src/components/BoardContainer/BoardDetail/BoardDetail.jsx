import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import EditBoard from './EditBoard/EditBoard';
import Search from './Search/Search';
import { Button } from 'reactstrap';

const mapStateToProps = state => {
    return { boards: state.boards };
  };

class ConnectedBoardDetail extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
            title: "",
            description: ""
        }
    };

    render(){
        const usersBoardsToShow = this.props.boards;
        const boardsToShow = usersBoardsToShow.map((board, i) => {
            return (
                <div className="container" key={i}>
                    <div className="row justify-content-center board-detail">
                        <div className="col-sm-7 board-div-line valign-middle">
                            <div id={ board._id } className="parent">
                                <div className="board-title"><h2>{ board.title }</h2></div>
                                <div className="board-description">{ board.description }</div>
                            </div>
                        </div>
                        <div className="col-sm-2 button-section valign-middle" key={ i }>
                            <Button outline color="secondary" className="board-buttons" id={ board._id } onClick={ this.props.editBoardButtonClick }>Edit</Button>
                            <Button outline color="secondary" className="board-buttons" id={ board._id } onClick={ this.props.deleteBoardButtonClick }>Delete</Button>    
                            <Button className="board-buttons" onClick={ this.props.addNewImageButtonClick } id={ board._id }>Add Image</Button>
                        </div>   
                    </div>
                

                    <ImageList images = { board.images } deleteImageButtonClick= { this.props.deleteImageButtonClick } board = {board} />
                </div>    
                
            )
        });  

        return(
            <div>
                <div>
                    <EditBoard toggleEdit={ this.props.toggleEdit } editModal={ this.props.editModal } handleEditSubmit={ this.props.handleEditSubmit } editBoardId={ this.props.editBoardId }
                    title={this.state.title} description={this.state.description} findBoardToggle={this.props.findBoardToggle} />
                </div>
                <div>
                    { boardsToShow }
                </div>
                <div>
                    <Search search={this.props.search} results={this.props.results} images={this.props.images} modal={ this.props.modal } searchToggleStateChange={this.props.searchToggleStateChange}
                    searchToggle={this.props.searchToggle}
                    
                    imageStateChange={ this.props.imageStateChange } handleImageClick={ this.props.handleImageClick } 
                    updateBoard={ this.props.updateBoard } toggle={ this.props.toggle }  
                    classChange={ this.props.classChange } handleImageSubmit={ this.props.handleImageSubmit } clearModal= { this.props.clearModal } />
                </div>
            </div>
        )
    }
}

const BoardDetail = connect(mapStateToProps)(ConnectedBoardDetail);

export default BoardDetail;

// onClick={()=>this.props.dispatch({ type:'EDIT_BOARD', id: board._id })}