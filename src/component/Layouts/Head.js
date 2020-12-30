import React from 'react'
import { Link } from 'react-router-dom'

//
class Head extends React.Component {
  render(){
    return(
    <div id="div_navigate_index">
        <div id="div_head" className="cover">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <a href="./" className="home_link"><p><i className="fas fa-home"></i></p>
                        </a>
                    </div>
                    <div className="col-sm-8">
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
//
export default Head;

