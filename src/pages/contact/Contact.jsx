import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { countries } from "../../data/country";
import "../../css/contact.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function Contact() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1a2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="contact">
          <div className="contact-left">
            <h1>Contact us</h1>
            <p>Our friendly team would love to hear from you!</p>
            <div className="contact-form">
              <form action="https://formsubmit.co/sensingbharat@gmail.com" method="POST">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Item>
                      {/* <label>First Name</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Enter First Name"
                        variant="outlined"
                        required
                        name="first name"
                      />
                    </Item>
                  </Grid>

                  <Grid item xs={12}>
                    <Item>
                      {/* <label>Last Name</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Enter Last Name"
                        variant="outlined"
                        name="last name"
                      />
                    </Item>
                  </Grid>

                  <Grid item xs={12}>
                    <Item>
                      {/* <label>Last Name</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Enter Mail ID"
                        variant="outlined"
                        required
                        name="email"
                      />
                    </Item>
                  </Grid>

                  <Grid item xs={12}>
                    <Item>
                      {/* <label>Phone number</label> */}
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Country Code"
                        defaultValue="+91"
                        helperText="Please select your country code"
                        name="country code"
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.name} value={option.code}>
                            {option.code}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-basic"
                        label="Enter Phone Number"
                        variant="outlined"
                        name="phone number"
                      />
                    </Item>
                  </Grid>

                  <Grid item xs={12}>
                    <Item>
                      {/* <label>Message</label> */}
                      <TextField
                        id="outlined-basic"
                        label="Enter your message"
                        variant="outlined"
                        multiline
                        minRows={6}
                        required
                        name="message"
                      />
                    </Item>
                  </Grid>
                </Grid>
                
                <button type="submit" className="contact-button">Send Message</button>
              </form>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-image"></div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
