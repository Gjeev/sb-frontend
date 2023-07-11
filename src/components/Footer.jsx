import "../css/footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { pink, blue } from "@mui/material/colors";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="section1">
          <div className="footer-div">
            <div className="footer-heading">Important Links</div>
            <div className="footer-paragraph">
              <center>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/contactus">Contact</a>
                  </li>
                </ul>
              </center>
            </div>
          </div>
          <div className="footer-div">
            <div className="footer-heading">Address</div>
            <div className="footer-paragraph">
              <center>
                <ul>
                  <li>Geomatics Dept.IIT Roorkee</li>
                  <li>Roorkee</li>
                  <li>Uttarakhand-247667</li>
                </ul>
              </center>
            </div>
          </div>

          <div className="footer-div">
            <div className="footer-heading">Contact</div>
            <div className="footer-paragraph">
              <ul>
                <li>
                  <EmailIcon className="footer-icon" /> sensingbharat@gmail.com
                </li>
                <li>
                  <PhoneIcon className="footer-icon" /> +91- 1234457691
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line-footer" />
        <center>
          <div className="section2">
            <p className="footer-heading">Find Us At:</p>
            <div className="footer-social-media-icons">
              <a href="www.facebook.com" className="facebook-link">
                <FacebookIcon sx={{ color: blue["A700"] }} />
              </a>

              <a href="www.instagram.com" className="facebook-link">
                <InstagramIcon sx={{ color: pink[500] }} />
              </a>

              <a href="www.linkedin.com" className="facebook-link">
                <LinkedInIcon sx={{ color: blue["A700"] }} />
              </a>

              <a href="www.twitter.com" className="facebook-link">
                <TwitterIcon sx={{ color: blue["A700"] }} />
              </a>
            </div>
          </div>
        </center>
      </footer>
    </>
  );
}
