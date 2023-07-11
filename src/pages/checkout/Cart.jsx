import "../../css/cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UPDATE_CART } from "../../constants";
import { useHistory } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import 'react-calendar/dist/Calendar.css';

export default function Cart() {
  const history = useHistory();
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  function handleRemoveClick(index) {
    const newcartData = [...cartData];
    newcartData.splice(index, 1);
    dispatch({ type: UPDATE_CART, payload: newcartData });
  }

  const user = useSelector((state) => state.auth.user);

  const handleCheckoutButtonClick = () => {
    if (!user) {
      sessionStorage.setItem("prevRoute", window.location.pathname);
      history.push("/login");
    }
    if (user) {
      let paymentSessionId = "";

      // change the URL once the backend is deployed
      // the phone number can be changed later by the user
      // in cashfree's payment page

      // i have used a webhook and ngrok to test the payment

      axios
        .post("http://localhost:5000/order", {
          order_id: `order-${Math.floor(Math.random() * 1000000000)}`,
          order_amount: cartPrice,
          order_currency: "INR",
          order_items: cartData,
          customer_details: {
            customer_id: user.name,
            customer_name: user.name,
            customer_email: user.email,
            customer_phone: "9999999999",
          },
          order_meta: {
            return_url: "http://localhost:5173/profile/order_id={order_id}",
            notify_url:
              "https://029d-2405-201-e001-5254-409c-b5c1-302f-8a82.ngrok-free.app/webhook",
          },
        })
        .then((res) => {
          paymentSessionId = res.data.payment_session_id;
          console.log("frontend", paymentSessionId);
          const cashfree = new Cashfree(paymentSessionId);

          cashfree.redirect();
        })
        .catch((err) => {
          console.log("error in posting to backend", err);
        });
    }
  };

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [cartPrice, setCartPrice] = useState(cartData.length * 500);
  useEffect(() => {
    setCartPrice(cartData.length * 500);
  }, [cartData]);

  const handleLayerClick = (layer, index) => {
    setSelectedLayers((prevSelectedLayers) => {
      const updatedSelectedLayers = [...prevSelectedLayers];
      if (!updatedSelectedLayers[index]) {
        updatedSelectedLayers[index] = [];
      }
      const layerIndex = updatedSelectedLayers[index].indexOf(layer);
      if (layerIndex === -1) {
        updatedSelectedLayers[index].push(layer);
      } else {
        updatedSelectedLayers[index].splice(layerIndex, 1);
      }
      return updatedSelectedLayers;
    });
  };
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <div className="cart">
      <div className="cart-box">
        <div className="cart-header">Grids added to cart</div>
        <div className="cart-content">
          {cartData.map((item, index) => {
            let farmId = "";
            if (typeof item.id === "number") {
              const idToString = item.id.toString();
              farmId = `Grid-${idToString.substr(0, 4)}`;
            } else {
              farmId = `Farm-${item.id.substr(0, 4)}`;
            }

            return (
              <div className="cart-item-list" key={index}>
                <div className="cart-item">{farmId}</div>
                <div className="cart-item-remove">
                  <div>
                    <DateRangePicker onChange={onChange} value={value} />
                  </div>

                  <button
                    onClick={handleRemoveClick.bind(this, index)}
                    className="cart-btn"
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-price">
            <div className="cart-price-text">Total Price</div>
            <div className="cart-price-value">INR {cartPrice}</div>
          </div>
        </div>
      </div>
      <div className="checkout">
        <button onClick={handleCheckoutButtonClick}>Proceed to checkout</button>
      </div>
    </div>
  );
}
