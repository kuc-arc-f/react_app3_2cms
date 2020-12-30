import React from 'react'
import { Link } from 'react-router-dom';
import LibCommon from '../libs/LibCommon';
// import LibCmsEdit_3 from '../libs/LibCmsEdit_3';
import axios from 'axios'
import marked from  'marked'
//import $ from  'jquery'
import firebase from 'firebase'

import '../css/show.css';

//
class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.id = ""
    }
    componentDidMount(){
        this.id  = this.props.match.params.id 
        this.get_item( this.id )
console.log( this.id   )
    }
    get_item(id){
        this.database = firebase.firestore()
        var docRef = this.database.collection("cms_posts").doc( id )
        var self = this
        docRef.get().then(function(doc) {
            var item = doc.data()
            item = LibCommon.convert_string_date(item )
            item.content = marked(item.content)
console.log( item)
/*
            self.setState({ 
                title: item.title, 
                content: item.content
            });  
*/
            self.setState({ data: item })           
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })        
        /*
        var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
        axios.get('./cms.json?' + dt).then(res =>  {
            var data = res.data
            var items = LibCommon.convert_items(data.items )
            var item  = LibCmsEdit_3.get_show_item( items, String(id) )
            item.content = marked(item.content)
            this.setState({ data: item })
        })
        */
    }
    get_content(){
        console.log( "#-get_content" )
//        $("#post_item").append(this.state.data.content)
        return false
        //return this.state.data.content
    }    
    render(){
        return(
            <div className="container">
                <Link to="/" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />
                <div className="show_head_wrap">
                    <i className="fas fa-home"></i> >
                    {this.state.data.title}
                </div>
                <hr />
                <h1>{this.state.data.title}</h1>
                date :  {this.state.data.date_str}<br />
                ID :  {this.id}<br />
                <hr />
                <div id="post_item"
                dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
            </div>
        )
    }
}

export default Show;

