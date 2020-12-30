import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class TopPostsRow extends Component {
   dispCategory(item){
      if(item.category != null ){
         return(
            <span className="folder_icon_wrap mr-2">
               <i className="fas fa-folder"></i> {item.category.name}                  
            </span>
         )
      }
   }
   render() {
      return (
      <div className="post_items_wrap">
         <div className="div_news_rows">
            <Link to={`/show/${this.props.obj.id}`} >
               <h3 className="ml-10"> {this.props.obj.title}
               </h3>             
            </Link>        
         </div>
         <div>
            <ul className="ul_time_box">
               <li>
                  <p className="mb-0">
                     <span className="mr-2 time_icon_wrap">
                        <i className="far fa-calendar"></i>
                     </span>
                     {this.props.obj.date_str}
                  </p>  
                  {this.dispCategory(this.props.obj)}
               </li>
               
            </ul>

         </div>
         <hr className="hr_ex1" />
      </div>
      )
   }
}

export default TopPostsRow;

