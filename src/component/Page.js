import React from 'react'
//import { Link } from 'react-router-dom';
import LibCommon from '../libs/LibCommon';
import Head from './Layouts/Head';
import firebase from 'firebase'
import marked from  'marked'

import '../css/page.css';

//
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.id = ""
    }
    componentDidMount(){
        this.id  = this.props.match.params.id 
        console.log( this.id   )
        this.get_item( this.id )
    }
    get_item(id){
        this.database = firebase.firestore()
        var docRef = this.database.collection("cms_pages").doc( id )
        var self = this
        docRef.get().then(function(doc) {
            var item = doc.data()
            item = LibCommon.convert_string_date(item )
            item.id = id
            item.content = marked(item.content)
console.log( item)
            self.setState({ data: item })
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })          
    }
    get_content(){
        console.log( "#-get_content" )
        return false
    }    
    render(){
        return(
        <div className="page_wrap">
            <Head />
            <div className="container mt-2">
                <div className="page_head_wrap mt-2">
                    <i className="fas fa-home"></i> > {this.state.data.title}
                </div>
                <hr />
                <h1>{this.state.data.title}</h1>
                date : {this.state.data.date_str} <br />
                ID : {this.state.data.id} <br />
                <hr />
                <div id="post_item"
                dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
            </div>
        </div>
        )
    }
}

export default Page;

