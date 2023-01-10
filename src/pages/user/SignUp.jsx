import "../../css/login.css";
import Input from './Input';
import { useState } from "react";
import { Button,Grid } from "@mui/material";
import {useDispatch} from 'react-redux';
import { signup } from "../../actions/user";
import {useHistory} from "react-router-dom";
import { styled } from '@mui/material/styles';



export default function SignUp()
{
    const initialData={name:"", email: "",password:"", confirmPassword:""};
    const [formData,setFormData]=useState(initialData);
    const [showPassword,setShowPassword]=useState(false);
    const [passwordsNotMatching,setPasswordsNotMatching]=useState(false);
    const [usernameAlreadyExists,setUsernameAlreadyExists]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    // const classes=useStyles();

    const handleChange=(event)=>{
        setFormData({...formData, [event.target.name] : event.target.value })
    }

    const handleShowPassword=()=>{
        const toggle= !showPassword;
        setShowPassword(toggle);
    }
    const handlePasswordsNotMatching=()=>{
        setPasswordsNotMatching(true);
    }
    const handleUsernameAlreadyExists=()=>{
        setUsernameAlreadyExists(true);
    }
    const handleSubmit=(event)=>{
        
        event.preventDefault();
        setPasswordsNotMatching(false);
        setUsernameAlreadyExists(false);
        if(formData.password!=formData.confirmPassword){
            handlePasswordsNotMatching();
        }
        else{
            dispatch(signup(formData,history));
            dispatch(signup(formData,history,handleUsernameAlreadyExists));
        }

    }
    
    return (
        <>
        <div className="login-page">
            <div className="globe">
                <h1>Sensing Bharat</h1>
                <h4>Search your data and let us provide you the package!</h4>
                <img src="/images/globe.png"/>
            </div>
            <div className="login">
                <a href="/">Back</a>
                <h1>Sign Up</h1>
                <p>Please set up your account.</p>
                <form onSubmit={handleSubmit} sx={{mt: 3, width: 1}}>
                    <Grid container spacing={2}>
                        <Input name="name" label="Name" handleChange={handleChange} />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" :"password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                        {passwordsNotMatching && <p className="red-error-login">Passwords do not match, try again.</p>}
                        {usernameAlreadyExists && <p className="red-error-login">User already exists, please login.</p>}
                    </Grid>
        
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{mb: 3}}>
                            "SIGN UP"
                        </Button>                  
                </form>
            </div>
        </div>
            
        </>
    );

}
