import React, { Component } from 'react';
import Axios from 'axios';
import SearchResults from './SearchResults';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: "",
            results: [],
            images: [],
            currentPage: 0,
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if(this.state.currentPage === 0 || !this.props.modal){
            this.setState({
                results: [],
                images: [],
                currentPage: 1
            })
        }else{
            this.setState({
                results: [],
                images: [],
            })
        }
        
    }

    searchImages = () => {
        Axios({
          method: 'get',
          url: 'https://api.unsplash.com/search/photos',
          params: {
            client_id: '1fe232c10d045efb942c686798a897086057edb740c100d8ee47adf69d77c998', 
            query: this.state.search,
            per_page: 9,
            page: this.state.currentPage,
          }
        })
        .then(response => {
            this.setState({results: response.data});
          })
        .then(showResults => {
            this.handleSearchResults();
        })
        .catch(err => {
            console.log(err);
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSearchResults = async () => {
        const searchResultsArray = this.state.results.results;
        await searchResultsArray.map((result) => {
            this.setState({
                images: [result.urls.regular, ...this.state.images],
                search: this.state.search
            })
        })
    };

    handleSubmit = (e, id) => {
        e.preventDefault();
        this.searchImages(this.state);
        this.setState({
            currentPage: this.state.currentPage + 1,
        })
        this.props.searchToggleStateChange(this.props.searchToggle);
    };

    moreImages = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
            results: [],
            images: []
        })
        this.searchImages(this.state);
    };

    backImages = () => {
        if(this.state.currentPage > 1){
        this.setState({
            currentPage: this.state.currentPage - 1,
            results: [],
            images: []
        })
        this.searchImages(this.state);
        }
    };

    render(){
        return (
            <div>
                <Modal isOpen={ this.props.modal } toggle={ this.props.toggle } id="search-modal">
                <ModalHeader toggle={ this.props.toggle }><div className="modal-title">Image Search</div></ModalHeader>
                <ModalBody>
                    {
                        !this.props.searchToggle ?
                        <div className="row justify-content-center">
                            <div className="col-sm-8 col-centered">
                                <form onSubmit={ this.handleSubmit }>
                                    <p className="input-title">Search for an image to add to your board.</p>
                                    <input onChange={ this.handleChange } type="text" name="search" placeholder="" className="inputs"/>
                                    <Button color="secondary" className="button" type="submit">Search</Button>
                                </form>
                            </div>
                        </div>
                        :
                        <div className="row justify-content-center">
                            <SearchResults images={ this.state.images } handleImageClick = { this.props.handleImageClick }  />
                            
                            <Button onClick={this.backImages}>...back</Button>
                            <Button onClick={this.moreImages}>more...</Button>
                        </div>
                    }

                </ModalBody>
                <ModalFooter>
                {
                    this.props.searchToggle ?
                    <div>
                        <Button color="secondary" onClick={ this.props.handleImageSubmit }>Add to Board</Button>
                        <Button color="secondary" onClick={ this.props.searchToggleStateChange }>New Search</Button>
                    </div>
                    
                    :
                    null
                }
                    <Button outline color="secondary" onClick={ this.props.toggle }>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    };
}

export default Search;