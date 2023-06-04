
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_FEATURED_REQUEST,
     PRODUCT_FEATURED_SUCCESS, PRODUCT_FEATURED_FAIL, PRODUCT_DETAIL_REQUEST, 
     PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_WISHLIST_FAIL, PRODUCT_WISHLIST_SUCCESS,
      PRODUCT_WISHLIST_REQUEST, PRODUCT_BEST_REQUEST, PRODUCT_BEST_SUCCESS, PRODUCT_BEST_FAIL,
       PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL,
       PRODUCT_CREATE_REVIEW_RESET, 
       PRODUCT_RELATED_REQUEST,
       PRODUCT_RELATED_SUCCESS,
       PRODUCT_RELATED_FAIL
    } from './../Constants/ProductConstants';
export const productListReducer=(state={products:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return{loading:true, products:[]}
        case PRODUCT_LIST_SUCCESS:
            return{
                loading:false, 
                products:action.payload
            }
        case PRODUCT_LIST_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }

 export const productFeaturedReducer=(state={products:[{isWishList:true}]}, action)=>{
    switch (action.type) {
        case PRODUCT_FEATURED_REQUEST:
            return{loading:true, products:[]}
        case PRODUCT_FEATURED_SUCCESS:
            return{loading:false, 
                isWishList:false,
                pages:action.payload.pages,
                page:action.payload.page,
                products:action.payload
            }
        case PRODUCT_FEATURED_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }
 export const productRelatedReducer=(state={products:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_RELATED_REQUEST:
            return{loading:true, products:[]}
        case PRODUCT_RELATED_SUCCESS:
            return{loading:false, 
                products:action.payload
            }
        case PRODUCT_RELATED_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }
 export const productBestReducer=(state={bestProducts:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_BEST_REQUEST:
            return{loading:true, bestProducts:[]}
        case PRODUCT_BEST_SUCCESS:
            return{loading:false, bestProducts:action.payload}
        case PRODUCT_BEST_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }
// SINGLE PRODUCT
export const productDetailsReducer=(state={product:{reviews:[]}}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {...state, loading:true}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading:false, product:action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state;
    }
} 
export const productWishlistReducer=(state={}, action)=>{
    switch (action.type) {
        case PRODUCT_WISHLIST_REQUEST:
            return {...state, loading:true}
        case PRODUCT_WISHLIST_SUCCESS:
            return {loading:false, success:true,user:action.payload}
        case PRODUCT_WISHLIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state;
    }
} 

export const productCreateReviewReducer=(state={}, action)=>{
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false, success:true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false, error:action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}   
        default:
            return state;
    }
} 
