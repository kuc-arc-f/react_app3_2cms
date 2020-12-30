import React from 'react'
//import axios from 'axios';
import $ from  'jquery'
import LibCommon from '../libs/LibCommon';
import LibPaginate from '../libs/LibPaginate';
import LibCmsPosts from '../libs/LibCmsPosts';
import TopPostsRow from './Layouts/TopPostsRow';
import PagesRow from './Layouts/PagesRow';
import firebase from 'firebase'

//
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '', 
            pages_display:  1,
            items_all: [],
            page_max : 1,
            page_number : 1,
            pagenate_display: 0,
        }
        this.page_one_max = 20
        this.handleClickCategory = this.handleClickCategory.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleClickPagenate = this.handleClickPagenate.bind(this);
    }  
    componentDidMount(){
        this.get_items()
    }
    async get_items(){
        var resData = {}
        var items = []
        var self = this
        this.database = firebase.firestore()
        var dbRef = this.database.collection('cms_posts')
        dbRef = dbRef.orderBy("created_at", "desc")
        var querySnapshot = await dbRef.get()
        querySnapshot.forEach(function(doc) {
            var item = doc.data()
            item = LibCommon.convert_string_date(item )
            items.push({
                id : doc.id,
                category_id: item.category_id,
                title : item.title,
                content : item.content,
                created_at : item.created_at,
                date_str: item.date_str
            })            
        })
        var categories = await LibCmsPosts.get_category_items(firebase)
        resData.category_items = categories
        items = LibCmsPosts.get_post_items(items , categories)
        resData.items = items
        resData.page_items = await LibCmsPosts.get_page_items(firebase)
// console.log( resData)
        self.setState({ data: resData })
    } 
    async get_category(id){
        var items = []
        this.database = await firebase.firestore()
        var querySnapshot = await this.database.collection('cms_posts')
//        .where("category_id", "==", id )
        .orderBy("created_at", "desc")
        .get()
        querySnapshot.forEach(function(doc) {
            var item = doc.data()
            item = LibCommon.convert_string_date(item )
            items.push({
                id : doc.id,
                category_id: item.category_id,
                title : item.title,
                content : item.content,
                created_at : item.created_at,
                date_str: item.date_str
            })                       
        })
        var resData = this.state.data
        var new_items = LibCmsPosts.get_search_items(items ,id)
        new_items = LibCmsPosts.get_post_items(new_items , resData.category_items )
        resData.items = new_items
console.log( resData )
        this.setState({ data: resData })
    }
    handleClickCategory(id){
        this.get_category(id)
console.log(id)

    }
    handleClickMenu(){
//console.log("handleClickMenu")
        $('.btn_hidden_ara_wrap').css('display','inherit');
    }
    categoryRow(){
        if(this.state.data.category_items instanceof Array){
            var self = this
            return this.state.data.category_items.map(function(object, i){
                return (
                <span key={i}>
                    <button  className="btn btn-outline-dark ml-2 mb-2" 
                    onClick={self.handleClickCategory.bind(this, object.id)}>
                    {object.name}</button>
                </span>
                )
            })
        }
    }
    categoryDisp(){
        return(
        <div className="category_wrap">
            <div className="row conte mt-2 mb-4">
                <div className="col-sm-12">
                    <h2 className="h4_td_title mt-2" >Category</h2>
                    <div className="category_btn_wrap mb-0">
                        {this.categoryRow()}
                    </div>
                </div>
            </div>

        </div>
        )
    }
    pageRow(){
        return this.state.data.page_items.map(function(object, i){
            return <PagesRow obj={object} key={i} />
        })                            
    }
    pageDisp(){
        if(this.state.data.page_items instanceof Array){
            if(this.state.pages_display ===1 ){
                return(
                <div className="pages_wrap">
                    <div className="row conte mt-4 mb-2">
                        <div className="col-sm-12">
                            <h2 className="h4_td_title mt-2" >Pages</h2>
                            <div className="page_btn_wrap mb-0">
                                {this.pageRow() }
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
    }
    tabRow(){
        if(this.state.data.items instanceof Array){
            return this.state.data.items.map(function(object, i){
                return <TopPostsRow obj={object} key={i} />
            })
        }
    }
    handleClickPagenate(){
        /*
        var number = this.state.page_number + 1
        this.setState({ page_number: number })
        var items  = LibPaginate.get_items(
            this.state.items_all, number , this.page_one_max 
        );
        var new_items = LibPaginate.add_page_items(this.state.data.items, items );  
        var new_data = this.state.data
        new_data.items = new_items
        this.setState({ data: new_data })
        */
    }
    dispPagenate(){
        if(this.state.pagenate_display ===1){
            return(
            <div className="paginate_wrap">
                <button onClick={this.handleClickPagenate} className="btn btn-lg btn-outline-primary">
                    次ページを読む
                </button>
            </div>
            )
        }
    }
    render(){
        return(
        <div className="body_main_wrap">
            <div className="main_title_wrap">
                <div id="div_img_layer">
                    <h1>Sample CMS
                        <br />
                    </h1>
                    <p className="sub_title mt-2">sampleキャッチコピーとなります。
                        <br />
                    </p>
                </div>
            </div>
            <div id="div_menu_layer">
                <div className="container">
                    <div className="menu_icon_wrap ml-4">
                        <a className="menu_display_btn" onClick={this.handleClickMenu}>
                            <i className="fas fa-bars"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="btn_hidden_ara_wrap">
                    {this.pageDisp()}
                    {this.categoryDisp() }
                </div>             
                <div className="body_wrap">
                    <div id="post_items_box" className="row conte mt-4 mb-4">
                        <div className="col-sm-12">
                            <div id="div_news">
                                <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                            </div>  
                            {this.tabRow()}
                            {this.dispPagenate()}                      
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}


export default Home;

