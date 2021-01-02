
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import LibTask from '../../libs/LibTask';
import firebase from 'firebase'
import $ from 'jquery'
import Navbar from '../../Layouts/Navbar';
//
class Create extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '', content: '',category_id:'',category_items:''
        }
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.database = firebase.firestore()
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("#Auth-OK");
                self.get_category()
            } else {
                alert("Error, auth error, please Google Login")
                self.props.history.push("/cms_posts");
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
    get_category(){
        try {
            var self = this
            var items = []
            var dbRef = this.database.collection('cms_category')
            dbRef = dbRef.orderBy("created_at", "desc")
            dbRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    /* console.log(doc.id, " => ", doc.data()) */
                    var item = doc.data()
                    items.push({
                        id : doc.id,
                        name : item.name,
                        content : item.content,
                        created_at : item.created_at,
                    })            
                })
                console.log(items) 
                self.setState({ category_items: items })          
            }) 
        } catch (err) {
            console.error(`Error: ${JSON.stringify(err)}`)
        } 
    }
    add_item(){
        var category_id = $("#category_id").val()
        var item = {
            category_id: category_id,
            title: this.state.title,
            content: this.state.content,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        }
        var self = this
        if (this.newTodoName == "") { return; }        
        this.database.collection('cms_posts').add(item).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            self.props.history.push("/cms_posts");
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
    handleChangeCategory(){
        var id = $("#category_id").val()
        this.setState({ category_id: id }) 
console.log($("#category_id").val() )
    }
    categoryRow(){
        return this.state.category_items.map(function(object, i){
            //console.log(object)
            return (
              <option key={i} value={object.id}>{object.name}</option>
            )
        })                            
    }
    dispCategory(){
        if(this.state.category_items instanceof Array){
            return(
            <div className="form-group">
                <label>Category:</label>
                <div className="col-sm-6">
                    <select id="category_id" value={this.state.category_id} onChange={this.handleChangeCategory.bind(this)}
                    className="form-control">
                        {this.categoryRow()}
                    </select>
                </div>
            </div>
            )
        }
    }
    render() {
        return (
        <div className="posts_create_wrap">
            <Navbar />
            <div className="container">
                <Link to="/cms_posts" className="btn btn-outline-primary mt-2">Back</Link>
                <hr className="mt-2 mb-2" />
                <h1 className="mt-2">Create - Post</h1>
                {this.dispCategory()}
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
                </div>
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

