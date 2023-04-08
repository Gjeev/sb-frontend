import "../../css/profile.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import StandardBox from "../../components/standardBox.jsx";
export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const image = document.querySelector(".details-image");
    if (image) {
      image.style.backgroundImage = `url(${user.picture})`;
      image.style.backgroundRepeat = "none";
      image.style.backgroundSize = "cover";
    }
    console.log(user);
  }, []);

  return (
    <>
      <div className="profile-page">
        {user ? (
          <>
            <div className="profile-section-1">
              <div className="section-1-bg"></div>
              <div className="section-1-details">
                <div className="details-image"></div>
                <div className="details-text">
                  <h1>{user ? user.name : null}</h1>
                  <p>Profile</p>
                </div>
              </div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-section-2">
              <div className="section-2-left">Profile Details</div>
              <div className="section-2-right">
                <div className="section-2-right-details">
                  <div className="two-right-key">Full Name</div>
                  <div className="two-right-value">{user.name}</div>
                </div>
                <div className="section-2-right-details">
                  <div className="two-right-key">Email Id</div>
                  <div className="two-right-value">{user.email}</div>
                </div>
                <div className="section-2-right-details">
                  <div className="two-right-key">Phone Number</div>
                  <div className="two-right-value">eedehiefkefk</div>
                </div>
              </div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-section-3">
              <div className="section-2-left">Order History</div>
              <div className="section-3-right">
                <div className="order-ind">
                  <div className="order-title">
                    Grid wise annual report of wheat grown in Indore Bhopal
                  </div>
                  <div className="order-info">
                    <div className="order-price">
                      <img src="/images/currency.png"></img>
                      <span>1000</span>
                    </div>
                    <div className="order-date">
                      <img src="/images/coolicon.png"></img>
                      <span>21 December, 2022</span>
                    </div>
                  </div>
                </div>
                <div className="order-ind">
                  <div className="order-title">
                    Grid wise annual report of wheat grown in Indore Bhopal
                  </div>
                  <div className="order-info">
                    <div className="order-price">
                      <img src="/images/currency.png"></img>
                      <span>1000</span>
                    </div>
                    <div className="order-date">
                      <img src="/images/coolicon.png"></img>
                      <span>21 December, 2022</span>
                    </div>
                  </div>
                </div>
                <div className="order-ind">
                  <div className="order-title">
                    Grid wise annual report of wheat grown in Indore Bhopal
                  </div>
                  <div className="order-info">
                    <div className="order-price">
                      <img src="/images/currency.png"></img>
                      <span>1000</span>
                    </div>
                    <div className="order-date">
                      <img src="/images/coolicon.png"></img>
                      <span>21 December, 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <StandardBox text="Please login to access your profile!"></StandardBox>
        )}
      </div>
    </>
  );
}
