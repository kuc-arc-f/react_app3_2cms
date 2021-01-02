
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import marked from  'marked'
import LibCommon from '../../../libs/LibCommon';
import Navbar from '../../Layouts/Navbar';
import firebase from 'firebase'

import '../../../css/TodoShow.css';
//
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', content: '',
            type :0 , created_at: '', 
        };
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.id  = this.props.match.params.id
//console.log( this.id);
        this.get_item( this.id )
    }
    async get_item(id){
        this.database = firebase.firestore()
        var docRef = this.database.collection("cms_pages").doc( id )
        var self = this
        docRef.get().then(function(doc) {
            var item = doc.data()
            item.content = marked(item.content)
            item = LibCommon.convert_string_date(item )
console.log( item)
            self.setState({ 
                title: item.title, 
                content: item.content,
                created_at: item.date_str
            });             
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })        
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }        
    render(){
        return (
        <div className="pages_show_wrap">
            <Navbar />
            <div className="container">
                <Link to="/cms_pages" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />            
                <h1>{this.state.title}</h1>
                Date : {this.state.created_at}
                <hr />
                <div id="post_item" 
                dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
            </div>
        </div>
        )
    }
}
export default Show;