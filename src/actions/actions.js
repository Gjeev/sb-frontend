import * as api from "../api";

export const createPdf=()=> async (dispatch) =>{
    try {
        api.createPdf();
    } catch (error) {
        console.log(error);
    }
    
}
export const sendfeedback=(contactUsFormData)=> async(dispatch)=>{
    try{
        api.sendfeedback(contactUsFormData);
    }
    catch(error){
        console.log(error);
    }
}