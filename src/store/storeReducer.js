import { combineReducers } from "redux";

let init = {
    myArr:[],
    error:false
};

const initialReducer = (state=init, action) =>{
    let cop = {...state};
    switch(action.type){
        case "FIRST_ACTION":
            cop.myArr = action.data;
            return cop;
        break;
        case "ERROR":
            cop.error = true;
            return cop;
        default:
            return state;
    }
}
export default combineReducers({initialReducer});