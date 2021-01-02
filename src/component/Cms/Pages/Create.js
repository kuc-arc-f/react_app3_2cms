
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Layouts/Navbar';
import firebase from 'firebase'

//
class Create extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.database = firebase.firestore()
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("#Auth-OK");
            } else {
                alert("Error, auth error, please Google Login")
                self.props.history.push("/cms_pages");
                console.log('#no-User');
            }
        })        
    }
    handleChangeTitle(e){
        this.setState({title: e.target.value})
    }
    handleChangeContent(e){
        this.setState({content: e.target.value})
    }
    add_item(){
        var item = {
            title: this.state.title,
            content: this.state.content,
            created_at: new Date(),
        }
        var self = this
        if (this.newTodoName == "") { return; }        
        this.database.collection('cms_pages').add(item).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            self.props.history.push("/cms_pages");
        }).catch(function(error) {
            alert("Error save: "+ error)
            console.error("Error adding document: ", error)
        })
        this.newTodoName = ""        
    }
    handleClick(){
        console.log("#-handleClick")
        this.add_item()
//        console.log( this.state )
    }
    render() {
        return (
        <div className="pages_create_wrap">
            <Navbar />
            <div className="container">
                <Link to="/cms_pages" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />
                <h1 className="mt-2">Create - Pages</h1>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control"
                        onChange={this.handleChangeTitle.bind(this)}/>
                    </div>
                </div>
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" value={this.state.content}
                        rows="10"
                        onChange={this.handleChangeContent.bind(this)} ></textarea>
                    </div>                
                </div><br />
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.handleClick}>Create
                    </button>
                </div>
            
            </div>
        </div>

        )
    }
}
export default Create;

