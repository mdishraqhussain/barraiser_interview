import {getService} from "../services/getService";

export const setOpen = (data) =>{
    return {
        type: "FIRST_ACTION",
        data
    }
}

export const setError = () =>{
    return {
        type: "ERROR"
    }
}

export const myThunkCall = () =>{
    return (dispatch) =>{
        let makeAxiCall = getService()
        .then((res)=>{
            dispatch(setOpen(res.data))
        })
        .catch((err)=>{
            dispatch(setError());
        })
    }
}

