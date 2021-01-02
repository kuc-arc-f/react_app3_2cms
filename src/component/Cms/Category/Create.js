
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
                self.props.history.push("/task");
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
            name: this.state.title,
            content: this.state.content,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        }
        var self = this
        this.database.collection('cms_category').add(item).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            self.props.history.push("/cms_category");
        }).catch(function(error) {
            alert("Error save: "+ error)
            console.error("Error adding document: ", error)
        })
    }
    handleClick(){
        console.log("#-handleClick")
        this.add_item()
//        console.log( this.state )
    }
    render() {
        return (
        <div className="category_create_wrap">
            <Navbar />
            <div className="container">
                <Link to="/cms_category" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />
                <h1 className="mt-2">Create - category</h1>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control"
                        onChange={this.handleChangeTitle.bind(this)}/>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Content:</label>
                        <input type="text" className="form-control"
                        onChange={this.handleChangeContent.bind(this)}/>
                    </div>
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

