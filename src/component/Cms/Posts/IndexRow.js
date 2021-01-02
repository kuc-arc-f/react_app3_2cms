import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class IndexRow extends Component {
    render() {
        var category_name = ""
        if(typeof this.props.obj.category  !== 'undefined' ){
            category_name = this.props.obj.category.name
        }
//console.log(this.props.obj.category )
        return (
        <tr>
            <td>
                {this.props.obj.id}
            </td>
            <td>
                <Link to={`/cms_posts_show/${this.props.obj.id}`}
                 ><h3>{this.props.obj.title}</h3>
                </Link>                  
                Category: {category_name}
            </td>
            <td>
                <Link to={`/cms_posts_edit/${this.props.obj.id}`}
                 className="btn btn-sm btn-outline-primary">Edit
                </Link>                  
            </td>
            <td> 
            </td>
        </tr>
        )
    }
}

export default IndexRow;