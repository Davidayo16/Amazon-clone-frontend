import { PRODUCT_CATEGORY_DESC_FAIL, PRODUCT_CATEGORY_DESC_REQUEST, PRODUCT_CATEGORY_SUCCESS, SINGLE2_CATEGORY_FAIL, SINGLE2_CATEGORY_REQUEST, SINGLE2_CATEGORY_SUCCESS, SINGLE_CATEGORY_SUCCESS } from "../Constants/CategoryConstants";
import { PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_FAIL, PRODUCT_CATEGORY_DESC_SUCCESS, SINGLE_CATEGORY_REQUEST, SINGLE_CATEGORY_FAIL } from './../Constants/CategoryConstants';

export const CategoryListReducer=(state={categoryy:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_CATEGORY_REQUEST:
            return{loading:true,}
        case PRODUCT_CATEGORY_SUCCESS:
            return{loading:false, categoryy:action.payload}
        case PRODUCT_CATEGORY_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    }
 }
 export const SingleCategoryListReducer=(state={categoryyy:[]}, action)=>{
    switch (action.type) {
        case SINGLE_CATEGORY_REQUEST:
            return{loading:true,}
        case SINGLE_CATEGORY_SUCCESS:
            return{loading:false, categoryyy:action.payload}
        case SINGLE_CATEGORY_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    
    }
}
export const SingleCategoryListReducer2=(state={categoryyy:[]}, action)=>{
    switch (action.type) {
        case SINGLE2_CATEGORY_REQUEST:
            return{loading:true,}
        case SINGLE2_CATEGORY_SUCCESS:
            return{loading:false, category2:action.payload}
        case SINGLE2_CATEGORY_FAIL:
            return{loading:false, error:action.payload}
        default:
           return state;
    
    }
}



 export default CategoryListReducer