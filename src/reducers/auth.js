import {LOGIN,LOGOUT} from '../constants';
const authReducer=(state={authData:null},action)=>{
    switch (action.type) {
        case LOGIN:
            // console.log(JSON.stringify(action));
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state,authData:action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state,authData:action?.data};
        default:
            return {...state};
    }
}
export default authReducer;