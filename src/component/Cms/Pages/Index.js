import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Navbar from '../../Layouts/Navbar';
import firebase from 'firebase'

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.db = null
    }
    componentDidMount(){
        this.get_items()        
    }
    get_items(){
        var items = []
        var self = this
        this.database = firebase.firestore()
        var dbRef = this.database.collection('cms_pages')
        dbRef = dbRef.orderBy("created_at", "desc")
        dbRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                /* console.log(doc.id, " => ", doc.data()) */
                var item = doc.data()
                items.push({
                    id : doc.id,
                    title : item.title,
                    content : item.content,
                    created_at : item.created_at
                })            
            })
            self.setState({ data: items })
console.log( items )
        })        
    }
    tabRow(){
        if(this.state.data instanceof Array){
            return this.state.data.map(function(object, i){
                return <IndexRow obj={object} key={i} />
            })
        }
    }
    render(){
        return (
        <div className="pages_wrap">
            <Navbar />
            <div className="container">
                <h3>Pages</h3>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/cms_pages_create"
                        className="btn btn-sm btn-primary">+ Create
                        </Link>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div><br />
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        </div>

        )
    }
}

export default Index;

