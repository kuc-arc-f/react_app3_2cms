import React from 'react'
import { Link } from 'react-router-dom'

//
class TopContent extends React.Component {
  render(){
    return(
        <div className="top_content1_wrap">
            <div className="row conte mt-2" id="id_row_service">
                <div className="col-sm-12">
                    <h2 className="h4_td_title mt-2">Topic</h2>
                    <hr className="hr_ex1"/>
                </div>
            </div>
            <div className="row conte">
                <div className="col-sm-4">
                    <img className="img_kao mt-2 mb-2"
                    src="https://raw.githubusercontent.com/kuc-arc-f/screen-img/master/web/pc1.png" />
                </div>
                <div className="col-sm-8">
                    <h3>サイトの紹介</h3>
                    <p>紹介の文章、１２３
                    </p>
                </div>                                
            </div>            
        </div>
    )
  }
}
//
export default TopContent;

