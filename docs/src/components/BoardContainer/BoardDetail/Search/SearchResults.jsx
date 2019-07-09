import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from 'reactstrap';

class SearchResults extends Component {

    handleClick(){
        $('img').click(function() {
            $('img').removeClass('highlight')
            $( this ).toggleClass('highlight');
          }); 
        
    }

    render(){
        const searchResultsList = this.props.images.map((image, i) => {
            return(
                <div className="image-options" key={i} onClick={this.handleClick} >
                    <img className="option" onClick={ () => this.props.handleImageClick(image) } alt="" src={ image } id={i}/>
                </div>
            )
        })
        return(
            <div className="col-sm-12 col-centered">
                { searchResultsList }
            </div>
        )
    }
}

export default SearchResults;
