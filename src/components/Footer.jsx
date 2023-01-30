import "../css/footer.css";

export default function Footer()
{
    return(<>
        <footer>
        <div className="quick-links">
            <ul>
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>Contact</a></li>

            </ul>
        </div>
        <div className="contact-us">
            <h3>Contact us at</h3>
            <p>xyz@gmail.com</p>
            <p>+91- 1234457691</p>
        </div>
        <div className="address">
        <h3>Office address</h3>
        <p>Geomatics Dept.
IIT Roorkee
Roorkee
Uttarakhand-247667</p>
        </div>
        
      </footer>
      <div className="orange"></div>
    </>
        
    
    );
}