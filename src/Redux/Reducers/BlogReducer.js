import { BLOG_DETAIL_FAIL, BLOG_DETAIL_REQUEST, BLOG_DETAIL_SUCCESS, BLOG_DISLIKE_FAIL, BLOG_DISLIKE_REQUEST, BLOG_DISLIKE_SUCCESS, BLOG_LIKE_FAIL, BLOG_LIKE_REQUEST, BLOG_LIKE_SUCCESS, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS } from "../Constants/BlogConstants";

export const blogListReducer=(state={blogs:[]}, action)=>{
    switch (action.type) {
        case BLOG_LIST_REQUEST:
            return{loading:true, blogs:[]}
        case BLOG_LIST_SUCCESS:
            return{loading:false, 
                blogs:action.payload
            }
        case BLOG_LIST_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }

 export const blogDetailReducer=(state={blog:[]}, action)=>{
    switch (action.type) {
        case BLOG_DETAIL_REQUEST:
            return{loading:true,}
        case BLOG_DETAIL_SUCCESS:
            return{loading:false, 
                blog:action.payload
            }
        case BLOG_DETAIL_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }






 export const blogLikeReducer=(state={}, action)=>{
    const wiz={}
    switch (action.type) {
        case BLOG_LIKE_REQUEST:
            return{loading:true, success:true}
        case BLOG_LIKE_SUCCESS:
            return{loading:false, 
                blogs:action.payload
            }
        case BLOG_LIKE_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }

 export const blogDislikeReducer=(state={}, action)=>{
    switch (action.type) {
        case BLOG_DISLIKE_REQUEST:
            return{loading:true, success:true}
        case BLOG_DISLIKE_SUCCESS:
            return{loading:false, 
                blogs:action.payload
            }
        case BLOG_DISLIKE_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }