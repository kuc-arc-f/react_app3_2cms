
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import marked from  'marked'
import Navbar from '../../Layouts/Navbar';
// import LibTask from '../../libs/LibTask';
import firebase from 'firebase'
//
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: ''};
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.id  = this.props.match.params.id
console.log( this.id);
        this.database = firebase.firestore()
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("#Auth-OK");
                self.get_item( self.id )
            } else {
                alert("Error, auth error, please Google Login")
                self.props.history.push("/task");
                console.log('#no-User');
            }
        })         
    }
    async get_item(id){
        var docRef = this.database.collection("cms_posts").doc( id )
        var self = this
        docRef.get().then(function(doc) {
            var item = doc.data()
console.log( item)
            self.setState({ 
                title: item.title, 
                content: item.content
            });             
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })         
    }
    update_item(){
         var self = this
        var docRef = this.database.collection("cms_posts").doc(this.id);
        docRef.update({
            title: this.state.title,
            content: this.state.content
        })
        .then(function() {
            self.props.history.push("/cms_posts");
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        })        
    }    
    handleClickDelete(){
        var self = this
        var docRef = this.database.collection("cms_posts").doc(this.id)
        docRef.delete().then(function() {
            console.log("Document successfully deleted!")
            self.props.history.push("/cms_posts");
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        })        
//        console.log("#-handleClickDelete")
    }
    handleClick(){
        console.log("#-handleClick")
        this.update_item()
//        console.log( this.state )
    }        
    handleChangeTitle(e){
        this.setState({ title: e.target.value })
    }
    handleChangeContent(e){
        this.setState({ content: e.target.value })
    }
    render(){
        return (
        <div className="posts_show_wrap">
            <Navbar />
            <div className="container">
                <Link to="/cms_posts" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />            
                <h1>Edit - post</h1>
                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label>Title</label>
                    <input type="text"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" value={this.state.content}
                        rows="10"
                        onChange={this.handleChangeContent.bind(this)} ></textarea>
                    </div>                
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.handleClick}>Save
                    </button>
                </div>
                <hr />
                <div className="form-group">
                    <button className="btn btn-outline-danger btn-sm mt-2"
                    onClick={this.handleClickDelete}>Delete
                    </button>
                </div>

            </div>
        </div>

        )
    }
}
export default Edit;