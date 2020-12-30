
// LibTasks
//const {promisify} = require('util');

//
export default {

    get_bread_ids :function(items){
        try{
            var ret = []
            items.forEach(async function (item) {
//                    console.log( item.breads[0]._id )
                ret.push( item.category_id )
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        }         
     
    },
    get_page_items  :async function(firebase){
        try{
            var ret = []
            var database = firebase.firestore()
            var dbRef = database.collection('cms_pages')
            dbRef = dbRef.orderBy("created_at", "desc")
            var querySnapshot = await dbRef.get()
            querySnapshot.forEach(function(doc) {
                var item = doc.data()
                ret.push({
                    id : doc.id,
                    title : item.title,
                    content : item.content,
                    created_at : item.created_at
                })            
            })            
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_page_items');
        }         
    },    
    get_category_items  :async function(firebase){
        try{
            var ret = []
            var database = firebase.firestore()
            var dbRef = database.collection('cms_category')
            dbRef = dbRef.orderBy("created_at", "desc")
            var querySnapshot = await dbRef.get()
            querySnapshot.forEach(function(doc) {
                var item = doc.data()
                ret.push({
                    id : doc.id,
                    name : item.name,
                    content : item.content,
                    created_at : item.created_at
                })            
            })            
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_category_items');
        }         
    },    
    get_search_items: function(posts , category_id){
        try{
            var ret = []
            posts.forEach(function (item) {
//console.log(item.category_id)
                if(item.category_id === category_id){
                    ret.push(item)
                }
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_post_items');
        } 
    },
    get_post_items : function(posts , categories){
        try{
            var ret = []
            posts.forEach(function (item) {
                item.category = { name: ""}
                categories.forEach(function (category){
//console.log( category.id )
                    if( item.category_id === category.id){
                        item.category = category ;
                    }
                });
                ret.push(item)
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_post_items');
        } 
    },
}
