import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class PagesRow extends Component {
   render() {
      return (
      <span>
         <Link to={`/pages/${this.props.obj.id}`} target="_blank"
         className="btn btn-outline-dark ml-2 mb-2">
            {this.props.obj.title}
         </Link>        
      </span>
      )
   }
}

export default PagesRow;

