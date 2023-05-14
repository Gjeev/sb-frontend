import { Grid, TextField, Button, CircularProgress, Backdrop } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "../../css/contactus.css";
import { useState } from "react";
import { sendfeedback } from "../../actions/actions";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';



export default function ContactUs() {
    const dispatch=useDispatch();
    const initialData={firstName:"",lastName:"",email:"",phoneNumber:"",message:""}
    const [contactUsFormData,setContactUsFormData]=useState(initialData);
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const handleSubmit=(event)=>{
        event.preventDefault();
        dispatch(sendfeedback(contactUsFormData));
        setOpen(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // window.location.reload();
        }, 2500);

        
    }
    const handleChange=(event)=>{
        setContactUsFormData({...contactUsFormData, [event.target.name]:event.target.value});

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return(
        <>
        <div className="maincontent">
        <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={6}>
                <div className="containercontactus">
                    <h3>Contact Us</h3>
                    <p>Our Friendly team would love to hear from you!</p>
                    <form onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
                        <Grid spacing={2} >
                            <div className="namecontainercontactus">
                                <div><p className="paragraphContactUsForm">First Name</p>
                                <TextField name="firstName" label="First Name" variant="outlined" InputLabelProps={{style: { color: 'white' }}} inputProps={{style: { color: 'white' }}} required 
                                sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'beige'},
                                '&: hover .MuiOutlinedInput-notchedOutline': { borderColor: 'orange'},
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
                                }}
                                onChange={handleChange}/>
                                </div>
                                <div><p className="paragraphContactUsForm">Last Name</p>
                                <TextField name="lastName" label="Last Name" variant="outlined" InputLabelProps={{style: { color: 'white' }}} inputProps={{style: { color: 'white' }}} required 
                                sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'beige'},
                                '&: hover .MuiOutlinedInput-notchedOutline': { borderColor: 'orange'},
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
                                }}
                                onChange={handleChange}/>
                                </div>
                            </div>
                        </Grid>
                        <div className="formcontainercontactus">
                        <p className="paragraphContactUsForm">Email</p>
                        <TextField name="email" label="Email" variant="outlined" InputLabelProps={{style: { color: 'white' }}} inputProps={{style: { color: 'white' }}} required type="email" 
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'beige'},
                        '&: hover .MuiOutlinedInput-notchedOutline': { borderColor: 'orange'},
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
                        }}
                        onChange={handleChange} fullWidth/>
                        </div>
                        <div className="formcontainercontactus">
                        <p className="paragraphContactUsForm">Phone Number</p>
                        <TextField name="phoneNumber" label="Phone Number" variant="outlined" InputLabelProps={{style: { color: 'white' }}} inputProps={{style: { color: 'white' }}} required 
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'beige'},
                            '&: hover .MuiOutlinedInput-notchedOutline': { borderColor: 'orange'},
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
                          }}
                        onChange={handleChange}/>
                        </div>
                        <div className="formcontainercontactus">
                        <p className="paragraphContactUsForm">Message</p>
                        <TextField name="message" label="Message" variant="outlined" InputLabelProps={{style: { color: 'white' }}} inputProps={{style: { color: 'white' }}} required 
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'beige'},
                        '&: hover .MuiOutlinedInput-notchedOutline': { borderColor: 'orange'},
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
                        }}
                        onChange={handleChange} multiline minRows="5" fullWidth/>
                        </div>
                        <div className="formcontainercontactus">
                        <Button type="submit" className="contactUsSubmitButton" fullWidth variant="contained" endIcon={<SendIcon />} >Send Message</Button>
                        </div>
                        {loading && 
                        <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                        
                        }
                    </form>
                    </div>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message="Form Submitted! We will get back to you soon!" sx={{'& .MuiSnackbarContent-root': { backgroundColor: 'green'} }}/>
                    
                    </Grid>
            
                
                
            
            
            <Grid item sm={12} xs={12} md={6}>
            <div className="containercontactusmap">
                <iframe className="mapcontactus" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55361.61383732285!2d77.85980628345146!3d29.86136482885714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb36e08b35119%3A0x798f5dc25ebd0a72!2sRoorkee%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1678011419394!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            </Grid>
        </Grid>
        </div>
        </>
    )
}