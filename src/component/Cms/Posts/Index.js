import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import firebase from 'firebase'
import LibCmsPosts from '../../../libs/LibCmsPosts';
import LibPaginate from '../../../libs/LibPaginate';
import Navbar from '../../Layouts/Navbar';

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: '', pagenate_display:0 }
        this.db = null
        this.page = 1
        this.handleClickPagenate = this.handleClickPagenate.bind(this);
        this.handleClickPagenateP1 = this.handleClickPagenateP1.bind(this);
    }
    componentDidMount(){
        this.get_items()        
    }
    async get_items(){
        LibPaginate.init();
        var page_info = LibPaginate.get_page_start(this.page);         
console.log(page_info)        
        var items = []
        var self = this
        this.database = firebase.firestore()
        var dbRef = this.database.collection('cms_posts')
        dbRef = dbRef.orderBy("created_at", "desc").limit(page_info.limit)
        var querySnapshot = await dbRef.get()
        querySnapshot.forEach(function(doc) {
            var item = doc.data()
            items.push({
                id : doc.id,
                title : item.title,
                content : item.content,
                created_at : item.created_at,
                category_id: item.category_id,
            })            
        })
        items = LibPaginate.get_page_items(items, page_info.start , page_info.limit )
        var categories = await LibCmsPosts.get_category_items(firebase)
        items = LibCmsPosts.get_post_items(items , categories)
// console.log( items )
        var is_paginate = LibPaginate.is_paging_display(items.length)
        self.setState({ data: items, pagenate_display: is_paginate })
    }
    tabRow(){
        if(this.state.data instanceof Array){
            return this.state.data.map(function(object, i){
                return <IndexRow obj={object} key={i} />
            })
        }
    }
    handleClickPagenateP1(){
        this.page = 1
        this.get_items()
    }
    handleClickPagenate(){
        var page = this.page
        this.page = page + 1
        console.log( "page=", this.page )
        this.get_items()
    }    
    dispPagenate(){
        if(this.state.pagenate_display ===1){
            return(
            <div className="paginate_wrap">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.handleClickPagenateP1} className="btn btn-lg btn-outline-primary">
                        1st
                    </button>
                    <button onClick={this.handleClickPagenate} className="btn btn-lg btn-outline-primary">
                        >
                    </button>
                </div>
            </div>
            )
        }
    }    
    render(){
        return (
        <div className="posts_wrap">
            <Navbar />
            <div className="container">
                <h3>Posts - index</h3>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/cms_posts_create"
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
                <hr />
                {this.dispPagenate()}   
                <br /><br />         
            </div>            
        </div>
        )
    }
}

export default Index;

