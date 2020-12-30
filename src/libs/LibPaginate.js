// LibPaginate

//
export default {
    init:function(){
        this.per_page = 20;
    },    
    set_per_page:function(num){
        this.per_page = num;
    },    
    get_page_start:function(page){
        var start_num = (page -1) * this.per_page;
        var end_num = (page) * this.per_page;
        var ret ={
            start: start_num,  limit: end_num,
        }        
//        console.log("per_page:",this.per_page)
        return ret;
    },    
    get_per_page:function(){
        console.log("per_page:",this.per_page)
        return this.per_page;
    },
    is_paging_display(count){
        var ret = 0;
        var num = count / this.per_page;
        if(num >= 1){
            ret = 1
        }
        //ret = parseInt( num );
        return ret;
    },    
    /*********************************
     *
    ***********************************/     
   get_max_page : function(items, one_max ){
        var ret = 0;
        var div = items.length % one_max ;
        ret = items.length / one_max ;
        ret = parseInt( ret);
        if(div > 0){
            ret += 1;
        }
    //console.log( ret , div )        
        return ret;        
    },
    get_page_items: function(items, start , end){
        var ret = []
        items.forEach(function(item, index){
            if((index >= start) && (index < end )){
                ret.push(item)
            }
    //            console.log( item )
        });
        return ret        
    },

    /*********************************
     * get , 1 page items
    ***********************************/     
    get_items: function(items, page ,one_max ){
        var ret = []
        var start = (page -1) * one_max;
        var end = page * one_max;
    // console.log( start, end )
        items.forEach(function(item, index){
            if((index >= start) && (index < end )){
                ret.push(item)
            }
    //            console.log( item )
        });
        return ret        
    },
    /*********************************
     * get , next page
    ***********************************/     
    add_page_items: function(items, add_items){
        var arr = items
        add_items.forEach(function(item){
            arr.push(item)
        });        
        return arr;
    },
}
